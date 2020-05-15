import * as THREE from 'three';
import Store from './Store.js';

export default class Musician {

    constructor(name) {
        // super();

        // https://stackoverflow.com/a/31924233/7639084
        this.name = name;
        // this.instrSprite = {};
        this.instrSprite = new THREE.Sprite();
    }

    init(assetPath, startTime) { 
        console.log('(Musician) - init() -> this.name: ', this.name);
        console.log('(Musician) - init() -> this.instrSprite: ', this.instrSprite);

        let instrSprite;
        let spriteTexture;

        spriteTexture = Store.loader.load(assetPath);

        // https://threejs.org/docs/#api/en/materials/SpriteMaterial.color
        const spriteMaterial = new THREE.SpriteMaterial({
            map: spriteTexture,
            transparent: true, 
            side: THREE.DoubleSide,
            // opacity: 0.5,
            // color: 0xffffff,
            // rotation: Math.PI / 2, // facing up
        });

        instrSprite = new THREE.Sprite(spriteMaterial);
        console.log('instrSprite: ', instrSprite);

        instrSprite.position.set(...Store.view.instrumentConfigArr[0].location);
        instrSprite.scale.set(5, 5, 5);

        // this.instrSprite = instrSprite;

        Store.musicians.push(instrSprite);

        setTimeout(function() {
            // console.log(typeof this.instrSprite)
            // Store.scene.add(this.instrSprite);
            // Store.scene.add(instrSprite);

            Store.scene.add(Store.musicians[0]);
        }, startTime);
        // }, 9000);
       
    }

    createVisuals() { 

    }

    attachAudio() { 

    }

    update() {
        const spriteBackwardOffset = 0.05;
        const spriteSpeed = 0.1;

        if (Store.view.instrumentConfigArr[0].location[2] < 20 && Store.view.instrumentConfig.directionRight) {
            Store.view.instrumentConfigArr[0].location[0] += spriteBackwardOffset; // back / front
            Store.view.instrumentConfigArr[0].location[2] += spriteSpeed;
        } else if (Store.view.instrumentConfigArr[0].location[2] > -20) {
            Store.view.instrumentConfigArr[0].location[0] += spriteBackwardOffset;
            Store.view.instrumentConfigArr[0].location[2] -= spriteSpeed;
    
            // https://stackoverflow.com/a/23684251/7639084
            // spriteTexture.repeat.set(-1, 1);
            // spriteTexture.offset.set(1, 0);
    
            Store.view.instrumentConfig.directionRight = false;
        } else {
            // spriteTexture.repeat.set(1, 1);
            // spriteTexture.offset.set(0, 0);
            Store.view.instrumentConfig.directionRight = true;
        }
        // this.instrSprite.position.set(...Store.view.instrumentConfigArr[0].location);
        Store.musicians[0].position.set(...Store.view.instrumentConfigArr[0].location);
    }
}