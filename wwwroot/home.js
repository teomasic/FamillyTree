var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from "./three.js/three.module.js";
import { Common } from "./Common.js";
var home;
export function Init(dotnetRef) {
    return __awaiter(this, void 0, void 0, function* () {
        home = new Home(dotnetRef);
        return true;
    });
}
export function InitFamillyMembers(famillyMembers) {
    return __awaiter(this, void 0, void 0, function* () {
        home.AddFamillyMembersToScene(famillyMembers);
    });
}
window.PrintSceneObjects = function () {
    home.PrintSceneObjects();
};
window.PrintDotnetObjects = function () {
    home.PrintDotnetObjects();
};
class Home {
    constructor(dotnetRef) {
        this.zoom_move_coeficient = 1.02;
        this.animate = () => {
            this.renderer.render(this.scene, this.camera);
        };
        this.registerMouseEvents = () => {
            this.mouseDown();
            this.mouseUp();
            this.mouseMove();
            this.mouseWheel();
        };
        this.moveMember = (event) => {
            // check if moving member
            let scene_member = this.checkIntersectedObjectIsMember(event.clientX, event.clientY);
            if (scene_member != undefined) {
                scene_member.position.x += event.movementX * 0.2 * this.zoom_move_coeficient;
                scene_member.position.y += -event.movementY * 0.2 * this.zoom_move_coeficient;
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
        };
        this.sendMemberPosition = () => {
            this.dotnetRef.invokeMethodAsync("SaveNewMembersCoords", this.lastMemberId, this.lastMemberX, this.lastMemberY);
            this.lastMemberX = 0;
            this.lastMemberY = 0;
            this.lastMemberId = "";
        };
        this.checkIntersectedObjectIsMember = (clientX, clientY) => {
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
        };
        this.getSeletedMember = (event) => {
            let member = this.checkIntersectedObjectIsMember(event.clientX, event.clientY);
            return member == undefined ? "" : member.name;
        };
        this.constructScene = () => {
            this.scene_div = document.getElementById("scene_div");
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
        };
        // ########################################  JS EVENTS
        this.mouseDown = () => {
            this.renderer.domElement.addEventListener("mousedown", (event) => {
                if (event.button === 0) { // left mouse click to move member 
                    this.canMoveMember = true;
                }
                else if (event.button === 2) {
                    this.canMoveMember = false;
                }
            });
        };
        this.mouseUp = () => {
            this.renderer.domElement.addEventListener("mouseup", () => {
                this.canMoveMember = false;
                this.sendMemberPosition();
            });
        };
        this.mouseMove = () => {
            this.renderer.domElement.addEventListener("mousemove", (event) => {
                if (this.canMoveMember) {
                    this.moveMember(event);
                }
            });
        };
        this.mouseWheel = () => {
            this.renderer.domElement.addEventListener("wheel", (event) => {
                console.log("mouseWheel", event);
                this.camera.zoom = event.deltaY < 0 ? this.camera.zoom * this.zoom_move_coeficient : this.camera.zoom / this.zoom_move_coeficient;
                this.camera.updateProjectionMatrix();
            }, { passive: true });
        };
        // ########################################  PUBLIC
        this.AddFamillyMembersToScene = (famillyMembers) => {
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
                }
                catch (e) {
                    console.log("error drawing member", e);
                }
            }
        };
        // TEST
        this.PrintSceneObjects = () => {
            this.scene.children.forEach(x => console.log(x));
        };
        this.PrintDotnetObjects = () => {
            this.famillyMembers.forEach(x => console.log(x));
        };
        try {
            this.lastMemberX = 0;
            this.lastMemberY = 0;
            this.dotnetRef = dotnetRef;
            this.constructScene();
            this.registerMouseEvents();
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }
}
//# sourceMappingURL=home.js.map