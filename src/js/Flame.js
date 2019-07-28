import globals from './globals.js';
// import THREE.Fire from '../vendor/Fire.js';
// import Fire from './Fire.js';

// import FireShader from '../vendor/FireShader.js';

// import Fire from 'Fire';

/*
 *** Flame ***
 */

export default class Flame {
    
    constructor(fireParam) {
        this.triggerTime = fireParam;
    }

    initFire() {
        globals.loader.crossOrigin = '';
        var fireTex = globals.loader.load("./assets/flame/FireOrig.png");

        // const volumetricFire = new THREE.Fire(fireTex);
        const volumetricFire = new Fire(fireTex);
        volumetricFire.position.set(globals.posBehindX + 22, 0, globals.posBehindZ);
        volumetricFire.scale.set(6, 6.8, 6.0); //width, height, z
        volumetricFire.add(wireframe);
        globals.scene.add(volumetricFire);
    }

    addFire(posX = globals.posBehindX + 22, currentTime) {
        volumetricFire.position.set(posX, 0, globals.posBehindZ);
        scene.add(volumetricFire);
    }

}