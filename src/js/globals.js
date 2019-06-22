// import InstrumentMappings from './InstrumentMappings.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default {

    // constructor() {
    //     // super();
    //     this.scene = new THREE.Scene();
    // }

    scene: new THREE.Scene(),
    world: new CANNON.World(),
    camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new THREE.WebGLRenderer(),
    // controls: new FlyControls(camera),
    controls: '',
    loader: new THREE.TextureLoader(),
    posBehindX: -30,
    posBehindZ: 3.8,
    globalActiveInstrColor: '#9F532A', //red
    cameraPositionBehind: true,
    fixedTimeStep: 1.0 / 60.0,
    configColorAnimate: false,
    instr: {},
    triggerAnimationTime: '4:0:0',
    autoStart: false,
    autoScroll: true,

    // scene = new THREE.Scene();
    //-----INITIAL GLOBAL VARIABLES------//
    // const globalAutoStart = false;

    // const globalClock = new THREE.Clock();
    // let globalTimeCount = 2;

    // let globalTicks = 0;
    // let globalInstrumentCounter = 0;

    // const instrument = new InstrumentMappings();

    // const globalKeyMappedDefaultObj = instrument.getInstrumentMappingTemplate();
    // const instr = instrument.getInstrumentMappingTemplate();

    // const globalBallTextureWidth = 512;
    // const globalCollisionThreshold = 4; //prev: 3.4

    // const globalFixedTimeStep = 1.0 / 60.0;
    // const globalDamping = 0.01; //gradually decrease bounce amplitude

    // let globalDropPosX = 5.5;

    // const globalLetterNumArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG']; //TODO: remove globalLetterNumArr array, only instrumentMapping obj needed

    // const globalShowStaticRows = false; //true: show row of balls on page load

    // const globalAutoScroll = true;
    // const globalPlayPreset = false;

    // let globalMusicActive = false;

    // let globalMovementSpeed = 0.005;
    // let globalRotation = 0;

    // let globalCameraPositionBehind = true;
    // let globalPosBehindX = -30;

    // let globalPosBehindY = 2;
    // let globalPosBehindZ = 3.8;

    // let globalConfigColorAnimate = false; //animate color on note trigger (non-drum type)

    // let globalActiveInstrColor = '#9F532A'; //fire temple red dk

    // let globalGroundMeshIncrementer = 0;

    // let lastColor = '#000000';
    // const globalStaffLineInitZ = 8;
    // const globalStaffLineInitDrumZ = -(globalStaffLineInitZ);

};