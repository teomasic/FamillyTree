import * as THREE from "./three.js/three.module.js";
import * as models from "./models.js";
import { Common } from "./Common.js";

var home;

export async function Init(dotnetRef: object) {
    home = new Home(dotnetRef);
    return true;
}

export async function InitFamillyMembers(famillyMembers: models.Person[]) {
    home.AddFamillyMembersToScene(famillyMembers);
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
    camera: any;
    scene: any;
    geometry: any;
    material: any;
    renderer: any;
    raycaster: any

    canMoveMember: boolean
    lastMemberX: number
    lastMemberY: number
    lastMemberId: string

    scene_div: HTMLDivElement;

    // dotnet objects
    famillyMembers: models.Person[]

    constructor(dotnetRef: object) {
        try {
            this.lastMemberX = 0;
            this.lastMemberY = 0;

            this.dotnetRef = dotnetRef;
            this.constructScene();
            this.registerMouseEvents();


        } catch (e) {
            console.log("Error: ", e);
        }
    }

    animate = () => {
        this.renderer.render(this.scene, this.camera);
    }

    registerMouseEvents = () => {
        this.renderer.domElement.addEventListener("mousedown", (event) => {

            if (event.button === 0) { // left mouse click to move member 

                this.canMoveMember = true;
            }
            else if (event.button === 2) {
                this.canMoveMember = false;
            }
        });

        this.renderer.domElement.addEventListener("mouseup", () => {
            this.canMoveMember = false;
            this.sendMemberPosition();
        });

        this.renderer.domElement.addEventListener("mousemove", (event) => {
            if (this.canMoveMember) {

                this.moveMember(event);
            }
        });
    }


    private moveMember = (event) => {

        // check if moving member
        let scene_member = this.checkIntersectedObjectIsMember(event.clientX, event.clientY);
        if (scene_member != undefined) {
            scene_member.position.x += event.movementX * 0.2;
            scene_member.position.y += -event.movementY * 0.2;

            // hold member's x,y and send it to dotent on mouseup event
            let dotnet_member = this.famillyMembers.find(x => x.id == scene_member.dotnetId);
            if (dotnet_member != undefined) {
                dotnet_member.locationX = scene_member.position.x;
                dotnet_member.locationY = scene_member.position.y;

                this.lastMemberX = Math.round(dotnet_member.locationX);
                this.lastMemberY = Math.round(dotnet_member.locationY);
                this.lastMemberId = dotnet_member.id;
            }
        }
    }

    private sendMemberPosition = () => {

        this.dotnetRef.invokeMethodAsync("SaveNewMembersCoords", this.lastMemberId, this.lastMemberX, this.lastMemberY);
        this.lastMemberX = 0;
        this.lastMemberY = 0;
        this.lastMemberId = "";
    }

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

            let selectedObjFromScene = intersections[0].object; // 
            if (selectedObjFromScene.name.startsWith("member_")) {
                member = selectedObjFromScene;
            }

        }

        return member;
    }

    private getSeletedMember = (event): string => {
        let member = this.checkIntersectedObjectIsMember(event.clientX, event.clientY);
        return member == undefined ? "" : member.name;
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


    // PUBLIC

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

                scene_member.name = `member_${dotnet_member.name}_${dotnet_member.surname}`;
                scene_member.dotnetId = dotnet_member.id;
                scene_member.visible = true;
                this.scene.add(scene_member);

            } catch (e) {
                console.log("error drawing member", e);
            }

        }
    }


    // TEST
    public PrintSceneObjects = () => {
        this.scene.children.forEach(x => console.log(x));
    }

    public PrintDotnetObjects = () => {
        this.famillyMembers.forEach(x => console.log(x));
    }
}