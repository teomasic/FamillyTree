//import * as THREE from "./three.js/three.module.js";
//import { Mesh } from "../node_modules/@types/three/index.js"
import { Mesh } from "../node_modules/@types/three/src/objects/Mesh.js"

export interface Person {

    id: string
    name: string
    surname: string
    age: number
    birthDate: Date
    birthPlace: string
    lifeEvents: string
    profession: string
    dateOfDeath: Date
    placeOfDeath: string

    locationX: number
    locationY: number
}
