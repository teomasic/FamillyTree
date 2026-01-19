import * as models from "./models.js";
import { Common } from "./Common.js";
import * as THREE from "three";

var home;

export async function Init(dotnetRef: object) {
    home = new Home(dotnetRef);
    return true;
}
export async function InitFamillyMembers(famillyMembers: models.Person[]) {
    home.AddFamillyMembersToScene(famillyMembers);
}
export async function SetDrawingTool(toolName: string) {
    home.SetDrawingTool(toolName);
}


window.PrintSceneObjects = function () {
    home.PrintSceneObjects();
}
window.PrintDotnetObjects = function () {
    home.PrintDotnetObjects();
}

class Home {
    dotnetRef: any

    // scene object
    width: number;
    height: number;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;

    movingMember: THREE.Mesh
    canMoveMember: boolean
    canMoveMap: boolean
    lastMemberX: number
    lastMemberY: number
    lastMemberId: string

    scene_div: HTMLDivElement;
    zoom_move_coeficient = 1.02;

    // dotnet objects
    famillyMembers: models.Person[]
    drawingTool: string;
    drawingOn: boolean;

    // draw line
    canDraw: boolean;
    line_buffer_geometry: THREE.BufferGeometry;
    line_material: THREE.LineBasicMaterial;
    line_points_for_buffer: THREE.Vector2[];

    constructor(dotnetRef: object) {
        try {
            this.lastMemberX = 0;
            this.lastMemberY = 0;

            this.dotnetRef = dotnetRef;
            this.constructScene();
            this.registerMouseEvents();

            this.line_buffer_geometry = new THREE.BufferGeometry();
            this.line_material = new THREE.LineBasicMaterial({ color: 0x0000ff });
            this.line_points_for_buffer = new Array as THREE.Vector2[];

        } catch (e) {
            console.log("Error: ", e);
        }
    }

    animate = () => {
        this.renderer.render(this.scene, this.camera);
    }

    registerMouseEvents = () => {
        this.mouseDown();
        this.mouseUp();
        this.mouseMove();
        this.mouseWheel();

    }
    // ########################################  JS EVENTS
    private mouseDown = () => {
        this.renderer.domElement.addEventListener("mousedown", (event) => {

            if (event.button === 0) { // left mouse click to move member

                if (this.drawingOn) {
                    this.canDraw = true;
                    this.canMoveMap = false;
                    this.canMoveMember = false;
                    return;
                }

                // check for moving member
                this.movingMember = this.checkIfMovingMember(event);
                this.canMoveMember = this.movingMember != undefined ? true : false;
                this.canMoveMap = false;
                this.canDraw = false;
            }
            else if (event.button === 2) { // right mouse click to move map
                this.canMoveMember = false;
                this.canMoveMap = true;
                this.canDraw = false;
            }
        }, { passive: true });

    }

    private mouseUp = () => {
        this.renderer.domElement.addEventListener("mouseup", () => {

            if (this.canMoveMember) {
                this.sendMemberPosition();
            }
            if (this.canDraw) {
                this.drawLineOnScene();
            }

            this.movingMember = undefined;
            this.canMoveMember = false;
            this.canMoveMap = false;
            this.canDraw = false;
        });
    }

    private mouseMove = () => {
        this.renderer.domElement.addEventListener("mousemove", (event) => {
            if (this.canDraw) {
                console.log("addLineToBufferScene");
                this.addLineToBufferScene(event);
            }
            if (this.canMoveMember) {
                this.moveMember(event);
            }
            if (this.canMoveMap) {
                this.moveMap(event);
            }
        });
    }

    private mouseWheel = () => {
        this.renderer.domElement.addEventListener("wheel", (event) => {

            this.camera.zoom = event.deltaY < 0 ? this.camera.zoom * this.zoom_move_coeficient : this.camera.zoom / this.zoom_move_coeficient;
            this.camera.updateProjectionMatrix();

        }, { passive: true, });
    }


    private moveMember = (event: MouseEvent) => {

        //check if moving member
        if (this.movingMember != undefined) {
            this.movingMember.position.x += event.movementX * 0.2 * this.zoom_move_coeficient;
            this.movingMember.position.y += -event.movementY * 0.2 * this.zoom_move_coeficient;

            // hold member's x,y and send it to dotent on mouseup event
            let dotnet_member = this.famillyMembers.find(x => x.id == this.movingMember.name);
            if (dotnet_member != undefined) {
                dotnet_member.locationX = this.movingMember.position.x;
                dotnet_member.locationY = this.movingMember.position.y;

                this.lastMemberX = Math.round(dotnet_member.locationX);
                this.lastMemberY = Math.round(dotnet_member.locationY);
                this.lastMemberId = dotnet_member.id;
            }
        }
    }

