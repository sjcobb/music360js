// https://github.com/mrdoob/three.js/blob/dev/examples/webgl_lightningstrike.html
// https://threejs.org/examples/#webgl_lightningstrike

// import { LightningStrike } from './jsm/geometries/LightningStrike.js';
// import { LightningStorm } from './jsm/objects/LightningStorm.js';

import { LightningStrike } from '../../vendor/Three/lightning/geometries/LightningStrike';
// import { LightningStorm } from './jsm/objects/LightningStorm.js';

console.log({LightningStrike});

import Store from './Store.js';

export default class Lightning {

    constructor() {}

    init() {
        console.log('init Lightning...');

        ///////////
        // CONES //
        ///////////

		// // const conesDistance = 1000;
		const conesDistance = 100;
		// // const coneHeight = 200;
		const coneHeight = 20;
		const coneHeightHalf = coneHeight * 0.5;

        const coneMesh1 = new THREE.Mesh( new THREE.ConeGeometry( coneHeight, coneHeight, 30, 1, false ), new THREE.MeshPhongMaterial( { color: 0xFFFF00, emissive: 0x1F1F00 } ) );
        coneMesh1.rotation.x = Math.PI;
        coneMesh1.position.y = conesDistance + coneHeight;
        // // coneMesh1.position.y = 0;
        // Store.scene.add( coneMesh1 );

        // // //

        const coneMesh2 = new THREE.Mesh( coneMesh1.geometry.clone(), new THREE.MeshPhongMaterial( { color: 0xFF2020, emissive: 0x1F0202 } ) );
        coneMesh2.position.y = coneHeightHalf;
        // Store.scene.add( coneMesh2 );

        ////////////
        // STRIKE //
        ////////////
        Store.scene.userData.lightningColor = new THREE.Color(0xB0FFFF);
		Store.scene.userData.outlineColor = new THREE.Color(0x00FFFF);

        Store.scene.userData.lightningMaterial = new THREE.MeshBasicMaterial( { color: Store.scene.userData.lightningColor } );

        Store.scene.userData.rayParams = {
            sourceOffset: new THREE.Vector3(),
            destOffset: new THREE.Vector3(),
            radius0: 4,
            radius1: 4,
            minRadius: 2.5,
            maxIterations: 7,
            isEternal: true,

            timeScale: 0.7,

            propagationTimeFactor: 0.05,
            vanishingTimeFactor: 0.95,
            subrayPeriod: 3.5,
            subrayDutyCycle: 0.6,
            maxSubrayRecursion: 3,
            ramification: 7,
            recursionProbability: 0.6,

            roughness: 0.85,
            straightness: 0.6
        };

        let lightningStrikeMesh;
        const outlineMeshArray = [];

        // Store.scene.userData.recreateRay = () => {
        Store.scene.userData.recreateRay = function () {
            if (lightningStrikeMesh) {
                Store.scene.remove(lightningStrikeMesh);
            }
            Store.lightningStrike = new LightningStrike(Store.scene.userData.rayParams);
            lightningStrikeMesh = new THREE.Mesh(Store.lightningStrike, Store.scene.userData.lightningMaterial);

            outlineMeshArray.length = 0;
            outlineMeshArray.push(lightningStrikeMesh);

            Store.scene.add(lightningStrikeMesh);
        };

        Store.scene.userData.recreateRay();

    }

    update(time) {
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_lightningstrike.html#L343
        // console.log('(Lightning) - update() -> time: ', time);

        // Move cones and Update ray position
        // // coneMesh1.position.set( Math.sin( 0.5 * time ) * conesDistance * 0.6, conesDistance + coneHeight, Math.cos( 0.5 * time ) * conesDistance * 0.6 );
        // // coneMesh2.position.set( Math.sin( 0.9 * time ) * conesDistance, coneHeightHalf, 0 );
        // Store.lightningStrike.rayParameters.sourceOffset.copy( coneMesh1.position );
        // Store.lightningStrike.rayParameters.sourceOffset.y -= coneHeightHalf;
        // Store.lightningStrike.rayParameters.destOffset.copy( coneMesh2.position );
        // Store.lightningStrike.rayParameters.destOffset.y += coneHeightHalf;


        // const lightningInitPos = {x: 0, y: 120, z: 0};
        const lightningInitPos = {x: 0, y: 30, z: 0};
        // lightningInitPos.y = Math.sin( 0.5 * time );

        const lightningEndPos = {x: 0, y: 0, z: 0};

        Store.lightningStrike.rayParameters.sourceOffset.copy(lightningInitPos);
        Store.lightningStrike.rayParameters.sourceOffset.y -= 30;
        Store.lightningStrike.rayParameters.destOffset.copy(lightningEndPos);
        Store.lightningStrike.rayParameters.destOffset.y += 30;
        
        Store.lightningStrike.update(time);
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_lightningstrike.html#L353
    }   
}