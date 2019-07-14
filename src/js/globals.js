// import InstrumentMappings from './InstrumentMappings.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default {
    activeInstrColor: '#9F532A', //red
    // activeInstrColor: '#0018F9', //music wheel I blue
    autoScroll: true,
    autoStart: false,
    camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000),
    cameraPositionBehind: true,
    configColorAnimate: true,
    controls: '',
    // controls: new FlyControls(camera),
    damping: 0.01,
    dropPosX: 5.5,
    fixedTimeStep: 1.0 / 60.0,
    instr: {},
    instrumentCounter: 0,
    lastColor: '#000000',
    loader: new THREE.TextureLoader(),
    multiplierPosX: -2.5,
    musicActive: false,
    posBehindX: -30,
    posBehindY: 2,
    posBehindZ: 3.8,
    groundMeshIncrementer: 0,
    renderer: new THREE.WebGLRenderer(),
    scene: new THREE.Scene(),
    ticks: 0,
    triggerAnimationTime: '4:0:0',
    world: new CANNON.World(),
};