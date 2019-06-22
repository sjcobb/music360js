import globals from './globals.js';

export default class Light {

    constructor() {
        // super();
    }

    addLights(renderer) {
        // https://stackoverflow.com/a/40416826/7639084
        // console.log(globals.scene);
        console.log('GLOBAL VARS: ', globals);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        // LIGHTS
        const ambient = new THREE.AmbientLight(0x888888);
        globals.scene.add(ambient);

        const light = new THREE.DirectionalLight(0xdddddd);
        light.position.set(3, 10, 4);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;

        const lightSize = 10;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 50;
        light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
        light.shadow.camera.right = light.shadow.camera.top = lightSize;

        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        this.sun = light;
        // globals.scene.add(light);


        globals.scene.add(light);

        // const fogColor = new THREE.Color(0xffffff);
        const fogColor = new THREE.Color(0xE5E5E5); 
        // const fogColor  = new THREE.Color("rgb(255, 0, 0)");
        globals.scene.background = fogColor;

        // globals.scene.fog = new THREE.Fog(fogColor, 0.0025, 20);
        // globals.scene.fog = new THREE.Fog(fogColor, 0.0025, 200);

        // globals.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
        // globals.scene.fog = new THREE.FogExp2( 0xE5E5E5, 0.0025 );
        // globals.scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.002 ); // decimal = densitry

        // globals.scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.002 ); // FINAL
    }

}