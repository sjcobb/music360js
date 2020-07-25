import * as THREE from 'three';
import Tone from 'Tone';
import Store from './Store.js';
import Physics from './Physics.js';
import { generateInstrMetadata } from './InstrumentMappings';

export default class Musician {

    constructor(name, location, animateSideways) {
        // super();

        // https://stackoverflow.com/a/31924233/7639084

        this.name = name;
        this.sprite = {};
        this.texture = {};
        this.location = location;
        this.directionRight = true;
        this.animateSideways = animateSideways;

        this.active = false;
    }

    // https://coryrylan.com/blog/javascript-es6-class-syntax
    // get name() {
    //     return this.name.toUpperCase();
    // }
    // set name(newName) {
    //     this.name = newName;
    // }

    get activeStatus() {
        return this.active;
    }

    // getActiveStatus() {
    //     return this.active;
    // }

    init(assetPath, startTime) { 
        // console.log('(Musician) - init() -> this.name: ', this.name);
        // console.log('(Musician) - init() -> this.sprite: ', this.sprite);

        // this.location[0] -= 20; // moves closer to camera

        if (this.animateSideways === true) { 
            this.location[2] -= 20; // moves further to left
        } else {
            this.location[2] = 0; 
        }

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
        instrSprite.scale.set(1, 1, 1);
        // instrSprite.scale.set(2, 2, 2);
        // instrSprite.scale.set(15, 15, 15);

        // this.sprite = instrSprite;

        const musicianObj = {
            sprite: instrSprite,
            texture: spriteTexture,
            location: this.location,
        };
        // Store.musicians.push(musicianObj);

        this.texture = musicianObj.texture;
        this.sprite = musicianObj.sprite;

        // console.log('PRE this.sprite: ', this.sprite);

        // setTimeout(function() {
        setTimeout(() => {
            // console.log(typeof this.sprite)
            // Store.scene.add(this.sprite);
            // Store.scene.add(instrSprite);

            // Store.scene.add(Store.musicians[0]);

            this.sprite = musicianObj.sprite;
            // console.log('setTimeout -> this.sprite: ', this.sprite);
            
            // Store.scene.add(Store.musicians[0].sprite);
            Store.scene.add(this.sprite);

            this.active = true;
            // console.log(this.active);
        }, startTime);
        // }, 9000);

        // if (this.name === 'fish_1') {
        //     this.attachAudio();
        // }
       
    }

    createVisuals() { 
        console.log('(Musician) - createVisuals() -> this.name: ', this.name);
        // TODO: split up init into separate functions
    }

    setAudio(config, startTime) { 
        // console.log('(Musician) - attachAudio() -> this.name: ', this.name);
        const tempLocation = this.location;

        const physics = new Physics();

        let tonePart;
        // console.log(this)
        // if (this.name === 'fish_3') {
        if (config.type === 'midi') {
            tonePart = new Tone.Part(function(time, datum){
                const instrMapped = generateInstrMetadata(datum.name);
                // console.log({instrMapped});
                // instrMapped.color = '#64b5f6'; // human blue
                // instrMapped.originalPosition.z += 10;
                // instrMapped.duration = datum.duration;
                // instrMapped.variation = 'guitar';

                if (config.defaultDuration) {
                    instrMapped.duration = config.defaultDuration;
                }

                if (config.customDuration) {
                    instrMapped.duration *= 2;
                }

                if (config.variation) {
                    instrMapped.variation = config.variation;
                }

                physics.addBody(true, Store.dropPosX, instrMapped, 0, tempLocation);
            // }, Store.recording.parts[0]);
            }, config.notes);
        } else if (config.type === 'default') {
            console.log(config.notes);
            tonePart = new Tone.Part(function(time, instr) {
                if (config.defaultDuration) {
                    instr.duration = config.defaultDuration;
                }
                physics.addBody(true, Store.dropPosX, instr, 0, tempLocation);
            }, config.notes);
            // tonePart.loop = true;
        }

        if (config.loop === true) {
            tonePart.loop = true;
        }
        
        tonePart.start(startTime);
    }

    update() {
        // const spriteBackwardOffset = 0.07; // PREV
        // const spriteBackwardOffset = 0.25;
        const spriteBackwardOffset = Store.ticks;

        // const spriteSpeed = 0.15; // decent
        // const spriteSpeed = 0.20; // too fast

        const spriteSpeed = 0.10;

        if (this.animateSideways === false) { 
            this.location[2] = 0; 
        }

        if (this.active === true) {
            
            // console.log(this);
            if (this.location[2] < 30 && this.directionRight) {
                // this.location[0] += spriteBackwardOffset; // prev
                this.location[0] = spriteBackwardOffset; // back / front

                if (this.animateSideways === true) {
                    this.location[2] += spriteSpeed;
                }
            } else if (this.location[2] > -50) {
               //  this.location[0] += spriteBackwardOffset; // prev
                this.location[0] = spriteBackwardOffset;

                if (this.animateSideways === true) {
                    this.location[2] -= spriteSpeed;
                }
        
                // https://stackoverflow.com/a/23684251/7639084
                // this.texture.repeat.set(-1, 1);
                // this.texture.offset.set(1, 0);
        
                // Store.view.instrumentConfig.directionRight = false;
                this.directionRight = false;
            } else {

                if (this.animateSideways === true) {
                    this.texture.repeat.set(1, 1); // flips sprite when hits right edge
                    this.texture.offset.set(0, 0); // flips sprite when hits right edge
                }

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
}