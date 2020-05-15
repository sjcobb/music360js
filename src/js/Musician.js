import * as THREE from 'three';
import Store from './Store.js';

export default class Musician {

    constructor(name, startLocation) {
        // super();

        // https://stackoverflow.com/a/31924233/7639084
        this.name = name;
        // this.instrSprite = {};
        this.instrSprite = new THREE.Sprite();
        this.location = startLocation;
    }

    init(assetPath, startTime, location) { 
        console.log('(Musician) - init() -> this.name: ', this.name);
        // console.log('(Musician) - init() -> this.instrSprite: ', this.instrSprite);

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

        instrSprite.position.set(...this.location);
        instrSprite.scale.set(5, 5, 5);

        // this.instrSprite = instrSprite;

        const musicianObj = {
            sprite: instrSprite,
            texture: spriteTexture,
        };
        Store.musicians.push(musicianObj);
        // Store.musicians.push(instrSprite);

        this.instrSprite = musicianObj.sprite;

        console.log('PRE this.instrSprite: ', this.instrSprite);

        setTimeout(function() {
            // console.log(typeof this.instrSprite)
            // Store.scene.add(this.instrSprite);
            // Store.scene.add(instrSprite);

            // Store.scene.add(Store.musicians[0]);

            this.instrSprite = musicianObj.sprite;
            console.log('setTimeout -> this.instrSprite: ', this.instrSprite);
            
            // Store.scene.add(Store.musicians[0].sprite);
            Store.scene.add(this.instrSprite);
        }, startTime);
        // }, 9000);
       
    }

    createVisuals() { 
        console.log('(Musician) - createVisuals() -> this.name: ', this.name);
    }

    attachAudio() { 
        console.log('(Musician) - attachAudio() -> this.name: ', this.name);
    }

    update() {
        const spriteBackwardOffset = 0.05;
        const spriteSpeed = 0.1;

        // console.log('this.location: ', this.location);
        if (this.location[2] < 20 && Store.view.instrumentConfig.directionRight) {
            this.location[0] += spriteBackwardOffset; // back / front
            this.location[2] += spriteSpeed;
        } else if (this.location[2] > -20) {
            this.location[0] += spriteBackwardOffset;
            this.location[2] -= spriteSpeed;
    
            // https://stackoverflow.com/a/23684251/7639084
            // spriteTexture.repeat.set(-1, 1);
            // spriteTexture.offset.set(1, 0);

            Store.musicians[0].texture.repeat.set(-1, 1);
            Store.musicians[0].texture.offset.set(1, 0);
    
            Store.view.instrumentConfig.directionRight = false;
        } else {
            // spriteTexture.repeat.set(1, 1);
            // spriteTexture.offset.set(0, 0);

            Store.musicians[0].texture.repeat.set(1, 1);
            Store.musicians[0].texture.offset.set(0, 0);

            Store.view.instrumentConfig.directionRight = true;
        }
        // this.instrSprite.position.set(...this.location);
        // Store.musicians[0].position.set(...this.location);

        // console.log('update -> this.instrSprite: ', this.instrSprite);
        // Store.musicians[0].sprite.position.set(...this.location); // prev
        this.instrSprite.position.set(...this.location);
    }
}