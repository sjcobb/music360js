import Tone from 'Tone';
import { Transport, Player, Players, Part, Time, Volume } from 'Tone';

import { generateInstrMetadata } from './InstrumentMappings.js';

// import Transport from 'Tone/core/Transport';
// import Volume from 'Tone/component/Volume';

import Store from './Store.js';

import InstrumentMappings from './InstrumentMappings.js';
import { getInstrByNote } from './InstrumentMappings.js';

import Physics from './Physics.js';
import Flame from './Flame.js';

//-----TONE------//
// Tone.Transport.bpm.value = 200; //PREV
// Tone.Transport.bpm.value = 120;
Tone.Transport.bpm.value = Store.bpm;
// Tone.Transport.bpm.rampTo(120, 10);

// https://tonejs.github.io/docs/r13/Transport#timesignature
// Tone.Transport.timeSignature = 12; // v0.4, v0.5
Tone.Transport.timeSignature = 20;

// Tone.Transport.timeSignature = 4;     // DEFAULT

// Tone.Transport.setLoopPoints(0, "13m"); //starts over at beginning
// Tone.Transport.loop = true; //TODO: *** clear all addBody objects if Transport loop true

//-----SYNTH ASSETS------//
// https://tonejs.github.io/examples/polySynth.html
// https://tonejs.github.io/docs/13.8.25/PolySynth

// var polySynth = new Tone.PolySynth(6, Tone.Synth, {
// Store.polySynth = new Tone.PolySynth(4, Tone.Synth, { // default
Store.polySynth = new Tone.PolySynth(10, Tone.Synth, {
    // oscillator: {
    //     type: "triangle", // sine, square, sawtooth, triangle (default), custom
    //     // frequency: 440 ,
    //     // detune: 0 ,
    //     // phase: 0 ,
    //     // partials: [] ,
    //    partialCount: 0
    // },
    // // https://tonejs.github.io/docs/13.8.25/Envelope
    envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
        // attack: 0.1,
        // decay: 0.2,
        // sustain: 1, // v0.5
        // sustain: 0.5, 
        // release: 0.8,
    },
    // // https://tonejs.github.io/docs/13.8.25/Filter#type
    // filter: {
	// 	// type: "highpass", // lowpass, highpass, bandpass, lowshelf, highshelf, notch, allpass, peaking
	// },
}).toMaster();

// Store.polySynth.volume.value = -8; // v0.4, v0.5
Store.polySynth.volume.value = -14;

// Store.polySynth.set("detune", +1200); // octave = 12 semitones of 100 cents each
// Store.polySynth.set("detune", +1200);

const bounceSynth = new Tone.Synth();
bounceSynth.volume.value = 2;
bounceSynth.toMaster();

var toneSnare = new Tone.NoiseSynth({
    "volume": -5.0,
    "envelope": {
        "attack": 0.001,
        "decay": 0.2,
        "sustain": 0
    },
    "filterEnvelope": {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 0
    }
}).toMaster();

// const player808HiHat = new Player(`${sampleBaseUrl}/808-hihat-vh.mp3`).toMaster();
// const playerHiHatOpen = new Tone.Player("./assets/sounds/drum-kits/dubstep/hihat-open.mp3").toMaster(); //PREV
const playerHiHatOpen = new Player("./assets/sounds/drum-kits/dubstep/hihat-open.mp3").toMaster();
const playerHiHat = new Player("./assets/sounds/drum-kits/dubstep/hihat-closed.mp3").toMaster();
playerHiHatOpen.volume.value = -2;
playerHiHat.volume.value = -2;

// const playerKick = new Player("./assets/sounds/drum-kits/analog/kick.mp3").toMaster(); //aka dubstep - 808?
// const playerKick = new Player("./assets/sounds/drum-kits/dubstep/kick.mp3").toMaster(); //aka analog - PREV
// const playerKick = new Player("./assets/sounds/drum-kits/electronic/kick.mp3").toMaster(); //guitar pluck
// const playerKick = new Player("./assets/sounds/drum-kits/percussion/kick.mp3").toMaster(); //normal

// const playerKick = new Player("./assets/sounds/drum-kits/808/808-kick-vh.mp3").toMaster(); // high
// const playerKick = new Player("./assets/sounds/drum-kits/808/808-kick-vm.mp3").toMaster(); // medium
// const playerKick = new Player("./assets/sounds/drum-kits/808/808-kick-vl.mp3").toMaster(); // low

// console.log('Store.assets.kick: ', Store.assets.kick);
const playerKick = new Player(Store.assets.kick).toMaster();

// const playerKick = new Player("./assets/sounds/drum-kits/hiphop/kick.mp3").toMaster(); //v2, v3, v4 (boring, but not distorted)
// playerKick.volume.value = +2; // v0.5
playerKick.volume.value = -6; // v0.6
// playerKick.volume.value = +2;
// playerKick.volume.value = -20;

// playerKick.volume.value = -6; // -6 broken
// playerKick.input.value = -4; //err
// {
//     onload: Tone.noOp ,
//     playbackRate: 1 ,
//     loop: false ,
//     autostart: false ,
//     loopStart: 0 ,
//     loopEnd: 0 ,
//     reverse: false ,
//     fadeIn: 0 ,
//     fadeOut: 0
// }

console.log({playerKick});

const playerKickSecondary = new Player(Store.assets.kick).toMaster();
// const playerKickSecondary = new Player("./assets/sounds/drum-kits/electronic/tom-high.mp3").toMaster();
playerKickSecondary.volume.value = -6;

// input: AudioParam {value: 1, automationRate: "a-rate", defaultValue: 1, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}

const playerCrash = new Player("./assets/sounds/drum-kits/hiphop/clap.mp3").toMaster(); //hand clap echo
// const playerCrash = new Player("./assets/sounds/drum-kits/percussion/clap.mp3").toMaster(); //stick click

// const playerRide = new Player("./assets/sounds/drum-kits/dubstep/ride.wav").toMaster(); //drum stick click
const playerRide = new Player("./assets/sounds/drum-kits/hiphop/ride.mp3").toMaster(); //cool click pop
// const playerRide = new Player("./assets/sounds/drum-kits/electronic/ride.mp3").toMaster(); //high tick metal
// const playerRide = new Player("./assets/sounds/drum-kits/percussion/ride.mp3").toMaster(); //weird low squeak 
// const playerRide = new Player("./assets/sounds/drum-kits/analog/ride.mp3").toMaster(); // drum stick click

const playerTomHigh = new Player("./assets/sounds/drum-kits/electronic/tom-high.mp3").toMaster();
const playerTomMid = new Player("./assets/sounds/drum-kits/electronic/tom-mid.mp3").toMaster();
// const playerTomLow = new Player("./assets/sounds/drum-kits/electronic/tom-low.mp3").toMaster();

// let flameFirst = new Flame();

export default class Trigger {
    constructor() {
        // super();
    }
    
