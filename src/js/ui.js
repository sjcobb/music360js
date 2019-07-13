import globals from './globals.js';
import Tone from 'tone';

/*
 *** USER INTERFACE ***
 */

//-----SETTINGS CONTAINER------//

/* Chrome autoplay on gesture bug */
// https://github.com/Tonejs/Tone.js/issues/341
document.documentElement.addEventListener(
    "mousedown",
    function() {
        const mouse_IsDown = true;
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
    }
);

/* stop all sounds */
var button = document.querySelector(".play");
button.addEventListener("click", function() {
    console.log('Tone.Transport STOPPED... bounceSynth disconnected...');
    Tone.Transport.stop();
    // bounceSynth.disconnect();
    // //bounceSynth.dispose();
});

let bounce = document.getElementById('bounce');
// bounce.innerHTML = 'BOUNCE!';
bounce.onclick = () => {
    Tone.Transport.start();
    // Tone.Transport.start("+0.1", 0);

    // if (bounceControl === false) {
    //     bounceControl = true;
    //     bounce.innerHTML = 'STOP';
    // }
    // else {
    //     bounceControl = false;
    //     bounce.innerHTML = 'BOUNCE!';
    // }
};

document.getElementById('shape-form').onchange = (evt) => {
    switch (evt.target.value) {
        case 'box':
            currentShape = box;
            break;
        case 'sphere':
            currentShape = sphere;
            break;
        case 'torus':
            currentShape = torus;
            break;
        default:
            currentShape = box;
            break;
    }
    obj.geometry = currentShape;
    obj.geometry.buffersNeedUpdate = true;
};

document.getElementById('mesh-form').onchange = (evt) => {
    switch (evt.target.value) {
        case 'phong':
            currentMesh = phong;
            break;
        case 'basic':
            currentMesh = basic;
            break;
        case 'lambert':
            currentMesh = lambert;
            break;
        default:
            currentMesh = box;
            break;
    }
    obj.material = currentMesh;
    obj.material.needsUpdate = true;
};

let controlsId = document.getElementById('controls-container');
let settingsId = document.getElementById('settings-container');
let toggleId = document.getElementById('settings-toggle-btn');


toggleId.onclick = (el) => {
    // console.log('RUN toggleId');
    toggleId.classList.toggle('hidden-active');
    settingsId.classList.toggle('hidden');
};

let addShapeId = document.getElementById('call-add-shape');
addShapeId.onclick = (el) => {
    addBody();
};

if (globals.autoStart === true) {
    setTimeout(function() {
        Tone.Transport.start();
    }, 5000);
    // }, 1000);

} else {
    // console.log(controlsId.classList);
    // controlsId.classList.toggle('hidden');
    controlsId.classList.toggle('show');
}

// setTimeout(function() {
//     globalCameraPositionBehind = false;
//     // camera.position.set(0, 20, 40);
//     camera.position.set(0, 5, 35);
//     camera.lookAt(new THREE.Vector3(-1, 1, 10));
// // }, 54000);
// }, 2000);

// globalCameraPositionBehind = false;
// // camera.position.set(0, 5, 35);
// camera.position.set(0, 5, 35);
// camera.lookAt(new THREE.Vector3(-1, 1, 10));
// // camera.lookAt(new THREE.Vector3(-1, 1, 10));
// setTimeout(function() {
//     scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.0028 );
//     globalCameraPositionBehind = true;
//     camera.position.set(globalPosBehindX, 6, globalPosBehindZ);
//     camera.lookAt(new THREE.Vector3(globalDropPosX - 5, 1, globalPosBehindZ));
// }, 58000);
// // }, 2000);

// setTimeout(function() {
//     flameFirst.addFire();
// }, 1000);