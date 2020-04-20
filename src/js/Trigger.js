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
Store.polySynth.volume.value = -18;

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
        "duration": 1.4494791666666664,
        "durationTicks": 2783,
        "midi": 45,
        "name": "A2",
        "ticks": 7861,
        "time": 4.094270833333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666668,
        "durationTicks": 1391,
        "midi": 40,
        "name": "E2",
        "ticks": 10644,
        "time": 5.54375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7249999999999996,
        "durationTicks": 1392,
        "midi": 43,
        "name": "G2",
        "ticks": 12035,
        "time": 6.268229166666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.9927083333333337,
        "durationTicks": 3826,
        "midi": 45,
        "name": "A2",
        "ticks": 13427,
        "time": 6.993229166666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.18125000000000036,
        "durationTicks": 348,
        "midi": 40,
        "name": "E2",
        "ticks": 17253,
        "time": 8.9859375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3619791666666661,
        "durationTicks": 695,
        "midi": 43,
        "name": "G2",
        "ticks": 17601,
        "time": 9.1671875,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3625000000000007,
        "durationTicks": 696,
        "midi": 44,
        "name": "G#2",
        "ticks": 18296,
        "time": 9.529166666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.4494791666666664,
        "durationTicks": 2783,
        "midi": 45,
        "name": "A2",
        "ticks": 18992,
        "time": 9.891666666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666668,
        "durationTicks": 1391,
        "midi": 40,
        "name": "E2",
        "ticks": 21775,
        "time": 11.341145833333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666668,
        "durationTicks": 1391,
        "midi": 43,
        "name": "G2",
        "ticks": 23166,
        "time": 12.065625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.8114583333333325,
        "durationTicks": 3478,
        "midi": 45,
        "name": "A2",
        "ticks": 24557,
        "time": 12.790104166666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3625000000000007,
        "durationTicks": 696,
        "midi": 45,
        "name": "A2",
        "ticks": 28035,
        "time": 14.6015625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999893,
        "durationTicks": 696,
        "midi": 48,
        "name": "C3",
        "ticks": 28731,
        "time": 14.9640625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36197916666666785,
        "durationTicks": 695,
        "midi": 50,
        "name": "D3",
        "ticks": 29427,
        "time": 15.3265625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7249999999999996,
        "durationTicks": 1392,
        "midi": 52,
        "name": "E3",
        "ticks": 30122,
        "time": 15.688541666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36197916666666785,
        "durationTicks": 695,
        "midi": 52,
        "name": "E3",
        "ticks": 31514,
        "time": 16.413541666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 43,
        "name": "G2",
        "ticks": 32209,
        "time": 16.775520833333335,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 52,
        "name": "E3",
        "ticks": 32905,
        "time": 17.138020833333332,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.5437499999999993,
        "durationTicks": 1044,
        "midi": 47,
        "name": "B2",
        "ticks": 34296,
        "time": 17.8625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.18124999999999858,
        "durationTicks": 348,
        "midi": 40,
        "name": "E2",
        "ticks": 35340,
        "time": 18.40625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 38,
        "name": "D2",
        "ticks": 35688,
        "time": 18.5875,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.724479166666665,
        "durationTicks": 1391,
        "midi": 38,
        "name": "D2",
        "ticks": 37079,
        "time": 19.311979166666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 38,
        "name": "D2",
        "ticks": 38470,
        "time": 20.036458333333332,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3625000000000007,
        "durationTicks": 696,
        "midi": 43,
        "name": "G2",
        "ticks": 39861,
        "time": 20.7609375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 44,
        "name": "G#2",
        "ticks": 40557,
        "time": 21.1234375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.4489583333333336,
        "durationTicks": 2782,
        "midi": 45,
        "name": "A2",
        "ticks": 41253,
        "time": 21.4859375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7250000000000014,
        "durationTicks": 1392,
        "midi": 40,
        "name": "E2",
        "ticks": 44035,
        "time": 22.934895833333332,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.724479166666665,
        "durationTicks": 1391,
        "midi": 43,
        "name": "G2",
        "ticks": 45427,
        "time": 23.659895833333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.9927083333333364,
        "durationTicks": 3826,
        "midi": 45,
        "name": "A2",
        "ticks": 46818,
        "time": 24.384375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.18124999999999858,
        "durationTicks": 348,
        "midi": 52,
        "name": "E3",
        "ticks": 50644,
        "time": 26.377083333333335,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3625000000000007,
        "durationTicks": 696,
        "midi": 55,
        "name": "G3",
        "ticks": 50992,
        "time": 26.558333333333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3619791666666643,
        "durationTicks": 695,
        "midi": 56,
        "name": "G#3",
        "ticks": 51688,
        "time": 26.920833333333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.4494791666666664,
        "durationTicks": 2783,
        "midi": 57,
        "name": "A3",
        "ticks": 52383,
        "time": 27.2828125,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 52,
        "name": "E3",
        "ticks": 55166,
        "time": 28.732291666666665,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.724479166666665,
        "durationTicks": 1391,
        "midi": 55,
        "name": "G3",
        "ticks": 56557,
        "time": 29.456770833333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.9932291666666657,
        "durationTicks": 3827,
        "midi": 57,
        "name": "A3",
        "ticks": 57948,
        "time": 30.18125,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.18072916666666572,
        "durationTicks": 347,
        "midi": 52,
        "name": "E3",
        "ticks": 61775,
        "time": 32.174479166666664,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36250000000000426,
        "durationTicks": 696,
        "midi": 55,
        "name": "G3",
        "ticks": 62122,
        "time": 32.35520833333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 56,
        "name": "G#3",
        "ticks": 62818,
        "time": 32.717708333333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.4489583333333371,
        "durationTicks": 2782,
        "midi": 57,
        "name": "A3",
        "ticks": 63514,
        "time": 33.08020833333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7250000000000014,
        "durationTicks": 1392,
        "midi": 52,
        "name": "E3",
        "ticks": 66296,
        "time": 34.52916666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666615,
        "durationTicks": 1391,
        "midi": 55,
        "name": "G3",
        "ticks": 67688,
        "time": 35.25416666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.8114583333333343,
        "durationTicks": 3478,
        "midi": 57,
        "name": "A3",
        "ticks": 69079,
        "time": 35.97864583333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36250000000000426,
        "durationTicks": 696,
        "midi": 57,
        "name": "A3",
        "ticks": 72557,
        "time": 37.790104166666666,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3619791666666643,
        "durationTicks": 695,
        "midi": 60,
        "name": "C4",
        "ticks": 73253,
        "time": 38.15260416666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 62,
        "name": "D4",
        "ticks": 73948,
        "time": 38.514583333333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 64,
        "name": "E4",
        "ticks": 74644,
        "time": 38.87708333333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 64,
        "name": "E4",
        "ticks": 76035,
        "time": 39.6015625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36250000000000426,
        "durationTicks": 696,
        "midi": 55,
        "name": "G3",
        "ticks": 76731,
        "time": 39.9640625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3619791666666643,
        "durationTicks": 695,
        "midi": 64,
        "name": "E4",
        "ticks": 77427,
        "time": 40.3265625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36250000000000426,
        "durationTicks": 696,
        "midi": 59,
        "name": "B3",
        "ticks": 78122,
        "time": 40.688541666666666,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 64,
        "name": "E4",
        "ticks": 78818,
        "time": 41.05104166666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3619791666666643,
        "durationTicks": 695,
        "midi": 59,
        "name": "B3",
        "ticks": 79514,
        "time": 41.41354166666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.8119791666666671,
        "durationTicks": 3479,
        "midi": 50,
        "name": "D3",
        "ticks": 80209,
        "time": 41.77552083333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3619791666666714,
        "durationTicks": 695,
        "midi": 50,
        "name": "D3",
        "ticks": 83688,
        "time": 43.5875,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 55,
        "name": "G3",
        "ticks": 84383,
        "time": 43.94947916666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 56,
        "name": "G#3",
        "ticks": 85079,
        "time": 44.31197916666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.4489583333333371,
        "durationTicks": 2782,
        "midi": 57,
        "name": "A3",
        "ticks": 85775,
        "time": 44.674479166666664,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 52,
        "name": "E3",
        "ticks": 88557,
        "time": 46.1234375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7249999999999943,
        "durationTicks": 1392,
        "midi": 55,
        "name": "G3",
        "ticks": 89948,
        "time": 46.84791666666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.8984375,
        "durationTicks": 5565,
        "midi": 57,
        "name": "A3",
        "ticks": 91340,
        "time": 47.572916666666664,
        "velocity": 0.7874015748031497
    },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 96905,
    //     "time": 50.471354166666664,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18072916666666572,
    //     "durationTicks": 347,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 97601,
    //     "time": 50.83385416666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 97948,
    //     "time": 51.014583333333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 98296,
    //     "time": 51.19583333333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 98992,
    //     "time": 51.55833333333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 99688,
    //     "time": 51.920833333333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 100383,
    //     "time": 52.2828125,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18125000000000568,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 100731,
    //     "time": 52.4640625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 101079,
    //     "time": 52.6453125,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 101774,
    //     "time": 53.00729166666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 102470,
    //     "time": 53.369791666666664,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 103166,
    //     "time": 53.73229166666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18072916666666572,
    //     "durationTicks": 347,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 103514,
    //     "time": 53.91354166666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 103861,
    //     "time": 54.09427083333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 104557,
    //     "time": 54.45677083333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 105253,
    //     "time": 54.819270833333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 105948,
    //     "time": 55.18125,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18125000000000568,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 106296,
    //     "time": 55.3625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 106644,
    //     "time": 55.54375,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 107340,
    //     "time": 55.90625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 108035,
    //     "time": 56.268229166666664,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 108731,
    //     "time": 56.63072916666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 109079,
    //     "time": 56.81197916666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 109427,
    //     "time": 56.993229166666666,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 110122,
    //     "time": 57.35520833333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 110818,
    //     "time": 57.717708333333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18072916666666572,
    //     "durationTicks": 347,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 111514,
    //     "time": 58.08020833333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18125000000000568,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 111861,
    //     "time": 58.2609375,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 112209,
    //     "time": 58.4421875,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 112905,
    //     "time": 58.8046875,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666714,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 113601,
    //     "time": 59.1671875,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 114296,
    //     "time": 59.52916666666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 114644,
    //     "time": 59.71041666666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 114992,
    //     "time": 59.891666666666666,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 115688,
    //     "time": 60.25416666666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 116383,
    //     "time": 60.616145833333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 117079,
    //     "time": 60.97864583333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18072916666667282,
    //     "durationTicks": 347,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 117427,
    //     "time": 61.15989583333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 117774,
    //     "time": 61.340625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 118470,
    //     "time": 61.703125,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666714,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 119166,
    //     "time": 62.065625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 119861,
    //     "time": 62.42760416666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999858,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 120209,
    //     "time": 62.60885416666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000000426,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 120557,
    //     "time": 62.790104166666666,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666643,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 121253,
    //     "time": 63.15260416666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 121948,
    //     "time": 63.514583333333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18125000000000568,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 122644,
    //     "time": 63.87708333333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999147,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 122992,
    //     "time": 64.05833333333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666714,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 123340,
    //     "time": 64.23958333333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 124035,
    //     "time": 64.6015625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 124731,
    //     "time": 64.9640625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18125000000000568,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 125427,
    //     "time": 65.3265625,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18072916666666572,
    //     "durationTicks": 347,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 125775,
    //     "time": 65.5078125,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 126122,
    //     "time": 65.68854166666667,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36249999999999716,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 126818,
    //     "time": 66.05104166666666,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666714,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 127514,
    //     "time": 66.41354166666666,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18125000000000568,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 128209,
    //     "time": 66.77552083333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.18124999999999147,
    //     "durationTicks": 348,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 128557,
    //     "time": 66.95677083333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.36250000000001137,
    //     "durationTicks": 696,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 128905,
    //     "time": 67.13802083333333,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 0.3619791666666572,
    //     "durationTicks": 695,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 129601,
    //     "time": 67.50052083333334,
    //     "velocity": 0.7874015748031497
    // },
    // {
    //     "duration": 1.4494791666666629,
    //     "durationTicks": 2783,
    //     "midi": 45,
    //     "name": "A2",
    //     "ticks": 130296,
    //     "time": 67.8625,
    //     "velocity": 0.7874015748031497
    // },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 40,
        "name": "E2",
        "ticks": 133079,
        "time": 69.31197916666666,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 43,
        "name": "G2",
        "ticks": 134470,
        "time": 70.03645833333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.9932291666666657,
        "durationTicks": 3827,
        "midi": 45,
        "name": "A2",
        "ticks": 135861,
        "time": 70.7609375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.18072916666666572,
        "durationTicks": 347,
        "midi": 52,
        "name": "E3",
        "ticks": 139688,
        "time": 72.75416666666666,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36250000000001137,
        "durationTicks": 696,
        "midi": 55,
        "name": "G3",
        "ticks": 140035,
        "time": 72.93489583333333,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.36249999999999716,
        "durationTicks": 696,
        "midi": 56,
        "name": "G#3",
        "ticks": 140731,
        "time": 73.29739583333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.448958333333323,
        "durationTicks": 2782,
        "midi": 57,
        "name": "A3",
        "ticks": 141427,
        "time": 73.65989583333334,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7250000000000085,
        "durationTicks": 1392,
        "midi": 52,
        "name": "E3",
        "ticks": 144209,
        "time": 75.10885416666666,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.7244791666666686,
        "durationTicks": 1391,
        "midi": 55,
        "name": "G3",
        "ticks": 145601,
        "time": 75.83385416666667,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 1.941145833333323,
        "durationTicks": 3727,
        "midi": 57,
        "name": "A3",
        "ticks": 146992,
        "time": 76.55833333333334,
        "velocity": 0.7874015748031497
    }
];

