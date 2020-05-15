import * as THREE from 'three';
import Store from './Store.js';

export default class Musician {

    constructor(name, location) {
        // super();

        // https://stackoverflow.com/a/31924233/7639084

        this.name = name;
        this.sprite = {};
        this.texture = {};
        this.location = location;
        this.directionRight = true;
    }

    init(assetPath, startTime) { 
        console.log('(Musician) - init() -> this.name: ', this.name);
        // console.log('(Musician) - init() -> this.sprite: ', this.sprite);

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
        // console.log('instrSprite: ', instrSprite);

        instrSprite.position.set(...this.location);
        instrSprite.scale.set(5, 5, 5);

        // this.sprite = instrSprite;

        const musicianObj = {
            sprite: instrSprite,
            texture: spriteTexture,
            location: this.location,
        };
        Store.musicians.push(musicianObj);
        // Store.musicians.push(instrSprite);

        this.texture = musicianObj.texture;
        this.sprite = musicianObj.sprite;

        // console.log('PRE this.sprite: ', this.sprite);

        setTimeout(function() {
            // console.log(typeof this.sprite)
            // Store.scene.add(this.sprite);
            // Store.scene.add(instrSprite);

            // Store.scene.add(Store.musicians[0]);

            this.sprite = musicianObj.sprite;
            // console.log('setTimeout -> this.sprite: ', this.sprite);
            
            // Store.scene.add(Store.musicians[0].sprite);
            Store.scene.add(this.sprite);
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
        // if (this.location[2] < 20 && Store.view.instrumentConfig.directionRight) {
        if (this.location[2] < 20 && this.directionRight) {
            this.location[0] += spriteBackwardOffset; // back / front
            this.location[2] += spriteSpeed;
        } else if (this.location[2] > -20) {
            this.location[0] += spriteBackwardOffset;
            this.location[2] -= spriteSpeed;
    
            // https://stackoverflow.com/a/23684251/7639084
            this.texture.repeat.set(-1, 1);
            this.texture.offset.set(1, 0);

            // Store.musicians[0].texture.repeat.set(-1, 1);
            // Store.musicians[0].texture.offset.set(1, 0);
    
            // Store.view.instrumentConfig.directionRight = false;
            this.directionRight = false;
        } else {
            this.texture.repeat.set(1, 1);
            this.texture.offset.set(0, 0);

            // Store.musicians[0].texture.repeat.set(1, 1);
            // Store.musicians[0].texture.offset.set(0, 0);

            // Store.view.instrumentConfig.directionRight = true;
            this.directionRight = true;
        }
        // this.sprite.position.set(...this.location);
        // Store.musicians[0].position.set(...this.location);

        // console.log('update -> this.sprite: ', this.sprite);
        // Store.musicians[0].sprite.position.set(...this.location); // prev
        this.sprite.position.set(...this.location);
    }
}