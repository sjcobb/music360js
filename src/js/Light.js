import * as THREE from 'three';

import Store from './Store.js';

export default class Light {

    constructor() {
        // super();
    }

    addLights(renderer) {
        // https://stackoverflow.com/a/40416826/7639084

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        // LIGHTS
        const ambient = new THREE.AmbientLight(0x888888);
        Store.scene.add(ambient);

        // const light = new THREE.DirectionalLight(0xdddddd);
        const light = new THREE.DirectionalLight(0x888888);

        // light.position.set(3, 10, 4);
        light.position.set(3, 10, -14);

        light.target.position.set(0, 0, 0);
        light.castShadow = true;

        // const lightSize = 10;
        const lightSize = 100;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 50;
        light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
        light.shadow.camera.right = light.shadow.camera.top = lightSize;

        // light.shadow.mapSize.width = 1024; // prev
        // light.shadow.mapSize.height = 1024;

        light.shadow.mapSize.width = 0; // TODO: figure out lighting and shadow casts from balls
        light.shadow.mapSize.height = 0;

        // this.sun = light;
        Store.scene.add(light);

        // const fogColor = new THREE.Color(0xffffff);
        const fogColor = new THREE.Color(0xE5E5E5); 
        // const fogColor  = new THREE.Color("rgb(255, 0, 0)");
        // Store.scene.background = fogColor; // PREV
    }

    addSolarLights(renderer) {
        const ambientLight = new THREE.AmbientLight(0x888888, 1);
        // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        Store.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x888888);
        // directionalLight.position.set(3, 10, 4);
        directionalLight.position.set(3, 10, -14);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.castShadow = true;
        Store.scene.add(directionalLight);

    }

}