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
class Home {
    constructor(dotnetRef) {
        this.animate = () => {
            this.renderer.render(this.scene, this.camera);
        };
        this.registerMouseEvents = () => {
            this.renderer.domElement.addEventListener("mousedown", (event) => {
                var closestObjFromSene = this.checkIntersectedObject(event.clientX, event.clientY);
                if (event.button === 0) { // Left click for pan map
                    console.log("move object");
                }
                else if (event.button === 2) { // Right click for rotate map
                    console.log("rotate camera");
                }
            });
        };
        this.checkIntersectedObject = (clientX, clientY) => {
            let scene_div = Common.GetSceneDiv();
            this.raycaster = new THREE.Raycaster();
            var coords = new THREE.Vector2();
            coords.x = ((clientX - scene_div.offsetLeft) / scene_div.clientWidth) * 2 - 1;
            coords.y = -((clientY - scene_div.offsetTop) / scene_div.clientHeight) * 2 + 1;
            this.raycaster.setFromCamera(coords, this.camera);
            const intersections = this.raycaster.intersectObjects(this.scene.children);
            if (intersections.length > 0) {
                let selectedObjFromScene = intersections[0].object; // could be amr, amr_pallet, amr_alarm_rect, amr_mode_rect
                console.log("selectedObjOnMap: ", selectedObjFromScene);
                console.log("intersections: ", intersections);
            }
            this.camera.updateProjectionMatrix();
        };
        // PRIVATE
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
        // PUBLIC
        this.AddFamillyMembersToScene = (famillyMembers) => {
            console.log("AddFamillyMembersToScene", famillyMembers);
            for (var i = 0; i <= famillyMembers.length - 1; i++) {
                try {
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    let member = famillyMembers[i];
                    canvas.width = famillyMembers[i].name.length * 20;
                    canvas.height = canvas.width / 2;
                    ctx.fillStyle = "black";
                    ctx.font = "18px Arial";
                    ctx.fillText(member.name, canvas.width / 2, canvas.height / 2);
                    let member_texture = new THREE.Texture(canvas);
                    member_texture.needsUpdate = true;
                    let member_material = new THREE.MeshBasicMaterial({ map: member_texture });
                    member_material.transparent = true;
                    const member_geometry = new THREE.PlaneGeometry(canvas.width / 4, canvas.height / 4);
                    let member_name = new THREE.Mesh(member_geometry, member_material);
                    member_name.position.set(member.locationX, member.locationY, 1);
                    member_name.name = `member_${member.name}_${member.surname}`;
                    member_name.visible = true;
                    this.scene.add(member_name);
                }
                catch (e) {
                    console.log("error drawing member", e);
                }
            }
        };
        // TEST
        this.PrintSceneObjects = () => {
            this.scene.children.forEach((x) => {
                console.log(x);
            });
        };
        try {
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