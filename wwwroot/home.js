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
var home;
export function Init() {
    return __awaiter(this, void 0, void 0, function* () {
        home = new Home();
    });
}
class Home {
    constructor() {
        this.animate = () => {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        };
        try {
            this.scene_div = document.getElementById("scene_div");
            this.width = this.scene_div.clientWidth;
            this.height = this.scene_div.clientHeight;
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color("rgb(0, 160, 0)");
            this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
            this.camera.position.z = 1;
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setAnimationLoop(this.animate);
            this.scene_div.appendChild(this.renderer.domElement);
            this.geometry = new THREE.BoxGeometry(1, 1, 1);
            this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            this.cube = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.cube);
            this.camera.position.z = 5;
            this.animate();
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }
}
//# sourceMappingURL=home.js.map