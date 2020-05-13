import * as THREE from 'three';

// import InstrumentMappings from './InstrumentMappings.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default {
    // activeInstrColor: '#9F532A', //ltred
    // activeInstrColor: '#800000', //dkred
    // activeInstrColor: '#8F0000', //medred
    // activeInstrColor: '#0018F9', //music wheel I blue
    // activeInstrColor: '#7ec850', //grass green (lt)
    // activeInstrColor: '#567d46', //grass green (md)
    // activeInstrColor: '#edc9af', //desert sand
    // activeInstrColor: '#e9be9f', // sand (md)
    // activeInstrColor: '#e5b38f', //PREV - sand (md2)
    // activeInstrColor: '#d8d8d8',
    // activeInstrColor: '#00A29C', // teal: https://www.color-hex.com/color-palette/4666
    // activeInstrColor: '#66b2b2', // lt teal
    // activeInstrColor: '#003366', // spinner midnight blue
    // activeInstrColor: '#001f3e',
    // activeInstrColor: '#1f1f1f',
    // activeInstrColor: '#343434', // PREV (gray)
    // activeInstrColor: '#ffffff',
    activeInstrColor: '#0047bb', // blue screen
    // activeInstrColor: '#FF0000', // red
    ai: {
        enabled: false,
    },
    assets: {
        // https://drive.google.com/drive/folders/1KCnflGLa-6m_szDDYsWMiBFDZNony6e9
        // https://www.reddit.com/r/makinghiphop/comments/efhy4i/what_are_the_best_808_drum_kits/
        //
        // kick: "./assets/sounds/drum-kits/808/808-kick-vm.mp3",
        // kick: "./assets/sounds/drum-kits/808/808-cardi-money.wav", // low boom (bad on speakers)
        // kick: "./assets/sounds/drum-kits/808/808-cardi-ring.wav", // short (bad)
        kick: "./assets/sounds/drum-kits/808/808-dolph.wav", // YES (pops ughh)
        // kick: "./assets/sounds/drum-kits/808/808-flip.wav", // way too soft
        // kick: "./assets/sounds/drum-kits/808/808-polo.wav", // decent, soft

        // kick: "./assets/sounds/drum-kits/808/808-pusha.wav", // ?
        // kick: "./assets/sounds/drum-kits/808/808-murda.wav", // too low
        // kick: "./assets/sounds/drum-kits/808/808-choppa.wav", // too low
        // kick: "./assets/sounds/drum-kits/808/808-yc.wav",
    },
    autoScroll: false,

    // bpm: 120, // v0.4
    // bpm: 140,
    // bpm: 160,
    bpm: 120,
    camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000),
    // cameraCircularAnimation: false, // true - drum spinner (v0.3), NOW view.drumCircle
    cameraLookUp: false,
    cameraShakeEnabled: true,
    cameraShakeActive: false,
    clock: new THREE.Clock(),
    clockNote: new THREE.Clock(),
    configColorAnimate: true,
    controls: '',
    // controls: new FlyControls(camera),
    // currentNoteLength: 0, // not needed
    currentNote: {
        keydownTimeStamp: 0,
        keydownPressed: false,
        keyupTimeStamp: 0,
    },
    damping: 0.01, // effects bounciness, lag
    dashboard: {
        chart: {},
        // lastNote: 'C4',
        lastNote: '',
        lastNoteLength: 0,
        // playedNotes: ['C4', 'D4', 'C5'],
        allPlayedNotes: [],
        allPlayedOctaves: [],
        recentPlayedNotes: [],
        noteCountsObj: {
            // TODO: final data structure chosen for bar3D, clean up others
        },
        noteCountsArr: [
            // {note: 'A', octave: 3, count: 0},
        ],
        instrData: [],
        // https://echarts.apache.org/en/option.html#dataset.source
        dataset: {
            source: [
                ['Note', '0:0:0', '1:0:0', '2:0:0', '3:0:0'],
                ['C4', 1, 0, 0, 1],
                ['D4', 0, 1, 1, 1],
            ]
        },
        midiConvertData: {
            source: [
                {
                    "duration": 0.6,
                    "durationTicks": 960,
                    "midi": 60,
                    "name": "C4",
                    "ticks": 0,
                    "time": 0,
                    "velocity": 0.5433070866141733
                },
                {
                    "duration": 1.2,
                    "durationTicks": 1920,
                    "midi": 48,
                    "name": "C3",
                    "ticks": 0,
                    "time": 0,
                    "velocity": 0.5118110236220472
                },
                {
                    "duration": 0.6,
                    "durationTicks": 960,
                    "midi": 60,
                    "name": "C4",
                    "ticks": 960,
                    "time": 0.6,
                    "velocity": 0.5984251968503937
                },
            ]
        }
    },
    dropCoordCircle: [],
    dropCoordCircleInterval: [],
    dropOffset: 0,
    // dropPosX: 5.5, //prev
    dropPosX: 0,
    dropPosY: 0,
    //  dropPosZ: 0, // should z be swapped with y?
    drumsOnly: false,
    fixedTimeStep: 1.0 / 60.0,
    flameArr: [],
    flameCounter: 0,
    floorExplodeCount: 1,
    floorMaterial: null,
    floorMesh: null,
    inputMidi: false,
    instr: {},
    instrumentCounter: 0,
    // keysOnly: true,
    lastColor: '#000000',
    loader: new THREE.TextureLoader(),
    machineTrigger: false,
    meshes: [],
    bodies: [],
    multiplierPosX: -2.5,
    musicActive: false,
    patternInfinite: false,
    polySynth: {},
    groundMeshIncrementer: 0,
    recording: {
        playerFirst: {},
        parts: [
            {
                notes: [],
            },
            {
                notes: [],
            },
            {
                notes: [],
            },
        ],
        // first: {
        //     notes: [],
        // },
        // second: {
        //     notes: [],
        // },
        // third: {
        //     notes: [],
        // },
    },
    renderer: new THREE.WebGLRenderer(),
    sampler: {
        strings: {},
        guitar: {},
        saxophone: {},
        saxophoneCounter: 0,
    },
    scene: new THREE.Scene(),
    spinnerBody: {},
    // staffLineInitZ: 8,    // remove
    // staffLineSecondZ: -8, // remove
    // showStaticRows: false, // old static animation
    tempPos: 0,
    ticks: 0,
    triggerAnimationTime: '4:0:0',
    triggerOn: 'contact', 
    // triggerOn: 'spinner', 
    // Transport: Tone.Transport, //TODO: add Transport here for logging ticks and position
    uiHidden: false,
    ui: {
        machine: {
            currentSequence: []
        }
    },
    view: {

        drumCircle: true,
        skybox: true,
        skyboxTheme: 'underwater',
        cameraPositionBehind: true,
        cameraAutoStart: true,
        cameraLookAtSprite: false,
        // posBehindX: -70,
        // posBehindY: 8,
        // posBehindZ: 1,

        // posBehindX: -70,
        // posBehindX: -45, // earthquake
        posBehindX: -65,
        // posBehindY: 12,
        posBehindY: -2,
        posBehindZ: 0,

        bubbleTexture: new THREE.TextureLoader().load('assets/bubble/bubble_pop_one/1.png'),
        bubbleAssetPath: 'assets/bubble/bubble_pop_one/1.png',
        // bubbleAssetPath: 'assets/bubble/bubble_pop_one/4.png',
        // bubbleAssetPath: 'assets/bubble/bubble_pop_one/7.png',
        
        instrumentConfig: {
            // assetPath: 'assets/logo/ai_robot_1.jpeg',
            assetPath: 'assets/fish/blue_fish_01.png',
            // assetPath: 'assets/fish/red_fish_01.jpg',
            // assetPath: 'assets/fish/green_fish_01.png',
            // assetPath: 'assets/fish/green_fish_02.png',

            // location: [-5, 2, 0],
            // location: [-20, 18, 0],
            // location: [-20, 30, 0],
            location: [-20, 0, -10],
            directionRight: true,
        },

        instrumentConfigArr: [
            {
                assetPath: 'assets/fish/blue_fish_01.png',
                location: [-20, 0, -10],
                active: false,
                directionRight: true,
                animationFrame: 1, // TODO: split bubbleAssetPath string and add frame number (how to update after bubble already in progress? multiple bubbles per instrument?)
                // bubbleTexture: new THREE.TextureLoader().load('assets/bubble/bubble_pop_one/1.png', function (texture) {
                bubbleTexture: new THREE.TextureLoader().load('assets/bubble/bubble_pop_one/1.png', function (texture) {
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(2, 1);
                }),
                // ballMaterial: new THREE.MeshLambertMaterial({ 
                //     color: 0xffffff,
                //     map: Store.view.instrumentConfigArr[0].bubbleTexture,
                //     transparent: true,
                // }),
            },
            {
                assetPath: 'assets/fish/green_fish_02.png',
                location: [-20, 0, -10],
                active: false,
                directionRight: true,
                animationFrame: 1,
                bubbleTexture: new THREE.TextureLoader().load('assets/bubble/bubble_pop_one/3.png', function (texture) {
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(2, 1);
                }),
            },
            {
                assetPath: 'assets/fish/red_fish_01.png',
                location: [-20, 0, -10],
                active: false,
                directionRight: true,
                animationFrame: 1,
                bubbleTexture: new THREE.TextureLoader().load('assets/bubble/bubble_pop_one/5.png', function (texture) {
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(2, 1);
                }),
            },
        ],
            

        songAutoStart: true,
        songAutoStartTime: 3000,
        showDashboard: false,
        showLogoSprite: true,
        showRadio: false,
        showStats: true,
        showStaff: {
            bass: false,
            treble: false,
        },
        stage: {
            // size: 'large',
            // size: 'medium',
            // size: 'small',
            size: 'underwater',
        }
    },
    world: new CANNON.World(),
};

/*** COLOR OPTIONS ***/
// '#7cfc00'; //lawn green
// '#F8041E'; //fire temple red med
// '#9F532A'; //fire temple red dk
// '#191CAC'; //deepblue
// '#0018F9'; //music wheel I blue
// '#C6018B'; //music wheel VI pink
// '#4B0AA1'; //music wheel V - dkblue
// '#006CFA'; //music wheel IV - medblue