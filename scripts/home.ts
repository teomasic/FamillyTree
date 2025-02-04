import * as THREE from "./three.js/three.module.js";
import * as models from "./models.js";

var home;

export async function Init(dotnetRef: object) {
    home = new Home(dotnetRef);
    return true;
}

export async function InitFamillyMembers(famillyMembers: models.Person[]) {
    home.AddFamillyMembersToScene(famillyMembers);
}


class Home {
    dotnetRef: any
    width: number;
    height: number;
    camera: any;
    scene: any;
    geometry: any;
    material: any;
    renderer: any;
    cube: any
    scene_div: HTMLDivElement;

    constructor(dotnetRef: object) {
        try {

            this.dotnetRef = dotnetRef;

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

            //this.geometry = new THREE.BoxGeometry(1, 1, 1);
            //this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            //this.cube = new THREE.Mesh(this.geometry, this.material);
            //this.scene.add(this.cube);

            this.camera.position.z = 100;
            this.animate();

        } catch (e) {
            console.log("Error: ", e);
        }
    }

    animate = () => {

        //this.cube.rotation.x += 0.01
        //this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

    }


    // PUBLIC

    public AddFamillyMembersToScene = (famillyMembers: models.Person[]) => {
        console.log("AddFamillyMembersToScene", famillyMembers);

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        console.log("start drawing members!");
        for (var i = 0; i <= famillyMembers.length - 1; i++) {

            try {


                let member = famillyMembers[i];
                canvas.width = famillyMembers[i].name.length * 200;
                canvas.height = canvas.width / 2;

                ctx.fillStyle = "green";
                ctx.font = "15px Arial";
                ctx.fillText(member.name, canvas.width / 2, canvas.height/2);
                let member_texture = new THREE.Texture(canvas);
                member_texture.needsUpdate = true;
                let member_material = new THREE.MeshBasicMaterial({ map: member_texture });
                member_material.transparent = true;
                const member_geometry = new THREE.PlaneGeometry(canvas.width, canvas.height);
                let member_name = new THREE.Mesh(member_geometry, member_material);

                member_name.position.set(0, 0, 1);

                member_name.name = `member_name_${member.name}_${member.surname}`;
                member_name.visible = true;
                this.scene.add(member_name);
                console.log("drawing next member!");
            } catch (e) {
                console.log("error drawing member", e);
            }

        }
        console.log("drawing members ended!");

    }

}