const recordingSecondNotes = [
    {
        "duration": 0.6302083333333334,
        "durationTicks": 1210,
        "midi": 60,
        "name": "C4",
        "ticks": 0,
        "time": 0,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.6145833333333334,
        "durationTicks": 1180,
        "midi": 69,
        "name": "A4",
        "ticks": 0,
        "time": 0,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6145833333333334,
        "durationTicks": 1180,
        "midi": 76,
        "name": "E5",
        "ticks": 0,
        "time": 0,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.6463541666666668,
        "durationTicks": 1241,
        "midi": 64,
        "name": "E4",
        "ticks": 1231,
        "time": 0.6411458333333333,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6354166666666667,
        "durationTicks": 1220,
        "midi": 72,
        "name": "C5",
        "ticks": 1231,
        "time": 0.6411458333333333,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.6302083333333333,
        "durationTicks": 1210,
        "midi": 81,
        "name": "A5",
        "ticks": 1231,
        "time": 0.6411458333333333,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 0.6567708333333333,
        "durationTicks": 1261,
        "midi": 67,
        "name": "G4",
        "ticks": 2462,
        "time": 1.2822916666666666,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.6302083333333335,
        "durationTicks": 1210,
        "midi": 74,
        "name": "D5",
        "ticks": 2462,
        "time": 1.2822916666666666,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.6302083333333335,
        "durationTicks": 1210,
        "midi": 83,
        "name": "B5",
        "ticks": 2462,
        "time": 1.2822916666666666,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.6677083333333336,
        "durationTicks": 1282,
        "midi": 62,
        "name": "D4",
        "ticks": 3692,
        "time": 1.9229166666666666,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.6463541666666668,
        "durationTicks": 1241,
        "midi": 71,
        "name": "B4",
        "ticks": 3692,
        "time": 1.9229166666666666,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.609375,
        "durationTicks": 1170,
        "midi": 79,
        "name": "G5",
        "ticks": 3692,
        "time": 1.9229166666666666,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 2.2651041666666667,
        "durationTicks": 4349,
        "midi": 60,
        "name": "C4",
        "ticks": 4923,
        "time": 2.5640625,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 2.24375,
        "durationTicks": 4308,
        "midi": 69,
        "name": "A4",
        "ticks": 4923,
        "time": 2.5640625,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.0515624999999997,
        "durationTicks": 3939,
        "midi": 76,
        "name": "E5",
        "ticks": 4923,
        "time": 2.5640625,
        "velocity": 0.8503937007874016
    },
    {
        "duration": 0.5984375000000002,
        "durationTicks": 1149,
        "midi": 60,
        "name": "C4",
        "ticks": 9846,
        "time": 5.128125,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 0.619791666666667,
        "durationTicks": 1190,
        "midi": 69,
        "name": "A4",
        "ticks": 9846,
        "time": 5.128125,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5984375000000002,
        "durationTicks": 1149,
        "midi": 76,
        "name": "E5",
        "ticks": 9846,
        "time": 5.128125,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.6140625000000002,
        "durationTicks": 1179,
        "midi": 64,
        "name": "E4",
        "ticks": 11077,
        "time": 5.769270833333334,
        "velocity": 0.7952755905511811
    },
    {
        "duration": 0.6197916666666661,
        "durationTicks": 1190,
        "midi": 72,
        "name": "C5",
        "ticks": 11077,
        "time": 5.769270833333334,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6197916666666661,
        "durationTicks": 1190,
        "midi": 81,
        "name": "A5",
        "ticks": 11077,
        "time": 5.769270833333334,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6677083333333336,
        "durationTicks": 1282,
        "midi": 67,
        "name": "G4",
        "ticks": 12308,
        "time": 6.410416666666666,
        "velocity": 0.889763779527559
    },
    {
        "duration": 0.6192708333333332,
        "durationTicks": 1189,
        "midi": 74,
        "name": "D5",
        "ticks": 12308,
        "time": 6.410416666666666,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.625,
        "durationTicks": 1200,
        "midi": 83,
        "name": "B5",
        "ticks": 12308,
        "time": 6.410416666666666,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.6520833333333336,
        "durationTicks": 1252,
        "midi": 62,
        "name": "D4",
        "ticks": 13538,
        "time": 7.051041666666666,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.6682291666666673,
        "durationTicks": 1283,
        "midi": 71,
        "name": "B4",
        "ticks": 13538,
        "time": 7.051041666666666,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6411458333333337,
        "durationTicks": 1231,
        "midi": 79,
        "name": "G5",
        "ticks": 13538,
        "time": 7.051041666666666,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 2.190104166666667,
        "durationTicks": 4205,
        "midi": 60,
        "name": "C4",
        "ticks": 14769,
        "time": 7.6921875,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 2.2328125000000005,
        "durationTicks": 4287,
        "midi": 69,
        "name": "A4",
        "ticks": 14769,
        "time": 7.6921875,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 2.1958333333333337,
        "durationTicks": 4216,
        "midi": 76,
        "name": "E5",
        "ticks": 14769,
        "time": 7.6921875,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.9177083333333336,
        "durationTicks": 3682,
        "midi": 76,
        "name": "E5",
        "ticks": 19692,
        "time": 10.25625,
        "velocity": 0.8582677165354331
    },
    {
        "duration": 1.9552083333333332,
        "durationTicks": 3754,
        "midi": 71,
        "name": "B4",
        "ticks": 19692,
        "time": 10.25625,
        "velocity": 0.84251968503937
    },
    {
        "duration": 1.9124999999999996,
        "durationTicks": 3672,
        "midi": 79,
        "name": "G5",
        "ticks": 19692,
        "time": 10.25625,
        "velocity": 0.8188976377952756
    },
    {
        "duration": 2.3401041666666664,
        "durationTicks": 4493,
        "midi": 69,
        "name": "A4",
        "ticks": 24615,
        "time": 12.8203125,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 2.3453125000000004,
        "durationTicks": 4503,
        "midi": 74,
        "name": "D5",
        "ticks": 24615,
        "time": 12.8203125,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.361458333333333,
        "durationTicks": 4534,
        "midi": 77,
        "name": "F5",
        "ticks": 24615,
        "time": 12.8203125,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.7750000000000004,
        "durationTicks": 1488,
        "midi": 76,
        "name": "E5",
        "ticks": 29538,
        "time": 15.384375,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.8229166666666661,
        "durationTicks": 1580,
        "midi": 69,
        "name": "A4",
        "ticks": 29538,
        "time": 15.384375,
        "velocity": 0.8110236220472441
    },
    {
        "duration": 0.7963541666666654,
        "durationTicks": 1529,
        "midi": 72,
        "name": "C5",
        "ticks": 29538,
        "time": 15.384375,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.7906250000000004,
        "durationTicks": 1518,
        "midi": 57,
        "name": "A3",
        "ticks": 29538,
        "time": 15.384375,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.7317708333333321,
        "durationTicks": 1405,
        "midi": 64,
        "name": "E4",
        "ticks": 32000,
        "time": 16.666666666666668,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.747916666666665,
        "durationTicks": 1436,
        "midi": 67,
        "name": "G4",
        "ticks": 32000,
        "time": 16.666666666666668,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.7427083333333329,
        "durationTicks": 1426,
        "midi": 71,
        "name": "B4",
        "ticks": 32000,
        "time": 16.666666666666668,
        "velocity": 0.8740157480314961
    },
    {
        "duration": 0.7427083333333329,
        "durationTicks": 1426,
        "midi": 74,
        "name": "D5",
        "ticks": 32000,
        "time": 16.666666666666668,
        "velocity": 0.8661417322834646
    },
    {
        "duration": 0.8864583333333336,
        "durationTicks": 1702,
        "midi": 72,
        "name": "C5",
        "ticks": 34462,
        "time": 17.948958333333334,
        "velocity": 0.8346456692913385
    },
    {
        "duration": 0.6677083333333336,
        "durationTicks": 1282,
        "midi": 69,
        "name": "A4",
        "ticks": 34462,
        "time": 17.948958333333334,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.9229166666666657,
        "durationTicks": 3692,
        "midi": 57,
        "name": "A3",
        "ticks": 34462,
        "time": 17.948958333333334,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 2.0187500000000007,
        "durationTicks": 3876,
        "midi": 76,
        "name": "E5",
        "ticks": 34462,
        "time": 17.948958333333334,
        "velocity": 0.84251968503937
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

//recordingPart.playbackRate = 0.9;
// recordingPart.start("0:5:0");
// recordingPart.start("0:0:0");
recordingPart.start(0);

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
// recordingSecondPart.start("0:0:0");
// recordingSecondPart.start("4:0:0"); // little too early
// recordingSecondPart.start("4:4:0"); // decent
// recordingSecondPart.start("5:0:0"); // too late

// recordingSecondPart.playbackRate = 0.9;
// recordingSecondPart.start("0:0:0"); 
// recordingSecondPart.start("2:16:0"); // TODO: change to ticks or seconds

// recordingSecondPart.start(0);
recordingSecondPart.start(27.5);