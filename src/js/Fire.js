import globals from './globals.js';

/*
 *** FIRE ***
 */

export default class Fire {
    
    constructor(fireParam) {
        // https://googlechrome.github.io/samples/classes-es6/
        // this.name = 'Polygon';
        // this.height = height;
        // this.width = width;
        // this.volumetricFire = fireParam;
        this.triggerTime = fireParam;
    }

    initFire() {
        globals.loader.crossOrigin = '';
        var fireTex = globals.loader.load("./assets/flame/FireOrig.png");
        var wireframeMat = new THREE.MeshBasicMaterial({
            color : new THREE.Color(0xffffff),
            wireframe : true
        });

        const volumetricFire = new THREE.Fire(fireTex);
        volumetricFire.position.set(globals.posBehindX + 22, 0, globals.posBehindZ);

        // volumetricFire.scale.set(3, 3.4, 3.0); //width, height, z
        volumetricFire.scale.set(6, 6.8, 6.0); //width, height, z

        // console.log(volumetricFire.material.uniforms);
        // volumetricFire.material.uniforms.magnitude.value = 0.5; //higher = spaciness
        // volumetricFire.material.uniforms.lacunarity.value = 0.1;   //lower = more cartoony
        // volumetricFire.material.uniforms.lacunarity.gain = 0.1;     //more = less height

        var wireframe = new THREE.Mesh(volumetricFire.geometry, wireframeMat.clone());
        volumetricFire.add(wireframe);
        wireframe.visible = false;

        // console.log({volumetricFire});
        // scene.add(volumetricFire);
        globals.scene.add(volumetricFire);
    }

    addFire(posX = globalPosBehindX + 22, currentTime) {
        // console.log(this);
        // if (currentTime === this.triggerTime) {
            // console.log('addFire active......');
            volumetricFire.position.set(posX, 0, globals.posBehindZ);
            scene.add(volumetricFire);
        // }
    }

}