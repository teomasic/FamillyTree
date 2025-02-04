import * as THREE from "./three.js/three.module.js";

var home;

export async function Init() {
    home = new Home();
}


class Home {

    width: number;
    height: number;
    camera: any;
    scene: any;
    geometry: any;
    material: any;
    renderer: any;
    cube: any
    scene_div: HTMLDivElement;

    constructor() {
        try {


            this.scene_div = document.getElementById("scene_div") as HTMLDivElement;
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

        } catch (e) {
            console.log("Error: ", e);
        }
    }

    animate = () => {

        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

    }

}