    private moveMap = (event: MouseEvent) => {
        event.preventDefault();
        this.camera.position.x += - event.movementX * 0.2 * this.zoom_move_coeficient;
        this.camera.position.y += event.movementY * 0.2 * this.zoom_move_coeficient;

    }

    private checkIfMovingMember = (event: MouseEvent): THREE.Mesh => {
        // check if moving member
        let scene_member = this.checkIntersectedObjectIsMember(event.clientX, event.clientY) as THREE.Mesh;
        return scene_member;
    }

    private drawLineOnScene() {
        // line drawing
        let geometry = this.line_buffer_geometry.setFromPoints(this.line_points_for_buffer);
        const line = new THREE.Line(geometry, this.line_material);
        this.scene.add(line);
    }
    private addLineToBufferScene(event: MouseEvent) {
        // line drawing
        this.line_points_for_buffer.push(new THREE.Vector2(event.clientX, event.clientY));
    }


    // ########################### INVOKE DOTNET FUNCTIONS

    private sendMemberPosition = () => {
        if (this.lastMemberId != undefined) {
            this.dotnetRef.invokeMethodAsync("SaveNewMembersCoords", this.lastMemberId, this.lastMemberX, this.lastMemberY);
            this.lastMemberX = 0;
            this.lastMemberY = 0;
            this.lastMemberId = undefined;
        }
    }

    // ############################## TOOLS

    private checkIntersectedObjectIsMember = (clientX: number, clientY: number): any => {
        let member;
        let scene_div = Common.GetSceneDiv();
        this.raycaster = new THREE.Raycaster();
        var coords = new THREE.Vector2();
        coords.x = ((clientX - scene_div.offsetLeft) / scene_div.clientWidth) * 2 - 1;
        coords.y = -((clientY - scene_div.offsetTop) / scene_div.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(coords, this.camera);


        const intersections = this.raycaster.intersectObjects(this.scene.children);
        if (intersections.length > 0) {

            let selectedObjFromScene = intersections[0].object;
            let found_member = this.famillyMembers.find(x => x.id == selectedObjFromScene.name);
            if (found_member) {
                member = selectedObjFromScene;
            }

        }

        return member;
    }

    private constructScene = () => {


        this.scene_div = document.getElementById("scene_div") as HTMLDivElement;
        this.width = this.scene_div.clientWidth;
        this.height = this.scene_div.clientHeight;


        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("rgb(200, 200, 200)");

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 1;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setAnimationLoop(this.animate);
        this.scene_div.appendChild(this.renderer.domElement);

        this.camera.position.z = 100;
        this.animate();
    }


    // ########################################  PUBLIC

    public AddFamillyMembersToScene = (famillyMembers: models.Person[]) => {
        this.famillyMembers = famillyMembers;

        for (var i = 0; i <= famillyMembers.length - 1; i++) {

            try {

                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");

                let dotnet_member = famillyMembers[i];
                canvas.width = famillyMembers[i].name.length * 20;
                canvas.height = canvas.width / 2;

                ctx.fillStyle = "black";
                ctx.font = "18px Arial";
                ctx.fillText(dotnet_member.name, canvas.width / 2, canvas.height / 2);
                let member_texture = new THREE.Texture(canvas);
                member_texture.needsUpdate = true;
                let member_material = new THREE.MeshBasicMaterial({ map: member_texture });
                member_material.transparent = true;
                const member_geometry = new THREE.PlaneGeometry(canvas.width / 4, canvas.height / 4);
                let scene_member = new THREE.Mesh(member_geometry, member_material);

                scene_member.position.set(dotnet_member.locationX, dotnet_member.locationY, 1);

                scene_member.name = dotnet_member.id;
                scene_member.visible = true;
                this.scene.add(scene_member);

            } catch (e) {
                console.log("error drawing member", e);
            }

        }
    }

    public SetDrawingTool = (toolName: string) => {
        if (toolName == "") {
            this.drawingOn = false;
            this.drawingTool = "";
            return;
        }

        this.drawingOn = true;
        this.drawingTool = toolName;
    }


    // TEST
    public PrintSceneObjects = () => {
        this.scene.children.forEach(x => console.log(x));
    }

    public PrintDotnetObjects = () => {
        this.famillyMembers.forEach(x => console.log(x));
    }
}