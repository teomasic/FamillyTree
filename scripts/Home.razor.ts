
var home;

export async function Init() {
    home = new Home();
}


class Home {

    tree_container: HTMLDivElement;
    tree_content: HTMLDivElement;


    constructor() {
        this.registerMouseEvent();
    }

    tree_content_scale = 1;

    registerMouseEvent = () => {
        this.tree_container = document.querySelector(".tree-container") as HTMLDivElement;
        this.tree_content = document.querySelector(".tree-content") as HTMLDivElement;


        this.tree_container.addEventListener('wheel', (e) => {
            console.log("here");
            this.tree_container_wheel(e);
        });



    }

    tree_container_wheel = (e) => {
        e.preventDefault();
        const zoomFactor = 0.1;
        if (e.deltaY < 0) {
            // Zoom in
            this.tree_content_scale += zoomFactor;
        } else {
            // Zoom out
            this.tree_content_scale = Math.max(0.5, this.tree_content_scale - zoomFactor); // Do not allow to zoom out too much
        }
        this.tree_content.style.transform = `scale(${this.tree_content_scale})`;
    }
}