    triggerNote(obj) {
        // console.log({obj});
        // console.log(obj.userData.opts);

        const physics = new Physics();

        const instrument = new InstrumentMappings();

        Store.musicActive = true; //remove?

        // console.log('Trigger -> addBody - opts: ', obj.userData.opts);
        
        let triggerObj = {};
        let combinedNote = 'C1';
        if (obj.userData.opts.type !== 'drum') {
            combinedNote = obj.userData.opts.note ? (obj.userData.opts.note + obj.userData.opts.octave) : 'C4';
            // console.log({combinedNote});

            if (Store.view.showDashboard === true) {
                Store.dashboard.lastNote = combinedNote;

                Store.dashboard.allPlayedNotes.push(combinedNote);

                if (Store.dashboard.noteCountsObj[combinedNote] != null) {
                    Store.dashboard.noteCountsObj[combinedNote].count++;
                } else {
                    Store.dashboard.noteCountsObj[combinedNote] = {
                        note: obj.userData.opts.note,
                        octave: obj.userData.opts.octave,
                        count: 1,
                    };
                }

                Store.dashboard.noteCountsArr = [];
                for (let key in Store.dashboard.noteCountsObj){
                    Store.dashboard.noteCountsArr.push(Store.dashboard.noteCountsObj[key]);
                }

                // https://stackoverflow.com/a/8900824/7639084
                Store.dashboard.noteCountsArr.sort(function(a, b) {
                    var textA = a.note.toUpperCase();
                    var textB = b.note.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                Store.dashboard.recentPlayedNotes.push(combinedNote);
            }

            triggerObj = obj.userData.opts;

        } else {
            triggerObj = instrument.getNoteMapping(obj); //ORIG
        }
        
        // console.log('Trigger -> combinedNote: ', combinedNote);
        let drumIndex = 0;
        if (triggerObj.type === 'drum') {
            if (triggerObj.variation === 'kick') {
                // console.log('trigger -> playerKick: ', playerKick);
                playerKick.start();
                // toneKick.triggerAttackRelease("C2"); //deep
            } else if (triggerObj.variation === 'kick-sec') {
                playerKickSecondary.start();
            } else if (triggerObj.variation === 'hihat') {
                playerHiHat.start();
            } else if (triggerObj.variation === 'hihat-open') {
                playerHiHatOpen.start();
            } else if (triggerObj.variation === 'snare') {
                toneSnare.triggerAttackRelease();
            } else if (triggerObj.variation === 'crash') {
                playerCrash.start();
                // toneCrash.triggerAttackRelease("C4"); //laser
            } else if (triggerObj.variation === 'ride') {
                playerRide.start();
            } else if (triggerObj.variation === 'tom-high') {
                playerTomHigh.start(); // key: 7
                // flameFirst.create(obj.initPosition);
            } else {
                // console.log('UNDEF variation - triggerNote() -> triggerObj (drum): ', triggerObj);
                playerHiHat.start();
            }
            drumIndex++;
        } else if (triggerObj.type === 'chord') { // TODO: rename, universal chord / note accessor
            // console.log('triggerNote (chord) -> combinedNote: ', combinedNote);
            // console.log('triggerNote (chord) -> triggerObj: ', triggerObj);

            // console.log('triggerNote (chord) -> obj.userData.opts.duration: ', obj.userData.opts.duration);
            const noteLength = obj.userData.opts.duration ? obj.userData.opts.duration : 0.15;
            Store.polySynth.triggerAttackRelease(combinedNote, noteLength);
        } else {
            bounceSynth.triggerAttackRelease(combinedNote, "8n");
            // console.log('triggerNote -> ballDesc: ', triggerObj.ballDesc, ', note: ', combinedNote);
        }

        Store.musicActive = false; //remove?

        if (Store.configColorAnimate === true && triggerObj.color) {
            // console.log("configColorAnimate -> GLOBALS: ", globals);
            if (triggerObj.type !== 'drum') {
                Store.activeInstrColor = triggerObj.color;
            }
        }
    }

}



//-----RECORDING------//
// https://codepen.io/gregh/project/editor/aAexRX

const physics = new Physics();

// const recordingNotes = Store.dashboard.midiConvertData.source;

// const recordingNotes = [{"duration":0.8,"name":"A#4","time":0,"velocity":1},{"duration":0.08333333333333326,"name":"A#4","time":1.0666666666666667,"velocity":1},{"duration":0.08749999999999991,"name":"A#4","time":1.2,"velocity":1},{"duration":0.08916666666666662,"name":"A#4","time":1.3291666666666666,"velocity":1},{"duration":0.08333333333333326,"name":"A#4","time":1.4666666666666666,"velocity":1},{"duration":0.12916666666666665,"name":"A#4","time":1.5999999999999999,"velocity":1},{"duration":0.08333333333333326,"name":"G#4","time":1.8666666666666665,"velocity":1},{"duration":0.5333333333333334,"name":"A#4","time":1.9999999999999998,"velocity":1},{"duration":0.08333333333333348,"name":"A#4","time":2.6666666666666665,"velocity":1},{"duration":0.08749999999999991,"name":"A#4","time":2.8,"velocity":1},{"duration":0.08916666666666684,"name":"A#4","time":2.9291666666666663,"velocity":1},{"duration":0.08333333333333348,"name":"A#4","time":3.0666666666666664,"velocity":1},{"duration":0.12916666666666687,"name":"A#4","time":3.1999999999999997,"velocity":1},{"duration":0.08333333333333348,"name":"G#4","time":3.466666666666667,"velocity":1},{"duration":0.5958333333333337,"name":"A#4","time":3.6,"velocity":1},{"duration":0.08333333333333304,"name":"A#4","time":4.2666666666666675,"velocity":1},{"duration":0.08750000000000036,"name":"A#4","time":4.4,"velocity":1},{"duration":0.0891666666666664,"name":"A#4","time":4.529166666666668,"velocity":1},{"duration":0.08333333333333304,"name":"A#4","time":4.666666666666668,"velocity":1},{"duration":0.12916666666666643,"name":"A#4","time":4.800000000000001,"velocity":1},{"duration":0.0625,"name":"F4","time":5.000000000000001,"velocity":1},{"duration":0.0625,"name":"F4","time":5.1000000000000005,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":5.2,"velocity":1},{"duration":0.0625,"name":"F4","time":5.4,"velocity":1},{"duration":0.0625,"name":"F4","time":5.5,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":5.6,"velocity":1},{"duration":0.0625,"name":"F4","time":5.8,"velocity":1},{"duration":0.0625,"name":"F4","time":5.8999999999999995,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":5.999999999999999,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":6.199999999999999,"velocity":1},{"duration":0.2625000000000002,"name":"A#4","time":6.3999999999999995,"velocity":1},{"duration":0.1299999999999999,"name":"D4","time":6.8,"velocity":0.8661417322834646},{"duration":0.13416666666666632,"name":"D4","time":6.93,"velocity":0.8661417322834646},{"duration":0.13333333333333375,"name":"C4","time":7.066666666666666,"velocity":0.8661417322834646},{"duration":0.2999999999999998,"name":"D4","time":7.2,"velocity":0.8661417322834646},{"duration":0.09999999999999964,"name":"A#4","time":7.5,"velocity":1},{"duration":0.09166666666666679,"name":"A#4","time":7.6,"velocity":1},{"duration":0.09166666666666679,"name":"C5","time":7.7,"velocity":1},{"duration":0.09166666666666679,"name":"D5","time":7.800000000000001,"velocity":1},{"duration":0.09166666666666679,"name":"D#5","time":7.900000000000001,"velocity":1},{"duration":0.2916666666666661,"name":"F5","time":8.000000000000002,"velocity":1},{"duration":0.09166666666666679,"name":"A#4","time":8.3,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"A#4","time":8.4,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"C5","time":8.5,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"D5","time":8.6,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"D#5","time":8.7,"velocity":0.8661417322834646},{"duration":0.1999999999999993,"name":"F5","time":8.799999999999999,"velocity":0.8661417322834646},{"duration":0.1999999999999993,"name":"F5","time":8.999999999999998,"velocity":1},{"duration":0.12916666666666643,"name":"F5","time":9.199999999999998,"velocity":1},{"duration":0.1349999999999998,"name":"F#5","time":9.329166666666664,"velocity":1},{"duration":0.13333333333333286,"name":"G#5","time":9.466666666666663,"velocity":1},{"duration":0.2916666666666661,"name":"A#5","time":9.599999999999996,"velocity":1},{"duration":0.09166666666666679,"name":"F#4","time":9.899999999999995,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"F#4","time":9.999999999999995,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"G#4","time":10.099999999999994,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"A#4","time":10.199999999999994,"velocity":0.8661417322834646},{"duration":0.09166666666666679,"name":"C5","time":10.299999999999994,"velocity":0.8661417322834646},{"duration":0.19166666666666643,"name":"C#5","time":10.399999999999993,"velocity":0.8661417322834646},{"duration":0.13083333333333336,"name":"A#5","time":10.52916666666666,"velocity":1},{"duration":0.125,"name":"A#5","time":10.666666666666659,"velocity":1},{"duration":0.125,"name":"A#5","time":10.799999999999992,"velocity":1},{"duration":0.13083333333333336,"name":"G#5","time":10.929166666666658,"velocity":1},{"duration":0.125,"name":"F#5","time":11.066666666666658,"velocity":1},{"duration":0.12916666666666643,"name":"G#5","time":11.19999999999999,"velocity":1},{"duration":0.125,"name":"F#5","time":11.466666666666656,"velocity":1},{"duration":0.13000000000000078,"name":"G#4","time":11.599999999999989,"velocity":0.8661417322834646},{"duration":0.1341666666666672,"name":"G#4","time":11.72999999999999,"velocity":0.8661417322834646},{"duration":0.13333333333333286,"name":"F#4","time":11.866666666666656,"velocity":0.8661417322834646},{"duration":0.2666666666666675,"name":"G#4","time":11.99999999999999,"velocity":0.8661417322834646},{"duration":0.13333333333333286,"name":"G#4","time":12.266666666666657,"velocity":0.8661417322834646},{"duration":0.13000000000000078,"name":"G#4","time":12.39999999999999,"velocity":0.8661417322834646},{"duration":0.1341666666666672,"name":"F#4","time":12.52999999999999,"velocity":0.8661417322834646},{"duration":0.13333333333333286,"name":"G#4","time":12.666666666666657,"velocity":0.8661417322834646},{"duration":0.19166666666666643,"name":"D#5","time":12.79999999999999,"velocity":1},{"duration":0.09166666666666679,"name":"D#5","time":12.99999999999999,"velocity":1},{"duration":0.09166666666666679,"name":"F5","time":13.099999999999989,"velocity":1},{"duration":0.7999999999999989,"name":"F#5","time":13.199999999999989,"velocity":1},{"duration":0.09999999999999964,"name":"F#4","time":13.399999999999988,"velocity":0.8661417322834646},{"duration":0.09999999999999964,"name":"G#4","time":13.499999999999988,"velocity":0.8661417322834646},{"duration":0.40000000000000036,"name":"A#4","time":13.599999999999987,"velocity":0.8661417322834646},{"duration":0.1999999999999993,"name":"F5","time":13.999999999999988,"velocity":1},{"duration":0.1999999999999993,"name":"D#5","time":14.199999999999987,"velocity":1},{"duration":0.19166666666666643,"name":"C#5","time":14.399999999999986,"velocity":1},{"duration":0.09166666666666679,"name":"C#5","time":14.599999999999985,"velocity":1},{"duration":0.09166666666666679,"name":"D#5","time":14.699999999999985,"velocity":1},{"duration":0.7999999999999989,"name":"F5","time":14.799999999999985,"velocity":1},{"duration":0.09999999999999964,"name":"F4","time":14.999999999999984,"velocity":0.8661417322834646},{"duration":0.09999999999999964,"name":"F#4","time":15.099999999999984,"velocity":0.8661417322834646},{"duration":0.40000000000000036,"name":"G#4","time":15.199999999999983,"velocity":0.8661417322834646},{"duration":0.19166666666666643,"name":"D#5","time":15.599999999999984,"velocity":1},{"duration":0.19166666666666643,"name":"C#5","time":15.799999999999983,"velocity":1},{"duration":0.10000000000000142,"name":"C5","time":15.999999999999982,"velocity":1},{"duration":0.09166666666666501,"name":"C5","time":16.199999999999985,"velocity":1},{"duration":0.09166666666666501,"name":"D5","time":16.299999999999983,"velocity":1},{"duration":0.8000000000000043,"name":"E5","time":16.39999999999998,"velocity":1},{"duration":0.10000000000000142,"name":"E4","time":16.59999999999998,"velocity":0.8661417322834646},{"duration":0.10000000000000142,"name":"F4","time":16.69999999999998,"velocity":0.8661417322834646},{"duration":0.1999999999999993,"name":"G4","time":16.799999999999983,"velocity":0.8661417322834646},{"duration":0.10000000000000142,"name":"G4","time":16.999999999999982,"velocity":0.8661417322834646},{"duration":0.10000000000000142,"name":"A4","time":17.099999999999984,"velocity":0.8661417322834646},{"duration":0.3999999999999986,"name":"G5","time":17.199999999999985,"velocity":1},{"duration":0.1999999999999993,"name":"C5","time":17.399999999999984,"velocity":0.8661417322834646},{"duration":0.12916666666666643,"name":"F5","time":17.599999999999984,"velocity":1},{"duration":0.0625,"name":"F4","time":17.799999999999983,"velocity":1},{"duration":0.0625,"name":"F4","time":17.899999999999984,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":17.999999999999986,"velocity":1},{"duration":0.0625,"name":"F4","time":18.199999999999985,"velocity":1},{"duration":0.0625,"name":"F4","time":18.299999999999986,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":18.399999999999988,"velocity":1},{"duration":0.0625,"name":"F4","time":18.599999999999987,"velocity":1},{"duration":0.0625,"name":"F4","time":18.69999999999999,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":18.79999999999999,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":18.99999999999999,"velocity":1},{"duration":0.2624999999999993,"name":"A#4","time":19.19999999999999,"velocity":1},{"duration":0.129999999999999,"name":"D4","time":19.599999999999987,"velocity":0.7480314960629921},{"duration":0.13416666666666544,"name":"D4","time":19.729999999999986,"velocity":0.7480314960629921},{"duration":0.13333333333333286,"name":"C4","time":19.866666666666653,"velocity":0.7480314960629921},{"duration":0.3000000000000007,"name":"D4","time":19.999999999999986,"velocity":0.7480314960629921},{"duration":0.09166666666666501,"name":"A#4","time":20.299999999999986,"velocity":1},{"duration":0.09166666666666501,"name":"A#4","time":20.399999999999984,"velocity":1},{"duration":0.09166666666666501,"name":"C5","time":20.499999999999982,"velocity":1},{"duration":0.09166666666666501,"name":"D5","time":20.59999999999998,"velocity":1},{"duration":0.09166666666666501,"name":"D#5","time":20.699999999999978,"velocity":1},{"duration":0.29166666666666785,"name":"F5","time":20.799999999999976,"velocity":1},{"duration":0.09166666666666501,"name":"A#4","time":21.099999999999977,"velocity":0.8661417322834646},{"duration":0.09166666666666501,"name":"A#4","time":21.199999999999974,"velocity":0.8661417322834646},{"duration":0.09166666666666501,"name":"C5","time":21.299999999999972,"velocity":0.8661417322834646},{"duration":0.09166666666666501,"name":"D5","time":21.39999999999997,"velocity":0.8661417322834646},{"duration":0.09166666666666501,"name":"D#5","time":21.499999999999968,"velocity":0.8661417322834646},{"duration":0.19166666666666643,"name":"F5","time":21.599999999999966,"velocity":0.8661417322834646},{"duration":0.1999999999999993,"name":"F5","time":21.799999999999965,"velocity":1},{"duration":0.125,"name":"F5","time":21.999999999999964,"velocity":1},{"duration":0.13083333333333158,"name":"F#5","time":22.12916666666663,"velocity":1},{"duration":0.125,"name":"G#5","time":22.26666666666663,"velocity":1},{"duration":1.1916666666666664,"name":"A#5","time":22.399999999999963,"velocity":1},{"duration":0.3916666666666657,"name":"C#6","time":23.599999999999962,"velocity":1},{"duration":0.3999999999999986,"name":"C6","time":23.99999999999996,"velocity":1},{"duration":0.6625000000000014,"name":"A5","time":24.39999999999996,"velocity":1},{"duration":0.3916666666666657,"name":"F5","time":25.19999999999996,"velocity":1},{"duration":1.1999999999999993,"name":"F#5","time":25.59999999999996,"velocity":1},{"duration":0.3916666666666657,"name":"A#5","time":26.799999999999958,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":27.199999999999957,"velocity":1},{"duration":0.8000000000000007,"name":"F5","time":27.599999999999955,"velocity":1},{"duration":0.3916666666666657,"name":"F5","time":28.399999999999956,"velocity":1},{"duration":1.1999999999999993,"name":"F#5","time":28.799999999999955,"velocity":1},{"duration":0.3916666666666657,"name":"A#5","time":29.999999999999954,"velocity":1},{"duration":0.12916666666666643,"name":"F4","time":30.399999999999952,"velocity":1},{"duration":0.7916666666666679,"name":"F5","time":30.79999999999995,"velocity":1},{"duration":0.3999999999999986,"name":"D5","time":31.59999999999995,"velocity":1},{"duration":1.2000000000000028,"name":"D#5","time":31.99999999999995,"velocity":1},{"duration":0.3916666666666657,"name":"F#5","time":33.19999999999995,"velocity":1},{"duration":0.3999999999999986,"name":"F5","time":33.59999999999995,"velocity":1},{"duration":0.7916666666666643,"name":"C#5","time":33.99999999999995,"velocity":1},{"duration":0.3916666666666657,"name":"A#4","time":34.79999999999995,"velocity":1},{"duration":0.19166666666666998,"name":"C5","time":35.199999999999946,"velocity":1},{"duration":0.09166666666666856,"name":"C5","time":35.39999999999995,"velocity":1},{"duration":0.09166666666666856,"name":"D5","time":35.49999999999995,"velocity":1},{"duration":0.8000000000000114,"name":"E5","time":35.59999999999995,"velocity":1},{"duration":0.10000000000000142,"name":"E4","time":35.799999999999955,"velocity":0.8661417322834646},{"duration":0.10000000000000142,"name":"F4","time":35.899999999999956,"velocity":0.8661417322834646},{"duration":0.20000000000000284,"name":"G4","time":35.99999999999996,"velocity":0.8661417322834646},{"duration":0.10000000000000142,"name":"G4","time":36.19999999999996,"velocity":0.8661417322834646},{"duration":0.10000000000000142,"name":"A4","time":36.29999999999996,"velocity":0.8661417322834646},{"duration":0.20000000000000284,"name":"A#4","time":36.39999999999996,"velocity":0.8661417322834646},{"duration":0.20000000000000284,"name":"C5","time":36.599999999999966,"velocity":0.8661417322834646},{"duration":0.12916666666666998,"name":"F5","time":36.79999999999997,"velocity":1},{"duration":0.0625,"name":"F4","time":36.99999999999997,"velocity":1},{"duration":0.0625,"name":"F4","time":37.09999999999997,"velocity":1},{"duration":0.12916666666666998,"name":"F4","time":37.199999999999974,"velocity":1},{"duration":0.0625,"name":"F4","time":37.39999999999998,"velocity":1},{"duration":0.0625,"name":"F4","time":37.49999999999998,"velocity":1},{"duration":0.12916666666666998,"name":"F4","time":37.59999999999998,"velocity":1},{"duration":0.0625,"name":"F4","time":37.79999999999998,"velocity":1},{"duration":0.0625,"name":"F4","time":37.899999999999984,"velocity":1},{"duration":0.12916666666666998,"name":"F4","time":37.999999999999986,"velocity":1},{"duration":0.12916666666666998,"name":"F4","time":38.19999999999999,"velocity":1},{"duration":1.6000000000000014,"name":"A#4","time":38.39999999999999,"velocity":1}];

const recordingFirstNotes = [
    {
        "duration": 0.325,
        "durationTicks": 624,
        "midi": 45,
        "name": "A2",
        "ticks": 0,
        "time": 0,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.2875,
        "durationTicks": 552,
        "midi": 55,
        "name": "G3",
        "ticks": 480,
        "time": 0.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.275,
        "durationTicks": 528,
        "midi": 60,
        "name": "C4",
        "ticks": 480,
        "time": 0.25,
        "velocity": 0.5511811023622047
    },
    // {
    //     "duration": 0.2791666666666667,
    //     "durationTicks": 536,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 960,
    //     "time": 0.5,
    //     "velocity": 0.5826771653543307
    // },
    {
        "duration": 0.22499999999999998,
        "durationTicks": 432,
        "midi": 55,
        "name": "G3",
        "ticks": 1440,
        "time": 0.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 1440,
        "time": 0.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32499999999999996,
        "durationTicks": 624,
        "midi": 40,
        "name": "E2",
        "ticks": 1920,
        "time": 1,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 52,
        "name": "E3",
        "ticks": 2400,
        "time": 1.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 2400,
        "time": 1.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3208333333333333,
        "durationTicks": 616,
        "midi": 43,
        "name": "G2",
        "ticks": 2880,
        "time": 1.5,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.2541666666666669,
        "durationTicks": 488,
        "midi": 59,
        "name": "B3",
        "ticks": 3360,
        "time": 1.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2541666666666669,
        "durationTicks": 488,
        "midi": 55,
        "name": "G3",
        "ticks": 3360,
        "time": 1.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 1.7916666666666665,
        "durationTicks": 3440,
        "midi": 45,
        "name": "A2",
        "ticks": 3840,
        "time": 2,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.3666666666666667,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 4320,
        "time": 2.25,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3666666666666667,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 4320,
        "time": 2.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 55,
        "name": "G3",
        "ticks": 5280,
        "time": 2.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 60,
        "name": "C4",
        "ticks": 5280,
        "time": 2.75,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3958333333333335,
        "durationTicks": 760,
        "midi": 60,
        "name": "C4",
        "ticks": 6240,
        "time": 3.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.4041666666666668,
        "durationTicks": 776,
        "midi": 55,
        "name": "G3",
        "ticks": 6240,
        "time": 3.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 7200,
        "time": 3.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2416666666666667,
        "durationTicks": 464,
        "midi": 60,
        "name": "C4",
        "ticks": 7200,
        "time": 3.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.770833333333333,
        "durationTicks": 1480,
        "midi": 45,
        "name": "A2",
        "ticks": 7680,
        "time": 4,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666625,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 8160,
        "time": 4.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.37083333333333357,
        "durationTicks": 712,
        "midi": 60,
        "name": "C4",
        "ticks": 8160,
        "time": 4.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2041666666666666,
        "durationTicks": 392,
        "midi": 55,
        "name": "G3",
        "ticks": 9120,
        "time": 4.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.17499999999999982,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 9120,
        "time": 4.75,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.30416666666666625,
        "durationTicks": 584,
        "midi": 40,
        "name": "E2",
        "ticks": 9600,
        "time": 5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333375,
        "durationTicks": 376,
        "midi": 52,
        "name": "E3",
        "ticks": 10080,
        "time": 5.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.20833333333333304,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 10080,
        "time": 5.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2625000000000002,
        "durationTicks": 504,
        "midi": 43,
        "name": "G2",
        "ticks": 10560,
        "time": 5.5,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.19583333333333375,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 11040,
        "time": 5.75,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.20000000000000018,
        "durationTicks": 384,
        "midi": 59,
        "name": "B3",
        "ticks": 11040,
        "time": 5.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.9458333333333337,
        "durationTicks": 1816,
        "midi": 45,
        "name": "A2",
        "ticks": 11520,
        "time": 6,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.3250000000000002,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 12000,
        "time": 6.25,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.33333333333333304,
        "durationTicks": 640,
        "midi": 55,
        "name": "G3",
        "ticks": 12000,
        "time": 6.25,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.33333333333333304,
        "durationTicks": 640,
        "midi": 60,
        "name": "C4",
        "ticks": 12960,
        "time": 6.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3458333333333332,
        "durationTicks": 664,
        "midi": 55,
        "name": "G3",
        "ticks": 12960,
        "time": 6.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.9375,
        "durationTicks": 1800,
        "midi": 45,
        "name": "A2",
        "ticks": 13440,
        "time": 7,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.38333333333333375,
        "durationTicks": 736,
        "midi": 60,
        "name": "C4",
        "ticks": 13920,
        "time": 7.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333375,
        "durationTicks": 736,
        "midi": 55,
        "name": "G3",
        "ticks": 13920,
        "time": 7.25,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.15416666666666679,
        "durationTicks": 296,
        "midi": 55,
        "name": "G3",
        "ticks": 14880,
        "time": 7.75,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.15416666666666679,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 14880,
        "time": 7.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.2791666666666668,
        "durationTicks": 536,
        "midi": 52,
        "name": "E3",
        "ticks": 15360,
        "time": 8,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 67,
        "name": "G4",
        "ticks": 15840,
        "time": 8.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.30833333333333357,
        "durationTicks": 592,
        "midi": 59,
        "name": "B3",
        "ticks": 15840,
        "time": 8.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.31666666666666643,
        "durationTicks": 608,
        "midi": 64,
        "name": "E4",
        "ticks": 15840,
        "time": 8.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 16800,
        "time": 8.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.37083333333333357,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 16800,
        "time": 8.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.40000000000000036,
        "durationTicks": 768,
        "midi": 64,
        "name": "E4",
        "ticks": 16800,
        "time": 8.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.37083333333333357,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 17760,
        "time": 9.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.3874999999999993,
        "durationTicks": 744,
        "midi": 64,
        "name": "E4",
        "ticks": 17760,
        "time": 9.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 17760,
        "time": 9.25,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.19583333333333286,
        "durationTicks": 376,
        "midi": 59,
        "name": "B3",
        "ticks": 18720,
        "time": 9.75,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.1750000000000007,
        "durationTicks": 336,
        "midi": 64,
        "name": "E4",
        "ticks": 18720,
        "time": 9.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.1750000000000007,
        "durationTicks": 336,
        "midi": 67,
        "name": "G4",
        "ticks": 18720,
        "time": 9.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 1.7750000000000004,
        "durationTicks": 3408,
        "midi": 50,
        "name": "D3",
        "ticks": 19200,
        "time": 10,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.37916666666666643,
        "durationTicks": 728,
        "midi": 62,
        "name": "D4",
        "ticks": 19680,
        "time": 10.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 57,
        "name": "A3",
        "ticks": 19680,
        "time": 10.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 65,
        "name": "F4",
        "ticks": 19680,
        "time": 10.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3916666666666675,
        "durationTicks": 752,
        "midi": 62,
        "name": "D4",
        "ticks": 20640,
        "time": 10.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.37916666666666643,
        "durationTicks": 728,
        "midi": 65,
        "name": "F4",
        "ticks": 20640,
        "time": 10.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3916666666666675,
        "durationTicks": 752,
        "midi": 57,
        "name": "A3",
        "ticks": 20640,
        "time": 10.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3583333333333325,
        "durationTicks": 688,
        "midi": 65,
        "name": "F4",
        "ticks": 21600,
        "time": 11.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3583333333333325,
        "durationTicks": 688,
        "midi": 57,
        "name": "A3",
        "ticks": 21600,
        "time": 11.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 62,
        "name": "D4",
        "ticks": 21600,
        "time": 11.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.20833333333333393,
        "durationTicks": 400,
        "midi": 62,
        "name": "D4",
        "ticks": 22560,
        "time": 11.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2375000000000007,
        "durationTicks": 456,
        "midi": 57,
        "name": "A3",
        "ticks": 22560,
        "time": 11.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.1999999999999993,
        "durationTicks": 384,
        "midi": 65,
        "name": "F4",
        "ticks": 22560,
        "time": 11.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.7958333333333325,
        "durationTicks": 1528,
        "midi": 45,
        "name": "A2",
        "ticks": 23040,
        "time": 12,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3916666666666675,
        "durationTicks": 752,
        "midi": 64,
        "name": "E4",
        "ticks": 23520,
        "time": 12.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.40000000000000036,
        "durationTicks": 768,
        "midi": 57,
        "name": "A3",
        "ticks": 23520,
        "time": 12.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.40000000000000036,
        "durationTicks": 768,
        "midi": 60,
        "name": "C4",
        "ticks": 23520,
        "time": 12.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.14583333333333393,
        "durationTicks": 280,
        "midi": 64,
        "name": "E4",
        "ticks": 24480,
        "time": 12.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.15416666666666679,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 24480,
        "time": 12.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1708333333333325,
        "durationTicks": 328,
        "midi": 57,
        "name": "A3",
        "ticks": 24480,
        "time": 12.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3000000000000007,
        "durationTicks": 576,
        "midi": 40,
        "name": "E2",
        "ticks": 24960,
        "time": 13,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20833333333333393,
        "durationTicks": 400,
        "midi": 52,
        "name": "E3",
        "ticks": 25440,
        "time": 13.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.20833333333333393,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 25440,
        "time": 13.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.22499999999999964,
        "durationTicks": 432,
        "midi": 59,
        "name": "B3",
        "ticks": 25440,
        "time": 13.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.30416666666666714,
        "durationTicks": 584,
        "midi": 43,
        "name": "G2",
        "ticks": 25920,
        "time": 13.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.22083333333333321,
        "durationTicks": 424,
        "midi": 55,
        "name": "G3",
        "ticks": 26400,
        "time": 13.75,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.22499999999999964,
        "durationTicks": 432,
        "midi": 62,
        "name": "D4",
        "ticks": 26400,
        "time": 13.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22083333333333321,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 26400,
        "time": 13.75,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 1.9291666666666671,
        "durationTicks": 3704,
        "midi": 45,
        "name": "A2",
        "ticks": 26880,
        "time": 14,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 57,
        "name": "A3",
        "ticks": 27360,
        "time": 14.25,
        "velocity": 0.4094488188976378
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 27360,
        "time": 14.25,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.33750000000000036,
        "durationTicks": 648,
        "midi": 64,
        "name": "E4",
        "ticks": 27360,
        "time": 14.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2624999999999993,
        "durationTicks": 504,
        "midi": 64,
        "name": "E4",
        "ticks": 28320,
        "time": 14.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2624999999999993,
        "durationTicks": 504,
        "midi": 57,
        "name": "A3",
        "ticks": 28320,
        "time": 14.75,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.25416666666666643,
        "durationTicks": 488,
        "midi": 60,
        "name": "C4",
        "ticks": 28320,
        "time": 14.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.31666666666666643,
        "durationTicks": 608,
        "midi": 60,
        "name": "C4",
        "ticks": 29280,
        "time": 15.25,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 57,
        "name": "A3",
        "ticks": 29280,
        "time": 15.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 29280,
        "time": 15.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.1416666666666675,
        "durationTicks": 272,
        "midi": 64,
        "name": "E4",
        "ticks": 30240,
        "time": 15.75,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.12916666666666643,
        "durationTicks": 248,
        "midi": 57,
        "name": "A3",
        "ticks": 30240,
        "time": 15.75,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.13333333333333286,
        "durationTicks": 256,
        "midi": 60,
        "name": "C4",
        "ticks": 30240,
        "time": 15.75,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 45,
        "name": "A2",
        "ticks": 30720,
        "time": 16,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.2875000000000014,
        "durationTicks": 552,
        "midi": 55,
        "name": "G3",
        "ticks": 31200,
        "time": 16.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.2749999999999986,
        "durationTicks": 528,
        "midi": 60,
        "name": "C4",
        "ticks": 31200,
        "time": 16.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.279166666666665,
        "durationTicks": 536,
        "midi": 45,
        "name": "A2",
        "ticks": 31680,
        "time": 16.5,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 55,
        "name": "G3",
        "ticks": 32160,
        "time": 16.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 32160,
        "time": 16.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 40,
        "name": "E2",
        "ticks": 32640,
        "time": 17,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 52,
        "name": "E3",
        "ticks": 33120,
        "time": 17.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 33120,
        "time": 17.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 43,
        "name": "G2",
        "ticks": 33600,
        "time": 17.5,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25416666666666643,
        "durationTicks": 488,
        "midi": 59,
        "name": "B3",
        "ticks": 34080,
        "time": 17.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.25416666666666643,
        "durationTicks": 488,
        "midi": 55,
        "name": "G3",
        "ticks": 34080,
        "time": 17.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 1.7916666666666679,
        "durationTicks": 3440,
        "midi": 45,
        "name": "A2",
        "ticks": 34560,
        "time": 18,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 35040,
        "time": 18.25,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 35040,
        "time": 18.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 55,
        "name": "G3",
        "ticks": 36000,
        "time": 18.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 60,
        "name": "C4",
        "ticks": 36000,
        "time": 18.75,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.39583333333333215,
        "durationTicks": 760,
        "midi": 60,
        "name": "C4",
        "ticks": 36960,
        "time": 19.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.404166666666665,
        "durationTicks": 776,
        "midi": 55,
        "name": "G3",
        "ticks": 36960,
        "time": 19.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 37920,
        "time": 19.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.24166666666666714,
        "durationTicks": 464,
        "midi": 60,
        "name": "C4",
        "ticks": 37920,
        "time": 19.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.7708333333333321,
        "durationTicks": 1480,
        "midi": 45,
        "name": "A2",
        "ticks": 38400,
        "time": 20,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 38880,
        "time": 20.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.37083333333333357,
        "durationTicks": 712,
        "midi": 60,
        "name": "C4",
        "ticks": 38880,
        "time": 20.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666666572,
        "durationTicks": 392,
        "midi": 55,
        "name": "G3",
        "ticks": 39840,
        "time": 20.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1750000000000007,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 39840,
        "time": 20.75,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.30416666666666714,
        "durationTicks": 584,
        "midi": 40,
        "name": "E2",
        "ticks": 40320,
        "time": 21,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333286,
        "durationTicks": 376,
        "midi": 52,
        "name": "E3",
        "ticks": 40800,
        "time": 21.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.20833333333333215,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 40800,
        "time": 21.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2624999999999993,
        "durationTicks": 504,
        "midi": 43,
        "name": "G2",
        "ticks": 41280,
        "time": 21.5,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.19583333333333286,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 41760,
        "time": 21.75,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.1999999999999993,
        "durationTicks": 384,
        "midi": 59,
        "name": "B3",
        "ticks": 41760,
        "time": 21.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.9458333333333329,
        "durationTicks": 1816,
        "midi": 45,
        "name": "A2",
        "ticks": 42240,
        "time": 22,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 42720,
        "time": 22.25,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.33333333333333215,
        "durationTicks": 640,
        "midi": 55,
        "name": "G3",
        "ticks": 42720,
        "time": 22.25,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.33333333333333215,
        "durationTicks": 640,
        "midi": 60,
        "name": "C4",
        "ticks": 43680,
        "time": 22.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.345833333333335,
        "durationTicks": 664,
        "midi": 55,
        "name": "G3",
        "ticks": 43680,
        "time": 22.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.9375,
        "durationTicks": 1800,
        "midi": 45,
        "name": "A2",
        "ticks": 44160,
        "time": 23,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 60,
        "name": "C4",
        "ticks": 44640,
        "time": 23.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 55,
        "name": "G3",
        "ticks": 44640,
        "time": 23.25,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.154166666666665,
        "durationTicks": 296,
        "midi": 55,
        "name": "G3",
        "ticks": 45600,
        "time": 23.75,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.154166666666665,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 45600,
        "time": 23.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.279166666666665,
        "durationTicks": 536,
        "midi": 52,
        "name": "E3",
        "ticks": 46080,
        "time": 24,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 67,
        "name": "G4",
        "ticks": 46560,
        "time": 24.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.30833333333333357,
        "durationTicks": 592,
        "midi": 59,
        "name": "B3",
        "ticks": 46560,
        "time": 24.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.31666666666666643,
        "durationTicks": 608,
        "midi": 64,
        "name": "E4",
        "ticks": 46560,
        "time": 24.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 47520,
        "time": 24.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.37083333333333357,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 47520,
        "time": 24.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3999999999999986,
        "durationTicks": 768,
        "midi": 64,
        "name": "E4",
        "ticks": 47520,
        "time": 24.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.37083333333333357,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 48480,
        "time": 25.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.3874999999999993,
        "durationTicks": 744,
        "midi": 64,
        "name": "E4",
        "ticks": 48480,
        "time": 25.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 48480,
        "time": 25.25,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.19583333333333286,
        "durationTicks": 376,
        "midi": 59,
        "name": "B3",
        "ticks": 49440,
        "time": 25.75,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.1750000000000007,
        "durationTicks": 336,
        "midi": 64,
        "name": "E4",
        "ticks": 49440,
        "time": 25.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.1750000000000007,
        "durationTicks": 336,
        "midi": 67,
        "name": "G4",
        "ticks": 49440,
        "time": 25.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 1.7749999999999986,
        "durationTicks": 3408,
        "midi": 50,
        "name": "D3",
        "ticks": 49920,
        "time": 26,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.37916666666666643,
        "durationTicks": 728,
        "midi": 62,
        "name": "D4",
        "ticks": 50400,
        "time": 26.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 57,
        "name": "A3",
        "ticks": 50400,
        "time": 26.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 65,
        "name": "F4",
        "ticks": 50400,
        "time": 26.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 62,
        "name": "D4",
        "ticks": 51360,
        "time": 26.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.37916666666666643,
        "durationTicks": 728,
        "midi": 65,
        "name": "F4",
        "ticks": 51360,
        "time": 26.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 57,
        "name": "A3",
        "ticks": 51360,
        "time": 26.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 65,
        "name": "F4",
        "ticks": 52320,
        "time": 27.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 57,
        "name": "A3",
        "ticks": 52320,
        "time": 27.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 62,
        "name": "D4",
        "ticks": 52320,
        "time": 27.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.20833333333333215,
        "durationTicks": 400,
        "midi": 62,
        "name": "D4",
        "ticks": 53280,
        "time": 27.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2375000000000007,
        "durationTicks": 456,
        "midi": 57,
        "name": "A3",
        "ticks": 53280,
        "time": 27.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.1999999999999993,
        "durationTicks": 384,
        "midi": 65,
        "name": "F4",
        "ticks": 53280,
        "time": 27.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.7958333333333343,
        "durationTicks": 1528,
        "midi": 45,
        "name": "A2",
        "ticks": 53760,
        "time": 28,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 64,
        "name": "E4",
        "ticks": 54240,
        "time": 28.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3999999999999986,
        "durationTicks": 768,
        "midi": 57,
        "name": "A3",
        "ticks": 54240,
        "time": 28.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.3999999999999986,
        "durationTicks": 768,
        "midi": 60,
        "name": "C4",
        "ticks": 54240,
        "time": 28.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.14583333333333215,
        "durationTicks": 280,
        "midi": 64,
        "name": "E4",
        "ticks": 55200,
        "time": 28.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.154166666666665,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 55200,
        "time": 28.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17083333333333428,
        "durationTicks": 328,
        "midi": 57,
        "name": "A3",
        "ticks": 55200,
        "time": 28.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3000000000000007,
        "durationTicks": 576,
        "midi": 40,
        "name": "E2",
        "ticks": 55680,
        "time": 29,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20833333333333215,
        "durationTicks": 400,
        "midi": 52,
        "name": "E3",
        "ticks": 56160,
        "time": 29.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.20833333333333215,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 56160,
        "time": 29.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 59,
        "name": "B3",
        "ticks": 56160,
        "time": 29.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.30416666666666714,
        "durationTicks": 584,
        "midi": 43,
        "name": "G2",
        "ticks": 56640,
        "time": 29.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.220833333333335,
        "durationTicks": 424,
        "midi": 55,
        "name": "G3",
        "ticks": 57120,
        "time": 29.75,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 62,
        "name": "D4",
        "ticks": 57120,
        "time": 29.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.220833333333335,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 57120,
        "time": 29.75,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 1.9291666666666671,
        "durationTicks": 3704,
        "midi": 45,
        "name": "A2",
        "ticks": 57600,
        "time": 30,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 57,
        "name": "A3",
        "ticks": 58080,
        "time": 30.25,
        "velocity": 0.4094488188976378
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 58080,
        "time": 30.25,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.3374999999999986,
        "durationTicks": 648,
        "midi": 64,
        "name": "E4",
        "ticks": 58080,
        "time": 30.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2624999999999993,
        "durationTicks": 504,
        "midi": 64,
        "name": "E4",
        "ticks": 59040,
        "time": 30.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2624999999999993,
        "durationTicks": 504,
        "midi": 57,
        "name": "A3",
        "ticks": 59040,
        "time": 30.75,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.25416666666666643,
        "durationTicks": 488,
        "midi": 60,
        "name": "C4",
        "ticks": 59040,
        "time": 30.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.31666666666666643,
        "durationTicks": 608,
        "midi": 60,
        "name": "C4",
        "ticks": 60000,
        "time": 31.25,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 57,
        "name": "A3",
        "ticks": 60000,
        "time": 31.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.3249999999999993,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 60000,
        "time": 31.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14166666666666572,
        "durationTicks": 272,
        "midi": 64,
        "name": "E4",
        "ticks": 60960,
        "time": 31.75,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.12916666666666643,
        "durationTicks": 248,
        "midi": 57,
        "name": "A3",
        "ticks": 60960,
        "time": 31.75,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.13333333333333286,
        "durationTicks": 256,
        "midi": 60,
        "name": "C4",
        "ticks": 60960,
        "time": 31.75,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.5916666666666686,
        "durationTicks": 1136,
        "midi": 52,
        "name": "E3",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 45,
        "name": "A2",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5958333333333314,
        "durationTicks": 1144,
        "midi": 64,
        "name": "E4",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.6375000000000028,
        "durationTicks": 1224,
        "midi": 57,
        "name": "A3",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 60,
        "name": "C4",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 52,
        "name": "E3",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.17083333333333428,
        "durationTicks": 328,
        "midi": 40,
        "name": "E2",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.19583333333333286,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.21249999999999858,
        "durationTicks": 408,
        "midi": 59,
        "name": "B3",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 50,
        "name": "D3",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.19166666666666998,
        "durationTicks": 368,
        "midi": 59,
        "name": "B3",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.19166666666666998,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 43,
        "name": "G2",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 1.4666666666666686,
        "durationTicks": 2816,
        "midi": 52,
        "name": "E3",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 60,
        "name": "C4",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 1.49583333333333,
        "durationTicks": 2872,
        "midi": 57,
        "name": "A3",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 1.4791666666666643,
        "durationTicks": 2840,
        "midi": 45,
        "name": "A2",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 45,
        "name": "A2",
        "ticks": 92160,
        "time": 48,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.2875000000000014,
        "durationTicks": 552,
        "midi": 55,
        "name": "G3",
        "ticks": 92640,
        "time": 48.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.2749999999999986,
        "durationTicks": 528,
        "midi": 60,
        "name": "C4",
        "ticks": 92640,
        "time": 48.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 45,
        "name": "A2",
        "ticks": 93120,
        "time": 48.5,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 55,
        "name": "G3",
        "ticks": 93600,
        "time": 48.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 93600,
        "time": 48.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 40,
        "name": "E2",
        "ticks": 94080,
        "time": 49,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 52,
        "name": "E3",
        "ticks": 94560,
        "time": 49.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 94560,
        "time": 49.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 43,
        "name": "G2",
        "ticks": 95040,
        "time": 49.5,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25416666666667,
        "durationTicks": 488,
        "midi": 59,
        "name": "B3",
        "ticks": 95520,
        "time": 49.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.25416666666667,
        "durationTicks": 488,
        "midi": 55,
        "name": "G3",
        "ticks": 95520,
        "time": 49.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.9458333333333329,
        "durationTicks": 1816,
        "midi": 45,
        "name": "A2",
        "ticks": 96000,
        "time": 50,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 96480,
        "time": 50.25,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.3333333333333357,
        "durationTicks": 640,
        "midi": 55,
        "name": "G3",
        "ticks": 96480,
        "time": 50.25,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.3333333333333357,
        "durationTicks": 640,
        "midi": 60,
        "name": "C4",
        "ticks": 97440,
        "time": 50.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 55,
        "name": "G3",
        "ticks": 97440,
        "time": 50.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.9375,
        "durationTicks": 1800,
        "midi": 45,
        "name": "A2",
        "ticks": 97920,
        "time": 51,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 60,
        "name": "C4",
        "ticks": 98400,
        "time": 51.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 55,
        "name": "G3",
        "ticks": 98400,
        "time": 51.25,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 55,
        "name": "G3",
        "ticks": 99360,
        "time": 51.75,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 99360,
        "time": 51.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 52,
        "name": "E3",
        "ticks": 99840,
        "time": 52,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 67,
        "name": "G4",
        "ticks": 100320,
        "time": 52.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.30833333333333,
        "durationTicks": 592,
        "midi": 59,
        "name": "B3",
        "ticks": 100320,
        "time": 52.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.31666666666667,
        "durationTicks": 608,
        "midi": 64,
        "name": "E4",
        "ticks": 100320,
        "time": 52.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 101280,
        "time": 52.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.37083333333333,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 101280,
        "time": 52.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3999999999999986,
        "durationTicks": 768,
        "midi": 64,
        "name": "E4",
        "ticks": 101280,
        "time": 52.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.37083333333333,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 102240,
        "time": 53.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.38750000000000284,
        "durationTicks": 744,
        "midi": 64,
        "name": "E4",
        "ticks": 102240,
        "time": 53.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333286,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 102240,
        "time": 53.25,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.19583333333333286,
        "durationTicks": 376,
        "midi": 59,
        "name": "B3",
        "ticks": 103200,
        "time": 53.75,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 64,
        "name": "E4",
        "ticks": 103200,
        "time": 53.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 67,
        "name": "G4",
        "ticks": 103200,
        "time": 53.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 1.7749999999999986,
        "durationTicks": 3408,
        "midi": 50,
        "name": "D3",
        "ticks": 103680,
        "time": 54,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.37916666666667,
        "durationTicks": 728,
        "midi": 62,
        "name": "D4",
        "ticks": 104160,
        "time": 54.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 57,
        "name": "A3",
        "ticks": 104160,
        "time": 54.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 65,
        "name": "F4",
        "ticks": 104160,
        "time": 54.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 62,
        "name": "D4",
        "ticks": 105120,
        "time": 54.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.37916666666667,
        "durationTicks": 728,
        "midi": 65,
        "name": "F4",
        "ticks": 105120,
        "time": 54.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 57,
        "name": "A3",
        "ticks": 105120,
        "time": 54.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 65,
        "name": "F4",
        "ticks": 106080,
        "time": 55.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 57,
        "name": "A3",
        "ticks": 106080,
        "time": 55.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 62,
        "name": "D4",
        "ticks": 106080,
        "time": 55.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.2083333333333357,
        "durationTicks": 400,
        "midi": 62,
        "name": "D4",
        "ticks": 107040,
        "time": 55.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 57,
        "name": "A3",
        "ticks": 107040,
        "time": 55.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 65,
        "name": "F4",
        "ticks": 107040,
        "time": 55.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.7958333333333343,
        "durationTicks": 1528,
        "midi": 45,
        "name": "A2",
        "ticks": 107520,
        "time": 56,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 64,
        "name": "E4",
        "ticks": 108000,
        "time": 56.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3999999999999986,
        "durationTicks": 768,
        "midi": 57,
        "name": "A3",
        "ticks": 108000,
        "time": 56.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.3999999999999986,
        "durationTicks": 768,
        "midi": 60,
        "name": "C4",
        "ticks": 108000,
        "time": 56.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.1458333333333357,
        "durationTicks": 280,
        "midi": 64,
        "name": "E4",
        "ticks": 108960,
        "time": 56.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 108960,
        "time": 56.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17083333333333428,
        "durationTicks": 328,
        "midi": 57,
        "name": "A3",
        "ticks": 108960,
        "time": 56.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.29999999999999716,
        "durationTicks": 576,
        "midi": 40,
        "name": "E2",
        "ticks": 109440,
        "time": 57,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2083333333333357,
        "durationTicks": 400,
        "midi": 52,
        "name": "E3",
        "ticks": 109920,
        "time": 57.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2083333333333357,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 109920,
        "time": 57.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 59,
        "name": "B3",
        "ticks": 109920,
        "time": 57.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.30416666666666714,
        "durationTicks": 584,
        "midi": 43,
        "name": "G2",
        "ticks": 110400,
        "time": 57.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 55,
        "name": "G3",
        "ticks": 110880,
        "time": 57.75,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 62,
        "name": "D4",
        "ticks": 110880,
        "time": 57.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 110880,
        "time": 57.75,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 1.4666666666666686,
        "durationTicks": 2816,
        "midi": 52,
        "name": "E3",
        "ticks": 111360,
        "time": 58,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 60,
        "name": "C4",
        "ticks": 111360,
        "time": 58,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 1.49583333333333,
        "durationTicks": 2872,
        "midi": 57,
        "name": "A3",
        "ticks": 111360,
        "time": 58,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 1.4791666666666643,
        "durationTicks": 2840,
        "midi": 45,
        "name": "A2",
        "ticks": 111360,
        "time": 58,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 45,
        "name": "A2",
        "ticks": 115200,
        "time": 60,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.2875000000000014,
        "durationTicks": 552,
        "midi": 55,
        "name": "G3",
        "ticks": 115680,
        "time": 60.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.2749999999999986,
        "durationTicks": 528,
        "midi": 60,
        "name": "C4",
        "ticks": 115680,
        "time": 60.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 45,
        "name": "A2",
        "ticks": 116160,
        "time": 60.5,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.22500000000000142,
        "durationTicks": 432,
        "midi": 55,
        "name": "G3",
        "ticks": 116640,
        "time": 60.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 116640,
        "time": 60.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 40,
        "name": "E2",
        "ticks": 117120,
        "time": 61,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 52,
        "name": "E3",
        "ticks": 117600,
        "time": 61.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 117600,
        "time": 61.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.32083333333333286,
        "durationTicks": 616,
        "midi": 43,
        "name": "G2",
        "ticks": 118080,
        "time": 61.5,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25416666666667,
        "durationTicks": 488,
        "midi": 59,
        "name": "B3",
        "ticks": 118560,
        "time": 61.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.25416666666667,
        "durationTicks": 488,
        "midi": 55,
        "name": "G3",
        "ticks": 118560,
        "time": 61.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 1.7916666666666643,
        "durationTicks": 3440,
        "midi": 45,
        "name": "A2",
        "ticks": 119040,
        "time": 62,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 119520,
        "time": 62.25,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.36666666666666714,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 119520,
        "time": 62.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 55,
        "name": "G3",
        "ticks": 120480,
        "time": 62.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 60,
        "name": "C4",
        "ticks": 120480,
        "time": 62.75,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3958333333333357,
        "durationTicks": 760,
        "midi": 60,
        "name": "C4",
        "ticks": 121440,
        "time": 63.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.40416666666666856,
        "durationTicks": 776,
        "midi": 55,
        "name": "G3",
        "ticks": 121440,
        "time": 63.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 122400,
        "time": 63.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.24166666666666714,
        "durationTicks": 464,
        "midi": 60,
        "name": "C4",
        "ticks": 122400,
        "time": 63.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.7708333333333286,
        "durationTicks": 1480,
        "midi": 45,
        "name": "A2",
        "ticks": 122880,
        "time": 64,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 123360,
        "time": 64.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 60,
        "name": "C4",
        "ticks": 123360,
        "time": 64.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666666572,
        "durationTicks": 392,
        "midi": 55,
        "name": "G3",
        "ticks": 124320,
        "time": 64.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 124320,
        "time": 64.75,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.30416666666666003,
        "durationTicks": 584,
        "midi": 40,
        "name": "E2",
        "ticks": 124800,
        "time": 65,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 52,
        "name": "E3",
        "ticks": 125280,
        "time": 65.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 125280,
        "time": 65.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 43,
        "name": "G2",
        "ticks": 125760,
        "time": 65.5,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 126240,
        "time": 65.75,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 59,
        "name": "B3",
        "ticks": 126240,
        "time": 65.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.94583333333334,
        "durationTicks": 1816,
        "midi": 45,
        "name": "A2",
        "ticks": 126720,
        "time": 66,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 127200,
        "time": 66.25,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.3333333333333286,
        "durationTicks": 640,
        "midi": 55,
        "name": "G3",
        "ticks": 127200,
        "time": 66.25,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.3333333333333286,
        "durationTicks": 640,
        "midi": 60,
        "name": "C4",
        "ticks": 128160,
        "time": 66.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 55,
        "name": "G3",
        "ticks": 128160,
        "time": 66.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.9375,
        "durationTicks": 1800,
        "midi": 45,
        "name": "A2",
        "ticks": 128640,
        "time": 67,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 60,
        "name": "C4",
        "ticks": 129120,
        "time": 67.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 55,
        "name": "G3",
        "ticks": 129120,
        "time": 67.25,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 55,
        "name": "G3",
        "ticks": 130080,
        "time": 67.75,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 130080,
        "time": 67.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 52,
        "name": "E3",
        "ticks": 130560,
        "time": 68,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32083333333333997,
        "durationTicks": 616,
        "midi": 67,
        "name": "G4",
        "ticks": 131040,
        "time": 68.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3083333333333371,
        "durationTicks": 592,
        "midi": 59,
        "name": "B3",
        "ticks": 131040,
        "time": 68.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.3166666666666629,
        "durationTicks": 608,
        "midi": 64,
        "name": "E4",
        "ticks": 131040,
        "time": 68.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 132000,
        "time": 68.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 132000,
        "time": 68.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 64,
        "name": "E4",
        "ticks": 132000,
        "time": 68.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 132960,
        "time": 69.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.38750000000000284,
        "durationTicks": 744,
        "midi": 64,
        "name": "E4",
        "ticks": 132960,
        "time": 69.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 132960,
        "time": 69.25,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 59,
        "name": "B3",
        "ticks": 133920,
        "time": 69.75,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 64,
        "name": "E4",
        "ticks": 133920,
        "time": 69.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 67,
        "name": "G4",
        "ticks": 133920,
        "time": 69.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 1.7750000000000057,
        "durationTicks": 3408,
        "midi": 50,
        "name": "D3",
        "ticks": 134400,
        "time": 70,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.3791666666666629,
        "durationTicks": 728,
        "midi": 62,
        "name": "D4",
        "ticks": 134880,
        "time": 70.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 57,
        "name": "A3",
        "ticks": 134880,
        "time": 70.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 65,
        "name": "F4",
        "ticks": 134880,
        "time": 70.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 62,
        "name": "D4",
        "ticks": 135840,
        "time": 70.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3791666666666629,
        "durationTicks": 728,
        "midi": 65,
        "name": "F4",
        "ticks": 135840,
        "time": 70.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 57,
        "name": "A3",
        "ticks": 135840,
        "time": 70.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 65,
        "name": "F4",
        "ticks": 136800,
        "time": 71.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 57,
        "name": "A3",
        "ticks": 136800,
        "time": 71.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 62,
        "name": "D4",
        "ticks": 136800,
        "time": 71.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 62,
        "name": "D4",
        "ticks": 137760,
        "time": 71.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 57,
        "name": "A3",
        "ticks": 137760,
        "time": 71.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 65,
        "name": "F4",
        "ticks": 137760,
        "time": 71.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.7958333333333343,
        "durationTicks": 1528,
        "midi": 45,
        "name": "A2",
        "ticks": 138240,
        "time": 72,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 64,
        "name": "E4",
        "ticks": 138720,
        "time": 72.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 57,
        "name": "A3",
        "ticks": 138720,
        "time": 72.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 60,
        "name": "C4",
        "ticks": 138720,
        "time": 72.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.1458333333333286,
        "durationTicks": 280,
        "midi": 64,
        "name": "E4",
        "ticks": 139680,
        "time": 72.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 139680,
        "time": 72.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17083333333333428,
        "durationTicks": 328,
        "midi": 57,
        "name": "A3",
        "ticks": 139680,
        "time": 72.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.29999999999999716,
        "durationTicks": 576,
        "midi": 40,
        "name": "E2",
        "ticks": 140160,
        "time": 73,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 52,
        "name": "E3",
        "ticks": 140640,
        "time": 73.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 140640,
        "time": 73.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.22499999999999432,
        "durationTicks": 432,
        "midi": 59,
        "name": "B3",
        "ticks": 140640,
        "time": 73.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.30416666666666003,
        "durationTicks": 584,
        "midi": 43,
        "name": "G2",
        "ticks": 141120,
        "time": 73.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 55,
        "name": "G3",
        "ticks": 141600,
        "time": 73.75,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.22499999999999432,
        "durationTicks": 432,
        "midi": 62,
        "name": "D4",
        "ticks": 141600,
        "time": 73.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 141600,
        "time": 73.75,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 1.4666666666666686,
        "durationTicks": 2816,
        "midi": 52,
        "name": "E3",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 60,
        "name": "C4",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 1.4958333333333371,
        "durationTicks": 2872,
        "midi": 57,
        "name": "A3",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 1.4791666666666714,
        "durationTicks": 2840,
        "midi": 45,
        "name": "A2",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 45,
        "name": "A2",
        "ticks": 145920,
        "time": 76,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.2874999999999943,
        "durationTicks": 552,
        "midi": 55,
        "name": "G3",
        "ticks": 146400,
        "time": 76.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.2750000000000057,
        "durationTicks": 528,
        "midi": 60,
        "name": "C4",
        "ticks": 146400,
        "time": 76.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 45,
        "name": "A2",
        "ticks": 146880,
        "time": 76.5,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.22499999999999432,
        "durationTicks": 432,
        "midi": 55,
        "name": "G3",
        "ticks": 147360,
        "time": 76.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 147360,
        "time": 76.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 40,
        "name": "E2",
        "ticks": 147840,
        "time": 77,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 52,
        "name": "E3",
        "ticks": 148320,
        "time": 77.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 148320,
        "time": 77.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.32083333333333997,
        "durationTicks": 616,
        "midi": 43,
        "name": "G2",
        "ticks": 148800,
        "time": 77.5,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.2541666666666629,
        "durationTicks": 488,
        "midi": 59,
        "name": "B3",
        "ticks": 149280,
        "time": 77.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2541666666666629,
        "durationTicks": 488,
        "midi": 55,
        "name": "G3",
        "ticks": 149280,
        "time": 77.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 1.7916666666666714,
        "durationTicks": 3440,
        "midi": 45,
        "name": "A2",
        "ticks": 149760,
        "time": 78,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 150240,
        "time": 78.25,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 150240,
        "time": 78.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 55,
        "name": "G3",
        "ticks": 151200,
        "time": 78.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 60,
        "name": "C4",
        "ticks": 151200,
        "time": 78.75,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3958333333333286,
        "durationTicks": 760,
        "midi": 60,
        "name": "C4",
        "ticks": 152160,
        "time": 79.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.40416666666666856,
        "durationTicks": 776,
        "midi": 55,
        "name": "G3",
        "ticks": 152160,
        "time": 79.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 153120,
        "time": 79.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.24166666666666003,
        "durationTicks": 464,
        "midi": 60,
        "name": "C4",
        "ticks": 153120,
        "time": 79.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.7708333333333286,
        "durationTicks": 1480,
        "midi": 45,
        "name": "A2",
        "ticks": 153600,
        "time": 80,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 55,
        "name": "G3",
        "ticks": 154080,
        "time": 80.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 60,
        "name": "C4",
        "ticks": 154080,
        "time": 80.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666666572,
        "durationTicks": 392,
        "midi": 55,
        "name": "G3",
        "ticks": 155040,
        "time": 80.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 155040,
        "time": 80.75,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.30416666666666003,
        "durationTicks": 584,
        "midi": 40,
        "name": "E2",
        "ticks": 155520,
        "time": 81,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 52,
        "name": "E3",
        "ticks": 156000,
        "time": 81.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 156000,
        "time": 81.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 43,
        "name": "G2",
        "ticks": 156480,
        "time": 81.5,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 156960,
        "time": 81.75,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 59,
        "name": "B3",
        "ticks": 156960,
        "time": 81.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.94583333333334,
        "durationTicks": 1816,
        "midi": 45,
        "name": "A2",
        "ticks": 157440,
        "time": 82,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 157920,
        "time": 82.25,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.3333333333333286,
        "durationTicks": 640,
        "midi": 55,
        "name": "G3",
        "ticks": 157920,
        "time": 82.25,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.3333333333333286,
        "durationTicks": 640,
        "midi": 60,
        "name": "C4",
        "ticks": 158880,
        "time": 82.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 55,
        "name": "G3",
        "ticks": 158880,
        "time": 82.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.9375,
        "durationTicks": 1800,
        "midi": 45,
        "name": "A2",
        "ticks": 159360,
        "time": 83,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 60,
        "name": "C4",
        "ticks": 159840,
        "time": 83.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 55,
        "name": "G3",
        "ticks": 159840,
        "time": 83.25,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 55,
        "name": "G3",
        "ticks": 160800,
        "time": 83.75,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 160800,
        "time": 83.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 52,
        "name": "E3",
        "ticks": 161280,
        "time": 84,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32083333333333997,
        "durationTicks": 616,
        "midi": 67,
        "name": "G4",
        "ticks": 161760,
        "time": 84.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3083333333333371,
        "durationTicks": 592,
        "midi": 59,
        "name": "B3",
        "ticks": 161760,
        "time": 84.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.3166666666666629,
        "durationTicks": 608,
        "midi": 64,
        "name": "E4",
        "ticks": 161760,
        "time": 84.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 162720,
        "time": 84.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 162720,
        "time": 84.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 64,
        "name": "E4",
        "ticks": 162720,
        "time": 84.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 163680,
        "time": 85.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.38750000000000284,
        "durationTicks": 744,
        "midi": 64,
        "name": "E4",
        "ticks": 163680,
        "time": 85.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 163680,
        "time": 85.25,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 59,
        "name": "B3",
        "ticks": 164640,
        "time": 85.75,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 64,
        "name": "E4",
        "ticks": 164640,
        "time": 85.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 67,
        "name": "G4",
        "ticks": 164640,
        "time": 85.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 1.7750000000000057,
        "durationTicks": 3408,
        "midi": 50,
        "name": "D3",
        "ticks": 165120,
        "time": 86,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.3791666666666629,
        "durationTicks": 728,
        "midi": 62,
        "name": "D4",
        "ticks": 165600,
        "time": 86.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 57,
        "name": "A3",
        "ticks": 165600,
        "time": 86.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 65,
        "name": "F4",
        "ticks": 165600,
        "time": 86.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 62,
        "name": "D4",
        "ticks": 166560,
        "time": 86.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3791666666666629,
        "durationTicks": 728,
        "midi": 65,
        "name": "F4",
        "ticks": 166560,
        "time": 86.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 57,
        "name": "A3",
        "ticks": 166560,
        "time": 86.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 65,
        "name": "F4",
        "ticks": 167520,
        "time": 87.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 57,
        "name": "A3",
        "ticks": 167520,
        "time": 87.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 62,
        "name": "D4",
        "ticks": 167520,
        "time": 87.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 62,
        "name": "D4",
        "ticks": 168480,
        "time": 87.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 57,
        "name": "A3",
        "ticks": 168480,
        "time": 87.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 65,
        "name": "F4",
        "ticks": 168480,
        "time": 87.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.7958333333333343,
        "durationTicks": 1528,
        "midi": 45,
        "name": "A2",
        "ticks": 168960,
        "time": 88,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 64,
        "name": "E4",
        "ticks": 169440,
        "time": 88.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 57,
        "name": "A3",
        "ticks": 169440,
        "time": 88.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 60,
        "name": "C4",
        "ticks": 169440,
        "time": 88.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.1458333333333286,
        "durationTicks": 280,
        "midi": 64,
        "name": "E4",
        "ticks": 170400,
        "time": 88.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 170400,
        "time": 88.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17083333333333428,
        "durationTicks": 328,
        "midi": 57,
        "name": "A3",
        "ticks": 170400,
        "time": 88.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.29999999999999716,
        "durationTicks": 576,
        "midi": 40,
        "name": "E2",
        "ticks": 170880,
        "time": 89,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 52,
        "name": "E3",
        "ticks": 171360,
        "time": 89.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 55,
        "name": "G3",
        "ticks": 171360,
        "time": 89.25,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.22499999999999432,
        "durationTicks": 432,
        "midi": 59,
        "name": "B3",
        "ticks": 171360,
        "time": 89.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.30416666666666003,
        "durationTicks": 584,
        "midi": 43,
        "name": "G2",
        "ticks": 171840,
        "time": 89.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 55,
        "name": "G3",
        "ticks": 172320,
        "time": 89.75,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.22499999999999432,
        "durationTicks": 432,
        "midi": 62,
        "name": "D4",
        "ticks": 172320,
        "time": 89.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 172320,
        "time": 89.75,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 1.92916666666666,
        "durationTicks": 3704,
        "midi": 45,
        "name": "A2",
        "ticks": 172800,
        "time": 90,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32083333333333997,
        "durationTicks": 616,
        "midi": 57,
        "name": "A3",
        "ticks": 173280,
        "time": 90.25,
        "velocity": 0.4094488188976378
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 173280,
        "time": 90.25,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.3375000000000057,
        "durationTicks": 648,
        "midi": 64,
        "name": "E4",
        "ticks": 173280,
        "time": 90.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 64,
        "name": "E4",
        "ticks": 174240,
        "time": 90.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 57,
        "name": "A3",
        "ticks": 174240,
        "time": 90.75,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.2541666666666629,
        "durationTicks": 488,
        "midi": 60,
        "name": "C4",
        "ticks": 174240,
        "time": 90.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3166666666666629,
        "durationTicks": 608,
        "midi": 60,
        "name": "C4",
        "ticks": 175200,
        "time": 91.25,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 57,
        "name": "A3",
        "ticks": 175200,
        "time": 91.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 175200,
        "time": 91.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14166666666666572,
        "durationTicks": 272,
        "midi": 64,
        "name": "E4",
        "ticks": 176160,
        "time": 91.75,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.12916666666666288,
        "durationTicks": 248,
        "midi": 57,
        "name": "A3",
        "ticks": 176160,
        "time": 91.75,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.13333333333333997,
        "durationTicks": 256,
        "midi": 60,
        "name": "C4",
        "ticks": 176160,
        "time": 91.75,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.5916666666666686,
        "durationTicks": 1136,
        "midi": 52,
        "name": "E3",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 45,
        "name": "A2",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5958333333333314,
        "durationTicks": 1144,
        "midi": 64,
        "name": "E4",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.6375000000000028,
        "durationTicks": 1224,
        "midi": 57,
        "name": "A3",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 60,
        "name": "C4",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 52,
        "name": "E3",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.17083333333333428,
        "durationTicks": 328,
        "midi": 40,
        "name": "E2",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 59,
        "name": "B3",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 50,
        "name": "D3",
        "ticks": 202560,
        "time": 105.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.19166666666666288,
        "durationTicks": 368,
        "midi": 59,
        "name": "B3",
        "ticks": 202560,
        "time": 105.5,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.19166666666666288,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 202560,
        "time": 105.5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 43,
        "name": "G2",
        "ticks": 202560,
        "time": 105.5,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 1.4666666666666686,
        "durationTicks": 2816,
        "midi": 52,
        "name": "E3",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 60,
        "name": "C4",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 1.4958333333333371,
        "durationTicks": 2872,
        "midi": 57,
        "name": "A3",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 1.4791666666666714,
        "durationTicks": 2840,
        "midi": 45,
        "name": "A2",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 45,
        "name": "A2",
        "ticks": 207360,
        "time": 108,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.2874999999999943,
        "durationTicks": 552,
        "midi": 55,
        "name": "G3",
        "ticks": 207840,
        "time": 108.25,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.2750000000000057,
        "durationTicks": 528,
        "midi": 60,
        "name": "C4",
        "ticks": 207840,
        "time": 108.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 45,
        "name": "A2",
        "ticks": 208320,
        "time": 108.5,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.22499999999999432,
        "durationTicks": 432,
        "midi": 55,
        "name": "G3",
        "ticks": 208800,
        "time": 108.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1875,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 208800,
        "time": 108.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 40,
        "name": "E2",
        "ticks": 209280,
        "time": 109,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 52,
        "name": "E3",
        "ticks": 209760,
        "time": 109.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.25,
        "durationTicks": 480,
        "midi": 55,
        "name": "G3",
        "ticks": 209760,
        "time": 109.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.32083333333333997,
        "durationTicks": 616,
        "midi": 43,
        "name": "G2",
        "ticks": 210240,
        "time": 109.5,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.2541666666666629,
        "durationTicks": 488,
        "midi": 59,
        "name": "B3",
        "ticks": 210720,
        "time": 109.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2541666666666629,
        "durationTicks": 488,
        "midi": 55,
        "name": "G3",
        "ticks": 210720,
        "time": 109.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.94583333333334,
        "durationTicks": 1816,
        "midi": 45,
        "name": "A2",
        "ticks": 211200,
        "time": 110,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 60,
        "name": "C4",
        "ticks": 211680,
        "time": 110.25,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.3333333333333286,
        "durationTicks": 640,
        "midi": 55,
        "name": "G3",
        "ticks": 211680,
        "time": 110.25,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.3333333333333286,
        "durationTicks": 640,
        "midi": 60,
        "name": "C4",
        "ticks": 212640,
        "time": 110.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 55,
        "name": "G3",
        "ticks": 212640,
        "time": 110.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.9375,
        "durationTicks": 1800,
        "midi": 45,
        "name": "A2",
        "ticks": 213120,
        "time": 111,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 60,
        "name": "C4",
        "ticks": 213600,
        "time": 111.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 55,
        "name": "G3",
        "ticks": 213600,
        "time": 111.25,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 55,
        "name": "G3",
        "ticks": 214560,
        "time": 111.75,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 60,
        "name": "C4",
        "ticks": 214560,
        "time": 111.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.27916666666666856,
        "durationTicks": 536,
        "midi": 52,
        "name": "E3",
        "ticks": 215040,
        "time": 112,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32083333333333997,
        "durationTicks": 616,
        "midi": 67,
        "name": "G4",
        "ticks": 215520,
        "time": 112.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3083333333333371,
        "durationTicks": 592,
        "midi": 59,
        "name": "B3",
        "ticks": 215520,
        "time": 112.25,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.3166666666666629,
        "durationTicks": 608,
        "midi": 64,
        "name": "E4",
        "ticks": 215520,
        "time": 112.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 216480,
        "time": 112.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 216480,
        "time": 112.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4000000000000057,
        "durationTicks": 768,
        "midi": 64,
        "name": "E4",
        "ticks": 216480,
        "time": 112.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3708333333333371,
        "durationTicks": 712,
        "midi": 59,
        "name": "B3",
        "ticks": 217440,
        "time": 113.25,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.38750000000000284,
        "durationTicks": 744,
        "midi": 64,
        "name": "E4",
        "ticks": 217440,
        "time": 113.25,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.38333333333333997,
        "durationTicks": 736,
        "midi": 67,
        "name": "G4",
        "ticks": 217440,
        "time": 113.25,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 59,
        "name": "B3",
        "ticks": 218400,
        "time": 113.75,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 64,
        "name": "E4",
        "ticks": 218400,
        "time": 113.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 67,
        "name": "G4",
        "ticks": 218400,
        "time": 113.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 1.7750000000000057,
        "durationTicks": 3408,
        "midi": 50,
        "name": "D3",
        "ticks": 218880,
        "time": 114,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.3791666666666629,
        "durationTicks": 728,
        "midi": 62,
        "name": "D4",
        "ticks": 219360,
        "time": 114.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.375,
        "durationTicks": 720,
        "midi": 57,
        "name": "A3",
        "ticks": 219360,
        "time": 114.25,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 65,
        "name": "F4",
        "ticks": 219360,
        "time": 114.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 62,
        "name": "D4",
        "ticks": 220320,
        "time": 114.75,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3791666666666629,
        "durationTicks": 728,
        "midi": 65,
        "name": "F4",
        "ticks": 220320,
        "time": 114.75,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.3916666666666657,
        "durationTicks": 752,
        "midi": 57,
        "name": "A3",
        "ticks": 220320,
        "time": 114.75,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 65,
        "name": "F4",
        "ticks": 221280,
        "time": 115.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3583333333333343,
        "durationTicks": 688,
        "midi": 57,
        "name": "A3",
        "ticks": 221280,
        "time": 115.25,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 62,
        "name": "D4",
        "ticks": 221280,
        "time": 115.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 62,
        "name": "D4",
        "ticks": 222240,
        "time": 115.75,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 57,
        "name": "A3",
        "ticks": 222240,
        "time": 115.75,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 65,
        "name": "F4",
        "ticks": 222240,
        "time": 115.75,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.8291666666666657,
        "durationTicks": 1592,
        "midi": 45,
        "name": "A2",
        "ticks": 222720,
        "time": 116,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 64,
        "name": "E4",
        "ticks": 223200,
        "time": 116.25,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 223200,
        "time": 116.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 57,
        "name": "A3",
        "ticks": 223200,
        "time": 116.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 224160,
        "time": 116.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.21666666666666856,
        "durationTicks": 416,
        "midi": 57,
        "name": "A3",
        "ticks": 224160,
        "time": 116.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666666572,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 224160,
        "time": 116.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 40,
        "name": "E2",
        "ticks": 224640,
        "time": 117,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 52,
        "name": "E3",
        "ticks": 225120,
        "time": 117.25,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 55,
        "name": "G3",
        "ticks": 225120,
        "time": 117.25,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 225120,
        "time": 117.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 43,
        "name": "G2",
        "ticks": 225600,
        "time": 117.5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 226080,
        "time": 117.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 62,
        "name": "D4",
        "ticks": 226080,
        "time": 117.75,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 59,
        "name": "B3",
        "ticks": 226080,
        "time": 117.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.9208333333333343,
        "durationTicks": 3688,
        "midi": 45,
        "name": "A2",
        "ticks": 226560,
        "time": 118,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 57,
        "name": "A3",
        "ticks": 227040,
        "time": 118.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3291666666666657,
        "durationTicks": 632,
        "midi": 60,
        "name": "C4",
        "ticks": 227040,
        "time": 118.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3291666666666657,
        "durationTicks": 632,
        "midi": 64,
        "name": "E4",
        "ticks": 227040,
        "time": 118.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 60,
        "name": "C4",
        "ticks": 228000,
        "time": 118.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 57,
        "name": "A3",
        "ticks": 228000,
        "time": 118.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.3375000000000057,
        "durationTicks": 648,
        "midi": 64,
        "name": "E4",
        "ticks": 228000,
        "time": 118.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.34166666666666856,
        "durationTicks": 656,
        "midi": 64,
        "name": "E4",
        "ticks": 228960,
        "time": 119.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 60,
        "name": "C4",
        "ticks": 228960,
        "time": 119.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 57,
        "name": "A3",
        "ticks": 228960,
        "time": 119.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17916666666666003,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 229920,
        "time": 119.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.19166666666666288,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 229920,
        "time": 119.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 229920,
        "time": 119.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.8291666666666657,
        "durationTicks": 1592,
        "midi": 45,
        "name": "A2",
        "ticks": 230400,
        "time": 120,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 64,
        "name": "E4",
        "ticks": 230880,
        "time": 120.25,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 230880,
        "time": 120.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 57,
        "name": "A3",
        "ticks": 230880,
        "time": 120.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 231840,
        "time": 120.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.21666666666666856,
        "durationTicks": 416,
        "midi": 57,
        "name": "A3",
        "ticks": 231840,
        "time": 120.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666666572,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 231840,
        "time": 120.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 40,
        "name": "E2",
        "ticks": 232320,
        "time": 121,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 52,
        "name": "E3",
        "ticks": 232800,
        "time": 121.25,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 55,
        "name": "G3",
        "ticks": 232800,
        "time": 121.25,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 232800,
        "time": 121.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 43,
        "name": "G2",
        "ticks": 233280,
        "time": 121.5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 233760,
        "time": 121.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 62,
        "name": "D4",
        "ticks": 233760,
        "time": 121.75,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 59,
        "name": "B3",
        "ticks": 233760,
        "time": 121.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.9208333333333343,
        "durationTicks": 3688,
        "midi": 45,
        "name": "A2",
        "ticks": 234240,
        "time": 122,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 57,
        "name": "A3",
        "ticks": 234720,
        "time": 122.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3291666666666657,
        "durationTicks": 632,
        "midi": 60,
        "name": "C4",
        "ticks": 234720,
        "time": 122.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3291666666666657,
        "durationTicks": 632,
        "midi": 64,
        "name": "E4",
        "ticks": 234720,
        "time": 122.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 60,
        "name": "C4",
        "ticks": 235680,
        "time": 122.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 57,
        "name": "A3",
        "ticks": 235680,
        "time": 122.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.3375000000000057,
        "durationTicks": 648,
        "midi": 64,
        "name": "E4",
        "ticks": 235680,
        "time": 122.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.34166666666666856,
        "durationTicks": 656,
        "midi": 64,
        "name": "E4",
        "ticks": 236640,
        "time": 123.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 60,
        "name": "C4",
        "ticks": 236640,
        "time": 123.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 57,
        "name": "A3",
        "ticks": 236640,
        "time": 123.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17916666666666003,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 237600,
        "time": 123.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.19166666666666288,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 237600,
        "time": 123.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 237600,
        "time": 123.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.8291666666666657,
        "durationTicks": 1592,
        "midi": 45,
        "name": "A2",
        "ticks": 238080,
        "time": 124,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 64,
        "name": "E4",
        "ticks": 238560,
        "time": 124.25,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 238560,
        "time": 124.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.36666666666666003,
        "durationTicks": 704,
        "midi": 57,
        "name": "A3",
        "ticks": 238560,
        "time": 124.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 239520,
        "time": 124.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.21666666666666856,
        "durationTicks": 416,
        "midi": 57,
        "name": "A3",
        "ticks": 239520,
        "time": 124.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666666572,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 239520,
        "time": 124.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.26250000000000284,
        "durationTicks": 504,
        "midi": 40,
        "name": "E2",
        "ticks": 240000,
        "time": 125,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.20000000000000284,
        "durationTicks": 384,
        "midi": 52,
        "name": "E3",
        "ticks": 240480,
        "time": 125.25,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 55,
        "name": "G3",
        "ticks": 240480,
        "time": 125.25,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 240480,
        "time": 125.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.23749999999999716,
        "durationTicks": 456,
        "midi": 43,
        "name": "G2",
        "ticks": 240960,
        "time": 125.5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333333997,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 241440,
        "time": 125.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 62,
        "name": "D4",
        "ticks": 241440,
        "time": 125.75,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.2083333333333286,
        "durationTicks": 400,
        "midi": 59,
        "name": "B3",
        "ticks": 241440,
        "time": 125.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.9208333333333343,
        "durationTicks": 3688,
        "midi": 45,
        "name": "A2",
        "ticks": 241920,
        "time": 126,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.32500000000000284,
        "durationTicks": 624,
        "midi": 57,
        "name": "A3",
        "ticks": 242400,
        "time": 126.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.3291666666666657,
        "durationTicks": 632,
        "midi": 60,
        "name": "C4",
        "ticks": 242400,
        "time": 126.25,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3291666666666657,
        "durationTicks": 632,
        "midi": 64,
        "name": "E4",
        "ticks": 242400,
        "time": 126.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.34583333333333144,
        "durationTicks": 664,
        "midi": 60,
        "name": "C4",
        "ticks": 243360,
        "time": 126.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 57,
        "name": "A3",
        "ticks": 243360,
        "time": 126.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.3375000000000057,
        "durationTicks": 648,
        "midi": 64,
        "name": "E4",
        "ticks": 243360,
        "time": 126.75,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.34166666666666856,
        "durationTicks": 656,
        "midi": 64,
        "name": "E4",
        "ticks": 244320,
        "time": 127.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 60,
        "name": "C4",
        "ticks": 244320,
        "time": 127.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3541666666666714,
        "durationTicks": 680,
        "midi": 57,
        "name": "A3",
        "ticks": 244320,
        "time": 127.25,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.17916666666666003,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 245280,
        "time": 127.75,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.19166666666666288,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 245280,
        "time": 127.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.17499999999999716,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 245280,
        "time": 127.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.8291666666666799,
        "durationTicks": 1592,
        "midi": 45,
        "name": "A2",
        "ticks": 245760,
        "time": 128,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.36666666666667425,
        "durationTicks": 704,
        "midi": 64,
        "name": "E4",
        "ticks": 246240,
        "time": 128.25,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36666666666667425,
        "durationTicks": 704,
        "midi": 60,
        "name": "C4",
        "ticks": 246240,
        "time": 128.25,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.36666666666667425,
        "durationTicks": 704,
        "midi": 57,
        "name": "A3",
        "ticks": 246240,
        "time": 128.25,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.19583333333332575,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 247200,
        "time": 128.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.21666666666666856,
        "durationTicks": 416,
        "midi": 57,
        "name": "A3",
        "ticks": 247200,
        "time": 128.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20416666666667993,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 247200,
        "time": 128.75,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.26249999999998863,
        "durationTicks": 504,
        "midi": 40,
        "name": "E2",
        "ticks": 247680,
        "time": 129,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19999999999998863,
        "durationTicks": 384,
        "midi": 52,
        "name": "E3",
        "ticks": 248160,
        "time": 129.25,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 55,
        "name": "G3",
        "ticks": 248160,
        "time": 129.25,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.22083333333333144,
        "durationTicks": 424,
        "midi": 59,
        "name": "B3",
        "ticks": 248160,
        "time": 129.25,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.23750000000001137,
        "durationTicks": 456,
        "midi": 43,
        "name": "G2",
        "ticks": 248640,
        "time": 129.5,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.19583333333332575,
        "durationTicks": 376,
        "midi": 55,
        "name": "G3",
        "ticks": 249120,
        "time": 129.75,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.21250000000000568,
        "durationTicks": 408,
        "midi": 62,
        "name": "D4",
        "ticks": 249120,
        "time": 129.75,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.2083333333333428,
        "durationTicks": 400,
        "midi": 59,
        "name": "B3",
        "ticks": 249120,
        "time": 129.75,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 2.92083333333332,
        "durationTicks": 5608,
        "midi": 45,
        "name": "A2",
        "ticks": 249600,
        "time": 130,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 2.933333333333337,
        "durationTicks": 5632,
        "midi": 64,
        "name": "E4",
        "ticks": 249600,
        "time": 130,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 2.9083333333333314,
        "durationTicks": 5584,
        "midi": 52,
        "name": "E3",
        "ticks": 249600,
        "time": 130,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 2.916666666666657,
        "durationTicks": 5600,
        "midi": 57,
        "name": "A3",
        "ticks": 249600,
        "time": 130,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 2.916666666666657,
        "durationTicks": 5600,
        "midi": 60,
        "name": "C4",
        "ticks": 249600,
        "time": 130,
        "velocity": 0.6141732283464567
    }
];

const recordingSecondNotes = [
    {
        "duration": 0.49166666666666664,
        "durationTicks": 944,
        "midi": 60,
        "name": "C4",
        "ticks": 0,
        "time": 0,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.4791666666666667,
        "durationTicks": 920,
        "midi": 69,
        "name": "A4",
        "ticks": 0,
        "time": 0,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.4791666666666667,
        "durationTicks": 920,
        "midi": 76,
        "name": "E5",
        "ticks": 0,
        "time": 0,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.5041666666666667,
        "durationTicks": 968,
        "midi": 64,
        "name": "E4",
        "ticks": 960,
        "time": 0.5,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.49583333333333335,
        "durationTicks": 952,
        "midi": 72,
        "name": "C5",
        "ticks": 960,
        "time": 0.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.4916666666666667,
        "durationTicks": 944,
        "midi": 81,
        "name": "A5",
        "ticks": 960,
        "time": 0.5,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.5125,
        "durationTicks": 984,
        "midi": 67,
        "name": "G4",
        "ticks": 1920,
        "time": 1,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.4916666666666667,
        "durationTicks": 944,
        "midi": 74,
        "name": "D5",
        "ticks": 1920,
        "time": 1,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.4916666666666667,
        "durationTicks": 944,
        "midi": 83,
        "name": "B5",
        "ticks": 1920,
        "time": 1,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.5208333333333335,
        "durationTicks": 1000,
        "midi": 62,
        "name": "D4",
        "ticks": 2880,
        "time": 1.5,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.5041666666666669,
        "durationTicks": 968,
        "midi": 71,
        "name": "B4",
        "ticks": 2880,
        "time": 1.5,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.4750000000000001,
        "durationTicks": 912,
        "midi": 79,
        "name": "G5",
        "ticks": 2880,
        "time": 1.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.7666666666666666,
        "durationTicks": 3392,
        "midi": 60,
        "name": "C4",
        "ticks": 3840,
        "time": 2,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.75,
        "durationTicks": 3360,
        "midi": 69,
        "name": "A4",
        "ticks": 3840,
        "time": 2,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.6,
        "durationTicks": 3072,
        "midi": 76,
        "name": "E5",
        "ticks": 3840,
        "time": 2,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.4666666666666668,
        "durationTicks": 896,
        "midi": 60,
        "name": "C4",
        "ticks": 7680,
        "time": 4,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.4833333333333334,
        "durationTicks": 928,
        "midi": 69,
        "name": "A4",
        "ticks": 7680,
        "time": 4,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.4666666666666668,
        "durationTicks": 896,
        "midi": 76,
        "name": "E5",
        "ticks": 7680,
        "time": 4,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.47916666666666696,
        "durationTicks": 920,
        "midi": 64,
        "name": "E4",
        "ticks": 8640,
        "time": 4.5,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.4833333333333334,
        "durationTicks": 928,
        "midi": 72,
        "name": "C5",
        "ticks": 8640,
        "time": 4.5,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.4833333333333334,
        "durationTicks": 928,
        "midi": 81,
        "name": "A5",
        "ticks": 8640,
        "time": 4.5,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.520833333333333,
        "durationTicks": 1000,
        "midi": 67,
        "name": "G4",
        "ticks": 9600,
        "time": 5,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.4833333333333334,
        "durationTicks": 928,
        "midi": 74,
        "name": "D5",
        "ticks": 9600,
        "time": 5,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.4874999999999998,
        "durationTicks": 936,
        "midi": 83,
        "name": "B5",
        "ticks": 9600,
        "time": 5,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.5083333333333337,
        "durationTicks": 976,
        "midi": 62,
        "name": "D4",
        "ticks": 10560,
        "time": 5.5,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.520833333333333,
        "durationTicks": 1000,
        "midi": 71,
        "name": "B4",
        "ticks": 10560,
        "time": 5.5,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5,
        "durationTicks": 960,
        "midi": 79,
        "name": "G5",
        "ticks": 10560,
        "time": 5.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.708333333333333,
        "durationTicks": 3280,
        "midi": 60,
        "name": "C4",
        "ticks": 11520,
        "time": 6,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.7416666666666663,
        "durationTicks": 3344,
        "midi": 69,
        "name": "A4",
        "ticks": 11520,
        "time": 6,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.7125000000000004,
        "durationTicks": 3288,
        "midi": 76,
        "name": "E5",
        "ticks": 11520,
        "time": 6,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.4958333333333336,
        "durationTicks": 2872,
        "midi": 76,
        "name": "E5",
        "ticks": 15360,
        "time": 8,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 1.5250000000000004,
        "durationTicks": 2928,
        "midi": 71,
        "name": "B4",
        "ticks": 15360,
        "time": 8,
        "velocity": 0.84251968503937
    },
    {
        "duration": 1.4916666666666671,
        "durationTicks": 2864,
        "midi": 79,
        "name": "G5",
        "ticks": 15360,
        "time": 8,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.8249999999999993,
        "durationTicks": 3504,
        "midi": 69,
        "name": "A4",
        "ticks": 19200,
        "time": 10,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 1.8291666666666675,
        "durationTicks": 3512,
        "midi": 74,
        "name": "D5",
        "ticks": 19200,
        "time": 10,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.8416666666666668,
        "durationTicks": 3536,
        "midi": 77,
        "name": "F5",
        "ticks": 19200,
        "time": 10,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.6041666666666661,
        "durationTicks": 1160,
        "midi": 76,
        "name": "E5",
        "ticks": 23040,
        "time": 12,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.6416666666666675,
        "durationTicks": 1232,
        "midi": 69,
        "name": "A4",
        "ticks": 23040,
        "time": 12,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.6208333333333336,
        "durationTicks": 1192,
        "midi": 72,
        "name": "C5",
        "ticks": 23040,
        "time": 12,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6166666666666671,
        "durationTicks": 1184,
        "midi": 57,
        "name": "A3",
        "ticks": 23040,
        "time": 12,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.5708333333333329,
        "durationTicks": 1096,
        "midi": 64,
        "name": "E4",
        "ticks": 24960,
        "time": 13,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.5833333333333339,
        "durationTicks": 1120,
        "midi": 67,
        "name": "G4",
        "ticks": 24960,
        "time": 13,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.5791666666666675,
        "durationTicks": 1112,
        "midi": 71,
        "name": "B4",
        "ticks": 24960,
        "time": 13,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.5791666666666675,
        "durationTicks": 1112,
        "midi": 74,
        "name": "D5",
        "ticks": 24960,
        "time": 13,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.6916666666666664,
        "durationTicks": 1328,
        "midi": 72,
        "name": "C5",
        "ticks": 26880,
        "time": 14,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.5208333333333339,
        "durationTicks": 1000,
        "midi": 69,
        "name": "A4",
        "ticks": 26880,
        "time": 14,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 57,
        "name": "A3",
        "ticks": 26880,
        "time": 14,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.5749999999999993,
        "durationTicks": 3024,
        "midi": 76,
        "name": "E5",
        "ticks": 26880,
        "time": 14,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 60,
        "name": "C4",
        "ticks": 61440,
        "time": 32,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 69,
        "name": "A4",
        "ticks": 61440,
        "time": 32,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 76,
        "name": "E5",
        "ticks": 61440,
        "time": 32,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.50416666666667,
        "durationTicks": 968,
        "midi": 64,
        "name": "E4",
        "ticks": 62400,
        "time": 32.5,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.49583333333333,
        "durationTicks": 952,
        "midi": 72,
        "name": "C5",
        "ticks": 62400,
        "time": 32.5,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 81,
        "name": "A5",
        "ticks": 62400,
        "time": 32.5,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.5125000000000028,
        "durationTicks": 984,
        "midi": 67,
        "name": "G4",
        "ticks": 63360,
        "time": 33,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 74,
        "name": "D5",
        "ticks": 63360,
        "time": 33,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 83,
        "name": "B5",
        "ticks": 63360,
        "time": 33,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.5208333333333357,
        "durationTicks": 1000,
        "midi": 62,
        "name": "D4",
        "ticks": 64320,
        "time": 33.5,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.50416666666667,
        "durationTicks": 968,
        "midi": 71,
        "name": "B4",
        "ticks": 64320,
        "time": 33.5,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.4750000000000014,
        "durationTicks": 912,
        "midi": 79,
        "name": "G5",
        "ticks": 64320,
        "time": 33.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.7083333333333357,
        "durationTicks": 3280,
        "midi": 60,
        "name": "C4",
        "ticks": 65280,
        "time": 34,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.7416666666666671,
        "durationTicks": 3344,
        "midi": 69,
        "name": "A4",
        "ticks": 65280,
        "time": 34,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 1.7124999999999986,
        "durationTicks": 3288,
        "midi": 76,
        "name": "E5",
        "ticks": 65280,
        "time": 34,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.49583333333333,
        "durationTicks": 2872,
        "midi": 76,
        "name": "E5",
        "ticks": 69120,
        "time": 36,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 1.5249999999999986,
        "durationTicks": 2928,
        "midi": 71,
        "name": "B4",
        "ticks": 69120,
        "time": 36,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.4916666666666671,
        "durationTicks": 2864,
        "midi": 79,
        "name": "G5",
        "ticks": 69120,
        "time": 36,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 1.8250000000000028,
        "durationTicks": 3504,
        "midi": 69,
        "name": "A4",
        "ticks": 72960,
        "time": 38,
        "velocity": 0.889763779527559
    },
    {
        "duration": 1.8291666666666657,
        "durationTicks": 3512,
        "midi": 74,
        "name": "D5",
        "ticks": 72960,
        "time": 38,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 1.8416666666666686,
        "durationTicks": 3536,
        "midi": 77,
        "name": "F5",
        "ticks": 72960,
        "time": 38,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.6041666666666643,
        "durationTicks": 1160,
        "midi": 76,
        "name": "E5",
        "ticks": 76800,
        "time": 40,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6416666666666657,
        "durationTicks": 1232,
        "midi": 69,
        "name": "A4",
        "ticks": 76800,
        "time": 40,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.62083333333333,
        "durationTicks": 1192,
        "midi": 72,
        "name": "C5",
        "ticks": 76800,
        "time": 40,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6166666666666671,
        "durationTicks": 1184,
        "midi": 57,
        "name": "A3",
        "ticks": 76800,
        "time": 40,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5708333333333329,
        "durationTicks": 1096,
        "midi": 64,
        "name": "E4",
        "ticks": 78720,
        "time": 41,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.5833333333333357,
        "durationTicks": 1120,
        "midi": 67,
        "name": "G4",
        "ticks": 78720,
        "time": 41,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.5791666666666657,
        "durationTicks": 1112,
        "midi": 71,
        "name": "B4",
        "ticks": 78720,
        "time": 41,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.5791666666666657,
        "durationTicks": 1112,
        "midi": 74,
        "name": "D5",
        "ticks": 78720,
        "time": 41,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 60,
        "name": "C4",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 69,
        "name": "A4",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 76,
        "name": "E5",
        "ticks": 84480,
        "time": 44,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.50416666666667,
        "durationTicks": 968,
        "midi": 64,
        "name": "E4",
        "ticks": 85440,
        "time": 44.5,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.49583333333333,
        "durationTicks": 952,
        "midi": 72,
        "name": "C5",
        "ticks": 85440,
        "time": 44.5,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 81,
        "name": "A5",
        "ticks": 85440,
        "time": 44.5,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5125000000000028,
        "durationTicks": 984,
        "midi": 67,
        "name": "G4",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 74,
        "name": "D5",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 83,
        "name": "B5",
        "ticks": 86400,
        "time": 45,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.5208333333333357,
        "durationTicks": 1000,
        "midi": 62,
        "name": "D4",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.50416666666667,
        "durationTicks": 968,
        "midi": 71,
        "name": "B4",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.4750000000000014,
        "durationTicks": 912,
        "midi": 79,
        "name": "G5",
        "ticks": 87360,
        "time": 45.5,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.7666666666666657,
        "durationTicks": 3392,
        "midi": 60,
        "name": "C4",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.75,
        "durationTicks": 3360,
        "midi": 69,
        "name": "A4",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 1.6000000000000014,
        "durationTicks": 3072,
        "midi": 76,
        "name": "E5",
        "ticks": 88320,
        "time": 46,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.46666666666666856,
        "durationTicks": 896,
        "midi": 60,
        "name": "C4",
        "ticks": 92160,
        "time": 48,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 69,
        "name": "A4",
        "ticks": 92160,
        "time": 48,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.46666666666666856,
        "durationTicks": 896,
        "midi": 76,
        "name": "E5",
        "ticks": 92160,
        "time": 48,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 64,
        "name": "E4",
        "ticks": 93120,
        "time": 48.5,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 72,
        "name": "C5",
        "ticks": 93120,
        "time": 48.5,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 81,
        "name": "A5",
        "ticks": 93120,
        "time": 48.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.5208333333333357,
        "durationTicks": 1000,
        "midi": 67,
        "name": "G4",
        "ticks": 94080,
        "time": 49,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 74,
        "name": "D5",
        "ticks": 94080,
        "time": 49,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.48749999999999716,
        "durationTicks": 936,
        "midi": 83,
        "name": "B5",
        "ticks": 94080,
        "time": 49,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.5083333333333329,
        "durationTicks": 976,
        "midi": 62,
        "name": "D4",
        "ticks": 95040,
        "time": 49.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.5208333333333357,
        "durationTicks": 1000,
        "midi": 71,
        "name": "B4",
        "ticks": 95040,
        "time": 49.5,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.5,
        "durationTicks": 960,
        "midi": 79,
        "name": "G5",
        "ticks": 95040,
        "time": 49.5,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 1.7083333333333357,
        "durationTicks": 3280,
        "midi": 60,
        "name": "C4",
        "ticks": 96000,
        "time": 50,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 1.7416666666666671,
        "durationTicks": 3344,
        "midi": 69,
        "name": "A4",
        "ticks": 96000,
        "time": 50,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.7124999999999986,
        "durationTicks": 3288,
        "midi": 76,
        "name": "E5",
        "ticks": 96000,
        "time": 50,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 1.49583333333333,
        "durationTicks": 2872,
        "midi": 76,
        "name": "E5",
        "ticks": 99840,
        "time": 52,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 1.5249999999999986,
        "durationTicks": 2928,
        "midi": 71,
        "name": "B4",
        "ticks": 99840,
        "time": 52,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.4916666666666671,
        "durationTicks": 2864,
        "midi": 79,
        "name": "G5",
        "ticks": 99840,
        "time": 52,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.8250000000000028,
        "durationTicks": 3504,
        "midi": 69,
        "name": "A4",
        "ticks": 103680,
        "time": 54,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 1.8291666666666657,
        "durationTicks": 3512,
        "midi": 74,
        "name": "D5",
        "ticks": 103680,
        "time": 54,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 1.8416666666666686,
        "durationTicks": 3536,
        "midi": 77,
        "name": "F5",
        "ticks": 103680,
        "time": 54,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.6041666666666643,
        "durationTicks": 1160,
        "midi": 76,
        "name": "E5",
        "ticks": 107520,
        "time": 56,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.6416666666666657,
        "durationTicks": 1232,
        "midi": 69,
        "name": "A4",
        "ticks": 107520,
        "time": 56,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.62083333333333,
        "durationTicks": 1192,
        "midi": 72,
        "name": "C5",
        "ticks": 107520,
        "time": 56,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.6166666666666671,
        "durationTicks": 1184,
        "midi": 57,
        "name": "A3",
        "ticks": 107520,
        "time": 56,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5708333333333329,
        "durationTicks": 1096,
        "midi": 64,
        "name": "E4",
        "ticks": 109440,
        "time": 57,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.5833333333333357,
        "durationTicks": 1120,
        "midi": 67,
        "name": "G4",
        "ticks": 109440,
        "time": 57,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.5791666666666657,
        "durationTicks": 1112,
        "midi": 71,
        "name": "B4",
        "ticks": 109440,
        "time": 57,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.5791666666666657,
        "durationTicks": 1112,
        "midi": 74,
        "name": "D5",
        "ticks": 109440,
        "time": 57,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 60,
        "name": "C4",
        "ticks": 115200,
        "time": 60,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 69,
        "name": "A4",
        "ticks": 115200,
        "time": 60,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.4791666666666643,
        "durationTicks": 920,
        "midi": 76,
        "name": "E5",
        "ticks": 115200,
        "time": 60,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.50416666666667,
        "durationTicks": 968,
        "midi": 64,
        "name": "E4",
        "ticks": 116160,
        "time": 60.5,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.49583333333333,
        "durationTicks": 952,
        "midi": 72,
        "name": "C5",
        "ticks": 116160,
        "time": 60.5,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 81,
        "name": "A5",
        "ticks": 116160,
        "time": 60.5,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.5125000000000028,
        "durationTicks": 984,
        "midi": 67,
        "name": "G4",
        "ticks": 117120,
        "time": 61,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 74,
        "name": "D5",
        "ticks": 117120,
        "time": 61,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.49166666666666714,
        "durationTicks": 944,
        "midi": 83,
        "name": "B5",
        "ticks": 117120,
        "time": 61,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.5208333333333357,
        "durationTicks": 1000,
        "midi": 62,
        "name": "D4",
        "ticks": 118080,
        "time": 61.5,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.50416666666667,
        "durationTicks": 968,
        "midi": 71,
        "name": "B4",
        "ticks": 118080,
        "time": 61.5,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.4750000000000014,
        "durationTicks": 912,
        "midi": 79,
        "name": "G5",
        "ticks": 118080,
        "time": 61.5,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 1.7666666666666657,
        "durationTicks": 3392,
        "midi": 60,
        "name": "C4",
        "ticks": 119040,
        "time": 62,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 1.75,
        "durationTicks": 3360,
        "midi": 69,
        "name": "A4",
        "ticks": 119040,
        "time": 62,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 1.6000000000000014,
        "durationTicks": 3072,
        "midi": 76,
        "name": "E5",
        "ticks": 119040,
        "time": 62,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.46666666666666856,
        "durationTicks": 896,
        "midi": 60,
        "name": "C4",
        "ticks": 122880,
        "time": 64,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 69,
        "name": "A4",
        "ticks": 122880,
        "time": 64,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.46666666666666856,
        "durationTicks": 896,
        "midi": 76,
        "name": "E5",
        "ticks": 122880,
        "time": 64,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.4791666666666714,
        "durationTicks": 920,
        "midi": 64,
        "name": "E4",
        "ticks": 123840,
        "time": 64.5,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 72,
        "name": "C5",
        "ticks": 123840,
        "time": 64.5,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 81,
        "name": "A5",
        "ticks": 123840,
        "time": 64.5,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.5208333333333286,
        "durationTicks": 1000,
        "midi": 67,
        "name": "G4",
        "ticks": 124800,
        "time": 65,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.4833333333333343,
        "durationTicks": 928,
        "midi": 74,
        "name": "D5",
        "ticks": 124800,
        "time": 65,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.48749999999999716,
        "durationTicks": 936,
        "midi": 83,
        "name": "B5",
        "ticks": 124800,
        "time": 65,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.50833333333334,
        "durationTicks": 976,
        "midi": 62,
        "name": "D4",
        "ticks": 125760,
        "time": 65.5,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.5208333333333286,
        "durationTicks": 1000,
        "midi": 71,
        "name": "B4",
        "ticks": 125760,
        "time": 65.5,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.5,
        "durationTicks": 960,
        "midi": 79,
        "name": "G5",
        "ticks": 125760,
        "time": 65.5,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.7083333333333286,
        "durationTicks": 3280,
        "midi": 60,
        "name": "C4",
        "ticks": 126720,
        "time": 66,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.74166666666666,
        "durationTicks": 3344,
        "midi": 69,
        "name": "A4",
        "ticks": 126720,
        "time": 66,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 1.7125000000000057,
        "durationTicks": 3288,
        "midi": 76,
        "name": "E5",
        "ticks": 126720,
        "time": 66,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 1.4958333333333371,
        "durationTicks": 2872,
        "midi": 76,
        "name": "E5",
        "ticks": 130560,
        "time": 68,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.5250000000000057,
        "durationTicks": 2928,
        "midi": 71,
        "name": "B4",
        "ticks": 130560,
        "time": 68,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 1.49166666666666,
        "durationTicks": 2864,
        "midi": 79,
        "name": "G5",
        "ticks": 130560,
        "time": 68,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 1.8250000000000028,
        "durationTicks": 3504,
        "midi": 69,
        "name": "A4",
        "ticks": 134400,
        "time": 70,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.8291666666666657,
        "durationTicks": 3512,
        "midi": 74,
        "name": "D5",
        "ticks": 134400,
        "time": 70,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 1.8416666666666686,
        "durationTicks": 3536,
        "midi": 77,
        "name": "F5",
        "ticks": 134400,
        "time": 70,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.6041666666666714,
        "durationTicks": 1160,
        "midi": 76,
        "name": "E5",
        "ticks": 138240,
        "time": 72,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.6416666666666657,
        "durationTicks": 1232,
        "midi": 69,
        "name": "A4",
        "ticks": 138240,
        "time": 72,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.6208333333333371,
        "durationTicks": 1192,
        "midi": 72,
        "name": "C5",
        "ticks": 138240,
        "time": 72,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.61666666666666,
        "durationTicks": 1184,
        "midi": 57,
        "name": "A3",
        "ticks": 138240,
        "time": 72,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.57083333333334,
        "durationTicks": 1096,
        "midi": 64,
        "name": "E4",
        "ticks": 140160,
        "time": 73,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5833333333333286,
        "durationTicks": 1120,
        "midi": 67,
        "name": "G4",
        "ticks": 140160,
        "time": 73,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.5791666666666657,
        "durationTicks": 1112,
        "midi": 71,
        "name": "B4",
        "ticks": 140160,
        "time": 73,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.5791666666666657,
        "durationTicks": 1112,
        "midi": 74,
        "name": "D5",
        "ticks": 140160,
        "time": 73,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6916666666666629,
        "durationTicks": 1328,
        "midi": 72,
        "name": "C5",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.5208333333333286,
        "durationTicks": 1000,
        "midi": 69,
        "name": "A4",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 57,
        "name": "A3",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.84251968503937
    },
    {
        "duration": 1.5,
        "durationTicks": 2880,
        "midi": 76,
        "name": "E5",
        "ticks": 142080,
        "time": 74,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.49166666666666003,
        "durationTicks": 944,
        "midi": 60,
        "name": "C4",
        "ticks": 176640,
        "time": 92,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.4791666666666714,
        "durationTicks": 920,
        "midi": 69,
        "name": "A4",
        "ticks": 176640,
        "time": 92,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.4791666666666714,
        "durationTicks": 920,
        "midi": 76,
        "name": "E5",
        "ticks": 176640,
        "time": 92,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.5041666666666629,
        "durationTicks": 968,
        "midi": 64,
        "name": "E4",
        "ticks": 177600,
        "time": 92.5,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.4958333333333371,
        "durationTicks": 952,
        "midi": 72,
        "name": "C5",
        "ticks": 177600,
        "time": 92.5,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.49166666666666003,
        "durationTicks": 944,
        "midi": 81,
        "name": "A5",
        "ticks": 177600,
        "time": 92.5,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.5125000000000028,
        "durationTicks": 984,
        "midi": 67,
        "name": "G4",
        "ticks": 178560,
        "time": 93,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.49166666666666003,
        "durationTicks": 944,
        "midi": 74,
        "name": "D5",
        "ticks": 178560,
        "time": 93,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.49166666666666003,
        "durationTicks": 944,
        "midi": 83,
        "name": "B5",
        "ticks": 178560,
        "time": 93,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.5208333333333286,
        "durationTicks": 1000,
        "midi": 62,
        "name": "D4",
        "ticks": 179520,
        "time": 93.5,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5041666666666629,
        "durationTicks": 968,
        "midi": 71,
        "name": "B4",
        "ticks": 179520,
        "time": 93.5,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.4749999999999943,
        "durationTicks": 912,
        "midi": 79,
        "name": "G5",
        "ticks": 179520,
        "time": 93.5,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.7083333333333286,
        "durationTicks": 3280,
        "midi": 60,
        "name": "C4",
        "ticks": 180480,
        "time": 94,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 1.74166666666666,
        "durationTicks": 3344,
        "midi": 69,
        "name": "A4",
        "ticks": 180480,
        "time": 94,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.7125000000000057,
        "durationTicks": 3288,
        "midi": 76,
        "name": "E5",
        "ticks": 180480,
        "time": 94,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 1.4958333333333371,
        "durationTicks": 2872,
        "midi": 76,
        "name": "E5",
        "ticks": 184320,
        "time": 96,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.5250000000000057,
        "durationTicks": 2928,
        "midi": 71,
        "name": "B4",
        "ticks": 184320,
        "time": 96,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 1.49166666666666,
        "durationTicks": 2864,
        "midi": 79,
        "name": "G5",
        "ticks": 184320,
        "time": 96,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.8250000000000028,
        "durationTicks": 3504,
        "midi": 69,
        "name": "A4",
        "ticks": 188160,
        "time": 98,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.8291666666666657,
        "durationTicks": 3512,
        "midi": 74,
        "name": "D5",
        "ticks": 188160,
        "time": 98,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 1.8416666666666686,
        "durationTicks": 3536,
        "midi": 77,
        "name": "F5",
        "ticks": 188160,
        "time": 98,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 72,
        "name": "C5",
        "ticks": 192000,
        "time": 100,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 57,
        "name": "A3",
        "ticks": 192000,
        "time": 100,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6083333333333343,
        "durationTicks": 1168,
        "midi": 76,
        "name": "E5",
        "ticks": 192000,
        "time": 100,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 69,
        "name": "A4",
        "ticks": 192000,
        "time": 100,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 67,
        "name": "G4",
        "ticks": 193920,
        "time": 101,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.55416666666666,
        "durationTicks": 1064,
        "midi": 71,
        "name": "B4",
        "ticks": 193920,
        "time": 101,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.5499999999999972,
        "durationTicks": 1056,
        "midi": 64,
        "name": "E4",
        "ticks": 193920,
        "time": 101,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 74,
        "name": "D5",
        "ticks": 193920,
        "time": 101,
        "velocity": 0.889763779527559
    },
    {
        "duration": 1.8499999999999943,
        "durationTicks": 3552,
        "midi": 69,
        "name": "A4",
        "ticks": 195840,
        "time": 102,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 1.8499999999999943,
        "durationTicks": 3552,
        "midi": 72,
        "name": "C5",
        "ticks": 195840,
        "time": 102,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 1.8708333333333371,
        "durationTicks": 3592,
        "midi": 76,
        "name": "E5",
        "ticks": 195840,
        "time": 102,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 1.875,
        "durationTicks": 3600,
        "midi": 57,
        "name": "A3",
        "ticks": 195840,
        "time": 102,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 72,
        "name": "C5",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.8818897637795275
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 57,
        "name": "A3",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.6083333333333343,
        "durationTicks": 1168,
        "midi": 76,
        "name": "E5",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 69,
        "name": "A4",
        "ticks": 199680,
        "time": 104,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 67,
        "name": "G4",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.55416666666666,
        "durationTicks": 1064,
        "midi": 71,
        "name": "B4",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.5499999999999972,
        "durationTicks": 1056,
        "midi": 64,
        "name": "E4",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 74,
        "name": "D5",
        "ticks": 201600,
        "time": 105,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 1.8499999999999943,
        "durationTicks": 3552,
        "midi": 69,
        "name": "A4",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.8499999999999943,
        "durationTicks": 3552,
        "midi": 72,
        "name": "C5",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.8708333333333371,
        "durationTicks": 3592,
        "midi": 76,
        "name": "E5",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.875,
        "durationTicks": 3600,
        "midi": 57,
        "name": "A3",
        "ticks": 203520,
        "time": 106,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 72,
        "name": "C5",
        "ticks": 207360,
        "time": 108,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 57,
        "name": "A3",
        "ticks": 207360,
        "time": 108,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.6083333333333343,
        "durationTicks": 1168,
        "midi": 76,
        "name": "E5",
        "ticks": 207360,
        "time": 108,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 69,
        "name": "A4",
        "ticks": 207360,
        "time": 108,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 67,
        "name": "G4",
        "ticks": 209280,
        "time": 109,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.55416666666666,
        "durationTicks": 1064,
        "midi": 71,
        "name": "B4",
        "ticks": 209280,
        "time": 109,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.5499999999999972,
        "durationTicks": 1056,
        "midi": 64,
        "name": "E4",
        "ticks": 209280,
        "time": 109,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 74,
        "name": "D5",
        "ticks": 209280,
        "time": 109,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 1.8499999999999943,
        "durationTicks": 3552,
        "midi": 69,
        "name": "A4",
        "ticks": 211200,
        "time": 110,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 1.8499999999999943,
        "durationTicks": 3552,
        "midi": 72,
        "name": "C5",
        "ticks": 211200,
        "time": 110,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 1.8708333333333371,
        "durationTicks": 3592,
        "midi": 76,
        "name": "E5",
        "ticks": 211200,
        "time": 110,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 1.875,
        "durationTicks": 3600,
        "midi": 57,
        "name": "A3",
        "ticks": 211200,
        "time": 110,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 72,
        "name": "C5",
        "ticks": 215040,
        "time": 112,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6124999999999972,
        "durationTicks": 1176,
        "midi": 57,
        "name": "A3",
        "ticks": 215040,
        "time": 112,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.6083333333333343,
        "durationTicks": 1168,
        "midi": 76,
        "name": "E5",
        "ticks": 215040,
        "time": 112,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 69,
        "name": "A4",
        "ticks": 215040,
        "time": 112,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 67,
        "name": "G4",
        "ticks": 216960,
        "time": 113,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.55416666666666,
        "durationTicks": 1064,
        "midi": 71,
        "name": "B4",
        "ticks": 216960,
        "time": 113,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.5499999999999972,
        "durationTicks": 1056,
        "midi": 64,
        "name": "E4",
        "ticks": 216960,
        "time": 113,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.5625,
        "durationTicks": 1080,
        "midi": 74,
        "name": "D5",
        "ticks": 216960,
        "time": 113,
        "velocity": 0.8976377952755905
    },
    {
        "duration": 3.799999999999997,
        "durationTicks": 7296,
        "midi": 76,
        "name": "E5",
        "ticks": 218880,
        "time": 114,
        "velocity": 0.84251968503937
    },
    {
        "duration": 3.7958333333333343,
        "durationTicks": 7288,
        "midi": 60,
        "name": "C4",
        "ticks": 218880,
        "time": 114,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 3.799999999999997,
        "durationTicks": 7296,
        "midi": 71,
        "name": "B4",
        "ticks": 218880,
        "time": 114,
        "velocity": 0.8661417322834646
    }
];

// console.log({recordingNotes});

const recordingPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#008b8b';
    // instrMapped.color = '#800000'; // dkred
    instrMapped.color = '#64b5f6'; // human blue

    // instrMapped.originalPosition.z -= 15;
    // instrMapped.originalPosition.z -= 18;
    instrMapped.originalPosition.z += 8;

    instrMapped.duration = datum.duration / 2;

    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingFirstNotes);      // twinkle twinkle little star
// }, recordingSecondNotes);  // bah bah black sheep
// }, recordingThirdNotes);  // alphabet song

// recordingPart.volume.value = -18;
// recordingPart.loop = true;
// recordingPart.start("0:0:0"); // red notes

const recordingSecondPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#0000cd';
    // instrMapped.color = '#003366'; 

    instrMapped.color = '#800000'; // dkred
    // instrMapped.color = '#64b5f6'; // human blue

    // instrMapped.originalPosition.z += 15;
    instrMapped.originalPosition.z -= 5;
    // instrMapped.originalPosition.z += 8;

    instrMapped.duration = datum.duration / 2;


    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingSecondNotes);  // bah bah black sheep

// // recordingSecondPart.loop = true;
recordingSecondPart.start("0:0:0");
// recordingSecondPart.start("4:0:0"); // little too early
// recordingSecondPart.start("4:4:0"); // decent
// recordingSecondPart.start("5:0:0"); // too late