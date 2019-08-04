import globals from './globals.js';
// import THREE.Fire from '../vendor/Fire.js';
// import Fire from './Fire.js';

// import FireShader from '../vendor/FireShader.js';

// import Fire from 'Fire';

/*
 *** Flame ***
 */

export default class Flame {
    
    // constructor(fireParam) {
    constructor() {
        // this.triggerTime = fireParam;
    }

    create(pos) {
        console.log(pos);
        console.log(globals.flameArr);

        const fireTex = globals.loader.load("assets/flame/FireOrig.png");
        const volumetricFire = new THREE.Fire(fireTex);
        volumetricFire.scale.set(6, 6.8, 6.0); //width, height, z

        // volumetricFire.position.set(globals.posBehindX + 30, 3.5, globals.posBehindZ);
        // volumetricFire.position.set(pos.x, 3.5, globals.posBehindZ);
        volumetricFire.position.set(pos.x, globals.posBehindY, globals.posBehindZ);

        var wireframeMat = new THREE.MeshBasicMaterial({
            color : new THREE.Color(0xffffff),
            wireframe : true
        });
        var wireframe = new THREE.Mesh(volumetricFire.geometry, wireframeMat.clone());
        volumetricFire.add(wireframe);
        wireframe.visible = false;

        // globals.flameArr.push(volumetricFire)
        globals.flameArr = [volumetricFire];
        // globals.scene.add(volumetricFire);
        globals.scene.add(globals.flameArr[0]);
    }

    addFire(posX = globals.posBehindX + 22, currentTime) {
        volumetricFire.position.set(posX, 0, globals.posBehindZ);
        scene.add(volumetricFire);
    }

}