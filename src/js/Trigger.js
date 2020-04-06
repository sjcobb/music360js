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

Store.polySynth.volume.value = -8; // v0.4, v0.5
// Store.polySynth.volume.value = -24;

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

        // console.log('Store.inputMidi: ', Store.inputMidi);
        if (Store.inputMidi === true) {

        } else {

        }
        // console.log('Trigger -> addBody - opts: ', obj.userData.opts);
        
        let triggerObj = {};
        let combinedNote = 'C1';
        if (obj.userData.opts.type !== 'drum') {
            combinedNote = obj.userData.opts.note ? (obj.userData.opts.note + obj.userData.opts.octave) : 'C4';
            // console.log({combinedNote});

            Store.dashboard.lastNote = combinedNote;

            Store.dashboard.allPlayedNotes.push(combinedNote);
            // Store.dashboard.allPlayedNotes.push(obj.userData.opts.note);
            // Store.dashboard.allPlayedOctaves.push(obj.userData.opts.octave);
            // // Store.dashboard.noteCountsDataset.source.note.push(obj.userData.opts.note);
            // // Store.dashboard.noteCountsDataset.source.octave.push(obj.userData.opts.octave);

            // const noteDatum = {

            // };
            // Store.dashboard.noteCounts.push(
            //     {
            //         note: obj.userData.opts.note,
            //         octave: obj.userData.opts.octave,
            //         count: 1
            //     }
            // )

            // if (Store.instr[obj.userData.opts.objName].count != null) {
            //     Store.instr[obj.userData.opts.objName].count++;
            // } else {
            //     Store.instr[obj.userData.opts.objName].count = 1;
            // }

            if (Store.dashboard.noteCountsObj[combinedNote] != null) {
                Store.dashboard.noteCountsObj[combinedNote].count++;
            } else {
                Store.dashboard.noteCountsObj[combinedNote] = {
                    note: obj.userData.opts.note,
                    octave: obj.userData.opts.octave,
                    count: 1,
                };
                // Store.dashboard.noteCountsObj[combinedNote].count = 1;
            }
            // console.log(Object.entries(Store.dashboard.noteCountsObj));
            // Store.dashboard.noteCountsArr = Object.entries(Store.dashboard.noteCountsObj);

            Store.dashboard.noteCountsArr = [];
            for (let key in Store.dashboard.noteCountsObj){
                // console.log({key});
                Store.dashboard.noteCountsArr.push(Store.dashboard.noteCountsObj[key]);
            }

            // https://stackoverflow.com/a/8900824/7639084
            Store.dashboard.noteCountsArr.sort(function(a, b) {
                // console.log(a, b);
                var textA = a.note.toUpperCase();
                var textB = b.note.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // console.log('triggerNote -> Store.dashboard.allPlayedNotes: ', Store.dashboard.allPlayedNotes);

            Store.dashboard.recentPlayedNotes.push(combinedNote);
            // console.log('triggerNote -> Store.dashboard.recentPlayedNotes: ', Store.dashboard.recentPlayedNotes);

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
        "duration": 1.0519483500000035,
        "durationTicks": 648,
        "midi": 45,
        "name": "A2",
        "ticks": 21120,
        "time": 34.285723999999995,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 21360,
        "time": 34.6753345,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 21360,
        "time": 34.6753345,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6298703083333308,
        "durationTicks": 388,
        "midi": 60,
        "name": "C4",
        "ticks": 21360,
        "time": 34.6753345,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.2727273500000038,
        "durationTicks": 168,
        "midi": 57,
        "name": "A3",
        "ticks": 21840,
        "time": 35.4545555,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25324682500000506,
        "durationTicks": 156,
        "midi": 60,
        "name": "C4",
        "ticks": 21840,
        "time": 35.4545555,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.25324682500000506,
        "durationTicks": 156,
        "midi": 64,
        "name": "E4",
        "ticks": 21840,
        "time": 35.4545555,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.4025975166666669,
        "durationTicks": 248,
        "midi": 40,
        "name": "E2",
        "ticks": 22080,
        "time": 35.844165999999994,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.25974033333333324,
        "durationTicks": 160,
        "midi": 52,
        "name": "E3",
        "ticks": 22320,
        "time": 36.2337765,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 22320,
        "time": 36.2337765,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3181819083333295,
        "durationTicks": 196,
        "midi": 59,
        "name": "B3",
        "ticks": 22320,
        "time": 36.2337765,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.4415585666666715,
        "durationTicks": 272,
        "midi": 43,
        "name": "G2",
        "ticks": 22560,
        "time": 36.623386999999994,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.279220858333332,
        "durationTicks": 172,
        "midi": 55,
        "name": "G3",
        "ticks": 22800,
        "time": 37.0129975,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3116884000000013,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 22800,
        "time": 37.0129975,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 22800,
        "time": 37.0129975,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.766234549999993,
        "durationTicks": 1704,
        "midi": 52,
        "name": "E3",
        "ticks": 23040,
        "time": 37.402608,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.811689108333333,
        "durationTicks": 1732,
        "midi": 45,
        "name": "A2",
        "ticks": 23040,
        "time": 37.402608,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.4415591333333353,
        "durationTicks": 1504,
        "midi": 57,
        "name": "A3",
        "ticks": 23280,
        "time": 37.7922185,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.4220786083333365,
        "durationTicks": 1492,
        "midi": 60,
        "name": "C4",
        "ticks": 23280,
        "time": 37.7922185,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.402598083333338,
        "durationTicks": 1480,
        "midi": 64,
        "name": "E4",
        "ticks": 23280,
        "time": 37.7922185,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.9740262499999943,
        "durationTicks": 600,
        "midi": 45,
        "name": "A2",
        "ticks": 24960,
        "time": 40.519492,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 25200,
        "time": 40.909102499999996,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5649352249999993,
        "durationTicks": 348,
        "midi": 64,
        "name": "E4",
        "ticks": 25200,
        "time": 40.909102499999996,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5649352249999993,
        "durationTicks": 348,
        "midi": 57,
        "name": "A3",
        "ticks": 25200,
        "time": 40.909102499999996,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22077928333333574,
        "durationTicks": 136,
        "midi": 57,
        "name": "A3",
        "ticks": 25680,
        "time": 41.688323499999996,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.20779226666666517,
        "durationTicks": 128,
        "midi": 60,
        "name": "C4",
        "ticks": 25680,
        "time": 41.688323499999996,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 64,
        "name": "E4",
        "ticks": 25680,
        "time": 41.688323499999996,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.37662348333333284,
        "durationTicks": 232,
        "midi": 40,
        "name": "E2",
        "ticks": 25920,
        "time": 42.077934,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.1623377083333395,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 26160,
        "time": 42.467544499999995,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.18181823333333824,
        "durationTicks": 112,
        "midi": 55,
        "name": "G3",
        "ticks": 26160,
        "time": 42.467544499999995,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 26160,
        "time": 42.467544499999995,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3896104999999963,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 26400,
        "time": 42.857155,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22077928333333574,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 26640,
        "time": 43.246765499999995,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.25324682500000506,
        "durationTicks": 156,
        "midi": 62,
        "name": "D4",
        "ticks": 26640,
        "time": 43.246765499999995,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.2337662999999992,
        "durationTicks": 144,
        "midi": 59,
        "name": "B3",
        "ticks": 26640,
        "time": 43.246765499999995,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 2.4480526416666635,
        "durationTicks": 1508,
        "midi": 52,
        "name": "E3",
        "ticks": 26880,
        "time": 43.636376,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 45,
        "name": "A2",
        "ticks": 26880,
        "time": 43.636376,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 2.1688317833333315,
        "durationTicks": 1336,
        "midi": 57,
        "name": "A3",
        "ticks": 27120,
        "time": 44.025986499999995,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.1753252916666668,
        "durationTicks": 1340,
        "midi": 60,
        "name": "C4",
        "ticks": 27120,
        "time": 44.025986499999995,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.201299325000001,
        "durationTicks": 1356,
        "midi": 64,
        "name": "E4",
        "ticks": 27120,
        "time": 44.025986499999995,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.785715074999999,
        "durationTicks": 1716,
        "midi": 52,
        "name": "E3",
        "ticks": 28800,
        "time": 46.75326,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 2.759741041666665,
        "durationTicks": 1700,
        "midi": 59,
        "name": "B3",
        "ticks": 28800,
        "time": 46.75326,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.48701312500000427,
        "durationTicks": 300,
        "midi": 62,
        "name": "D4",
        "ticks": 29040,
        "time": 47.142870499999994,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.4675326000000055,
        "durationTicks": 288,
        "midi": 67,
        "name": "G4",
        "ticks": 29040,
        "time": 47.142870499999994,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666686,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 29520,
        "time": 47.92209149999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666686,
        "durationTicks": 368,
        "midi": 62,
        "name": "D4",
        "ticks": 29520,
        "time": 47.92209149999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 67,
        "name": "G4",
        "ticks": 30000,
        "time": 48.70131249999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 30000,
        "time": 48.70131249999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.14935069166667603,
        "durationTicks": 92,
        "midi": 62,
        "name": "D4",
        "ticks": 30480,
        "time": 49.48053349999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 67,
        "name": "G4",
        "ticks": 30480,
        "time": 49.48053349999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.590909825000004,
        "durationTicks": 1596,
        "midi": 57,
        "name": "A3",
        "ticks": 30720,
        "time": 49.870143999999996,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.6298708750000017,
        "durationTicks": 1620,
        "midi": 50,
        "name": "D3",
        "ticks": 30720,
        "time": 49.870143999999996,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.5454547000000005,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 30960,
        "time": 50.2597545,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5714287333333274,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 30960,
        "time": 50.2597545,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.6688313583333283,
        "durationTicks": 412,
        "midi": 65,
        "name": "F4",
        "ticks": 31440,
        "time": 51.0389755,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.6688313583333283,
        "durationTicks": 412,
        "midi": 60,
        "name": "C4",
        "ticks": 31440,
        "time": 51.0389755,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.636363816666659,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 31920,
        "time": 51.8181965,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.6298703083333308,
        "durationTicks": 388,
        "midi": 65,
        "name": "F4",
        "ticks": 31920,
        "time": 51.8181965,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.1558441999999971,
        "durationTicks": 96,
        "midi": 60,
        "name": "C4",
        "ticks": 32400,
        "time": 52.5974175,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 65,
        "name": "F4",
        "ticks": 32400,
        "time": 52.5974175,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.9545457249999956,
        "durationTicks": 588,
        "midi": 45,
        "name": "A2",
        "ticks": 32640,
        "time": 52.987027999999995,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 32880,
        "time": 53.3766385,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 57,
        "name": "A3",
        "ticks": 32880,
        "time": 53.3766385,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 32880,
        "time": 53.3766385,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 60,
        "name": "C4",
        "ticks": 33360,
        "time": 54.1558595,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.16233770833332528,
        "durationTicks": 100,
        "midi": 57,
        "name": "A3",
        "ticks": 33360,
        "time": 54.1558595,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.14285718333333364,
        "durationTicks": 88,
        "midi": 64,
        "name": "E4",
        "ticks": 33360,
        "time": 54.1558595,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 40,
        "name": "E2",
        "ticks": 33600,
        "time": 54.545469999999995,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.16233770833332528,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 33840,
        "time": 54.9350805,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20779226666666517,
        "durationTicks": 128,
        "midi": 59,
        "name": "B3",
        "ticks": 33840,
        "time": 54.9350805,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.1948052499999946,
        "durationTicks": 120,
        "midi": 55,
        "name": "G3",
        "ticks": 33840,
        "time": 54.9350805,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 34080,
        "time": 55.324690999999994,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.18831174166665932,
        "durationTicks": 116,
        "midi": 62,
        "name": "D4",
        "ticks": 34320,
        "time": 55.7143015,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 34320,
        "time": 55.7143015,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.18831174166665932,
        "durationTicks": 116,
        "midi": 59,
        "name": "B3",
        "ticks": 34320,
        "time": 55.7143015,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 9.928574241666666,
        "durationTicks": 6116,
        "midi": 60,
        "name": "C4",
        "ticks": 34560,
        "time": 56.103911999999994,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 8.99350904166667,
        "durationTicks": 5540,
        "midi": 52,
        "name": "E3",
        "ticks": 34560,
        "time": 56.103911999999994,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 10.220782116666669,
        "durationTicks": 6296,
        "midi": 64,
        "name": "E4",
        "ticks": 34560,
        "time": 56.103911999999994,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 9.779223549999998,
        "durationTicks": 6024,
        "midi": 57,
        "name": "A3",
        "ticks": 34560,
        "time": 56.103911999999994,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 10.56493805833334,
        "durationTicks": 6508,
        "midi": 45,
        "name": "A2",
        "ticks": 34560,
        "time": 56.103911999999994,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.889610641666664,
        "durationTicks": 548,
        "midi": 52,
        "name": "E3",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9805197583333296,
        "durationTicks": 604,
        "midi": 45,
        "name": "A2",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.0129872999999918,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.019480808333327,
        "durationTicks": 628,
        "midi": 60,
        "name": "C4",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 1.0584418583333246,
        "durationTicks": 652,
        "midi": 57,
        "name": "A3",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3636364666666623,
        "durationTicks": 224,
        "midi": 40,
        "name": "E2",
        "ticks": 48960,
        "time": 79.480542,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 52,
        "name": "E3",
        "ticks": 49200,
        "time": 79.87015249999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 49200,
        "time": 79.87015249999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 59,
        "name": "B3",
        "ticks": 49200,
        "time": 79.87015249999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.45454558333332784,
        "durationTicks": 280,
        "midi": 43,
        "name": "G2",
        "ticks": 49440,
        "time": 80.25976299999999,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 49680,
        "time": 80.6493735,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 49680,
        "time": 80.6493735,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22727279166666392,
        "durationTicks": 140,
        "midi": 62,
        "name": "D4",
        "ticks": 49680,
        "time": 80.6493735,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.2467538833333265,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 49920,
        "time": 81.038984,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.0519483499999893,
        "durationTicks": 648,
        "midi": 45,
        "name": "A2",
        "ticks": 51840,
        "time": 84.155868,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 52080,
        "time": 84.54547849999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 52080,
        "time": 84.54547849999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6298703083333379,
        "durationTicks": 388,
        "midi": 60,
        "name": "C4",
        "ticks": 52080,
        "time": 84.54547849999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 57,
        "name": "A3",
        "ticks": 52560,
        "time": 85.3246995,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25324682500000506,
        "durationTicks": 156,
        "midi": 60,
        "name": "C4",
        "ticks": 52560,
        "time": 85.3246995,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.25324682500000506,
        "durationTicks": 156,
        "midi": 64,
        "name": "E4",
        "ticks": 52560,
        "time": 85.3246995,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.40259751666665977,
        "durationTicks": 248,
        "midi": 40,
        "name": "E2",
        "ticks": 52800,
        "time": 85.71431,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.25974033333334035,
        "durationTicks": 160,
        "midi": 52,
        "name": "E3",
        "ticks": 53040,
        "time": 86.10392049999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 53040,
        "time": 86.10392049999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3181819083333437,
        "durationTicks": 196,
        "midi": 59,
        "name": "B3",
        "ticks": 53040,
        "time": 86.10392049999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.4415585666666715,
        "durationTicks": 272,
        "midi": 43,
        "name": "G2",
        "ticks": 53280,
        "time": 86.49353099999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.279220858333332,
        "durationTicks": 172,
        "midi": 55,
        "name": "G3",
        "ticks": 53520,
        "time": 86.8831415,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 53520,
        "time": 86.8831415,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 53520,
        "time": 86.8831415,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.4480526416666635,
        "durationTicks": 1508,
        "midi": 52,
        "name": "E3",
        "ticks": 53760,
        "time": 87.272752,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 45,
        "name": "A2",
        "ticks": 53760,
        "time": 87.272752,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 2.1688317833333315,
        "durationTicks": 1336,
        "midi": 57,
        "name": "A3",
        "ticks": 54000,
        "time": 87.6623625,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.1753252916666668,
        "durationTicks": 1340,
        "midi": 60,
        "name": "C4",
        "ticks": 54000,
        "time": 87.6623625,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.2012993249999937,
        "durationTicks": 1356,
        "midi": 64,
        "name": "E4",
        "ticks": 54000,
        "time": 87.6623625,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.785715074999999,
        "durationTicks": 1716,
        "midi": 52,
        "name": "E3",
        "ticks": 55680,
        "time": 90.389636,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 2.759741041666672,
        "durationTicks": 1700,
        "midi": 59,
        "name": "B3",
        "ticks": 55680,
        "time": 90.389636,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.48701312499999005,
        "durationTicks": 300,
        "midi": 62,
        "name": "D4",
        "ticks": 55920,
        "time": 90.7792465,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.4675325999999842,
        "durationTicks": 288,
        "midi": 67,
        "name": "G4",
        "ticks": 55920,
        "time": 90.7792465,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 56400,
        "time": 91.55846749999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 62,
        "name": "D4",
        "ticks": 56400,
        "time": 91.55846749999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 67,
        "name": "G4",
        "ticks": 56880,
        "time": 92.3376885,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 56880,
        "time": 92.3376885,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.14935069166666892,
        "durationTicks": 92,
        "midi": 62,
        "name": "D4",
        "ticks": 57360,
        "time": 93.11690949999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 67,
        "name": "G4",
        "ticks": 57360,
        "time": 93.11690949999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.590909824999997,
        "durationTicks": 1596,
        "midi": 57,
        "name": "A3",
        "ticks": 57600,
        "time": 93.50652,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.6298708749999946,
        "durationTicks": 1620,
        "midi": 50,
        "name": "D3",
        "ticks": 57600,
        "time": 93.50652,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.5454546999999934,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 57840,
        "time": 93.8961305,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 57840,
        "time": 93.8961305,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.6688313583333354,
        "durationTicks": 412,
        "midi": 65,
        "name": "F4",
        "ticks": 58320,
        "time": 94.67535149999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.6688313583333354,
        "durationTicks": 412,
        "midi": 60,
        "name": "C4",
        "ticks": 58320,
        "time": 94.67535149999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.636363816666659,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 58800,
        "time": 95.4545725,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.6298703083333379,
        "durationTicks": 388,
        "midi": 65,
        "name": "F4",
        "ticks": 58800,
        "time": 95.4545725,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.1558442000000042,
        "durationTicks": 96,
        "midi": 60,
        "name": "C4",
        "ticks": 59280,
        "time": 96.23379349999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 65,
        "name": "F4",
        "ticks": 59280,
        "time": 96.23379349999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.9545457249999885,
        "durationTicks": 588,
        "midi": 45,
        "name": "A2",
        "ticks": 59520,
        "time": 96.623404,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 59760,
        "time": 97.0130145,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 57,
        "name": "A3",
        "ticks": 59760,
        "time": 97.0130145,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 59760,
        "time": 97.0130145,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 60,
        "name": "C4",
        "ticks": 60240,
        "time": 97.79223549999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.1623377083333395,
        "durationTicks": 100,
        "midi": 57,
        "name": "A3",
        "ticks": 60240,
        "time": 97.79223549999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.14285718333333364,
        "durationTicks": 88,
        "midi": 64,
        "name": "E4",
        "ticks": 60240,
        "time": 97.79223549999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 40,
        "name": "E2",
        "ticks": 60480,
        "time": 98.181846,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.16233770833332528,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 60720,
        "time": 98.5714565,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20779226666665807,
        "durationTicks": 128,
        "midi": 59,
        "name": "B3",
        "ticks": 60720,
        "time": 98.5714565,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.1948052500000017,
        "durationTicks": 120,
        "midi": 55,
        "name": "G3",
        "ticks": 60720,
        "time": 98.5714565,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 60960,
        "time": 98.96106699999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.18831174166666642,
        "durationTicks": 116,
        "midi": 62,
        "name": "D4",
        "ticks": 61200,
        "time": 99.35067749999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 61200,
        "time": 99.35067749999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.18831174166666642,
        "durationTicks": 116,
        "midi": 59,
        "name": "B3",
        "ticks": 61200,
        "time": 99.35067749999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.2467538833333265,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 61440,
        "time": 99.74028799999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.0519483499999893,
        "durationTicks": 648,
        "midi": 45,
        "name": "A2",
        "ticks": 63360,
        "time": 102.85717199999999,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 63600,
        "time": 103.2467825,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 63600,
        "time": 103.2467825,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6298703083333379,
        "durationTicks": 388,
        "midi": 60,
        "name": "C4",
        "ticks": 63600,
        "time": 103.2467825,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 57,
        "name": "A3",
        "ticks": 64080,
        "time": 104.02600349999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25324682499999085,
        "durationTicks": 156,
        "midi": 60,
        "name": "C4",
        "ticks": 64080,
        "time": 104.02600349999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.25324682499999085,
        "durationTicks": 156,
        "midi": 64,
        "name": "E4",
        "ticks": 64080,
        "time": 104.02600349999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.402597516666674,
        "durationTicks": 248,
        "midi": 40,
        "name": "E2",
        "ticks": 64320,
        "time": 104.41561399999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.25974033333334035,
        "durationTicks": 160,
        "midi": 52,
        "name": "E3",
        "ticks": 64560,
        "time": 104.8052245,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 64560,
        "time": 104.8052245,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3181819083333295,
        "durationTicks": 196,
        "midi": 59,
        "name": "B3",
        "ticks": 64560,
        "time": 104.8052245,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.44155856666665727,
        "durationTicks": 272,
        "midi": 43,
        "name": "G2",
        "ticks": 64800,
        "time": 105.194835,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.279220858333332,
        "durationTicks": 172,
        "midi": 55,
        "name": "G3",
        "ticks": 65040,
        "time": 105.58444549999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 65040,
        "time": 105.58444549999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 65040,
        "time": 105.58444549999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.766234550000007,
        "durationTicks": 1704,
        "midi": 52,
        "name": "E3",
        "ticks": 65280,
        "time": 105.97405599999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.8116891083333257,
        "durationTicks": 1732,
        "midi": 45,
        "name": "A2",
        "ticks": 65280,
        "time": 105.97405599999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 57,
        "name": "A3",
        "ticks": 65520,
        "time": 106.3636665,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.4220786083333223,
        "durationTicks": 1492,
        "midi": 60,
        "name": "C4",
        "ticks": 65520,
        "time": 106.3636665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.402598083333345,
        "durationTicks": 1480,
        "midi": 64,
        "name": "E4",
        "ticks": 65520,
        "time": 106.3636665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.9740262500000085,
        "durationTicks": 600,
        "midi": 45,
        "name": "A2",
        "ticks": 67200,
        "time": 109.09093999999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 67440,
        "time": 109.48055049999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5649352249999993,
        "durationTicks": 348,
        "midi": 64,
        "name": "E4",
        "ticks": 67440,
        "time": 109.48055049999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5649352249999993,
        "durationTicks": 348,
        "midi": 57,
        "name": "A3",
        "ticks": 67440,
        "time": 109.48055049999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 57,
        "name": "A3",
        "ticks": 67920,
        "time": 110.25977149999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.2077922666666865,
        "durationTicks": 128,
        "midi": 60,
        "name": "C4",
        "ticks": 67920,
        "time": 110.25977149999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 64,
        "name": "E4",
        "ticks": 67920,
        "time": 110.25977149999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.37662348333333284,
        "durationTicks": 232,
        "midi": 40,
        "name": "E2",
        "ticks": 68160,
        "time": 110.64938199999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.1623377083333395,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 68400,
        "time": 111.03899249999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.18181823333331693,
        "durationTicks": 112,
        "midi": 55,
        "name": "G3",
        "ticks": 68400,
        "time": 111.03899249999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.20129875833332278,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 68400,
        "time": 111.03899249999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3896104999999892,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 68640,
        "time": 111.428603,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 68880,
        "time": 111.81821349999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.25324682500000506,
        "durationTicks": 156,
        "midi": 62,
        "name": "D4",
        "ticks": 68880,
        "time": 111.81821349999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.23376630000001342,
        "durationTicks": 144,
        "midi": 59,
        "name": "B3",
        "ticks": 68880,
        "time": 111.81821349999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 2.4480526416666777,
        "durationTicks": 1508,
        "midi": 52,
        "name": "E3",
        "ticks": 69120,
        "time": 112.20782399999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 45,
        "name": "A2",
        "ticks": 69120,
        "time": 112.20782399999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 2.1688317833333315,
        "durationTicks": 1336,
        "midi": 57,
        "name": "A3",
        "ticks": 69360,
        "time": 112.59743449999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.1753252916666526,
        "durationTicks": 1340,
        "midi": 60,
        "name": "C4",
        "ticks": 69360,
        "time": 112.59743449999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.2012993249999937,
        "durationTicks": 1356,
        "midi": 64,
        "name": "E4",
        "ticks": 69360,
        "time": 112.59743449999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.785715074999999,
        "durationTicks": 1716,
        "midi": 52,
        "name": "E3",
        "ticks": 71040,
        "time": 115.32470799999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 2.7597410416666577,
        "durationTicks": 1700,
        "midi": 59,
        "name": "B3",
        "ticks": 71040,
        "time": 115.32470799999999,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.48701312500000427,
        "durationTicks": 300,
        "midi": 62,
        "name": "D4",
        "ticks": 71280,
        "time": 115.71431849999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 67,
        "name": "G4",
        "ticks": 71280,
        "time": 115.71431849999999,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 71760,
        "time": 116.4935395,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 62,
        "name": "D4",
        "ticks": 71760,
        "time": 116.4935395,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 67,
        "name": "G4",
        "ticks": 72240,
        "time": 117.27276049999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 72240,
        "time": 117.27276049999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.1493506916666547,
        "durationTicks": 92,
        "midi": 62,
        "name": "D4",
        "ticks": 72720,
        "time": 118.0519815,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 67,
        "name": "G4",
        "ticks": 72720,
        "time": 118.0519815,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.590909824999997,
        "durationTicks": 1596,
        "midi": 57,
        "name": "A3",
        "ticks": 72960,
        "time": 118.44159199999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.629870875000009,
        "durationTicks": 1620,
        "midi": 50,
        "name": "D3",
        "ticks": 72960,
        "time": 118.44159199999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.5454546999999934,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 73200,
        "time": 118.83120249999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5714287333333203,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 73200,
        "time": 118.83120249999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.6688313583333212,
        "durationTicks": 412,
        "midi": 65,
        "name": "F4",
        "ticks": 73680,
        "time": 119.6104235,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.6688313583333212,
        "durationTicks": 412,
        "midi": 60,
        "name": "C4",
        "ticks": 73680,
        "time": 119.6104235,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.636363816666659,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 74160,
        "time": 120.38964449999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.6298703083333379,
        "durationTicks": 388,
        "midi": 65,
        "name": "F4",
        "ticks": 74160,
        "time": 120.38964449999999,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.15584419999999,
        "durationTicks": 96,
        "midi": 60,
        "name": "C4",
        "ticks": 74640,
        "time": 121.1688655,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 65,
        "name": "F4",
        "ticks": 74640,
        "time": 121.1688655,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.9545457250000027,
        "durationTicks": 588,
        "midi": 45,
        "name": "A2",
        "ticks": 74880,
        "time": 121.55847599999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 75120,
        "time": 121.94808649999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 57,
        "name": "A3",
        "ticks": 75120,
        "time": 121.94808649999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 75120,
        "time": 121.94808649999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499999835,
        "durationTicks": 84,
        "midi": 60,
        "name": "C4",
        "ticks": 75600,
        "time": 122.7273075,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.1623377083333395,
        "durationTicks": 100,
        "midi": 57,
        "name": "A3",
        "ticks": 75600,
        "time": 122.7273075,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.14285718333333364,
        "durationTicks": 88,
        "midi": 64,
        "name": "E4",
        "ticks": 75600,
        "time": 122.7273075,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 40,
        "name": "E2",
        "ticks": 75840,
        "time": 123.11691799999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.1623377083333395,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 76080,
        "time": 123.50652849999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2077922666666865,
        "durationTicks": 128,
        "midi": 59,
        "name": "B3",
        "ticks": 76080,
        "time": 123.50652849999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.1948052500000017,
        "durationTicks": 120,
        "midi": 55,
        "name": "G3",
        "ticks": 76080,
        "time": 123.50652849999999,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 76320,
        "time": 123.89613899999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.18831174166666642,
        "durationTicks": 116,
        "midi": 62,
        "name": "D4",
        "ticks": 76560,
        "time": 124.2857495,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 76560,
        "time": 124.2857495,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.18831174166666642,
        "durationTicks": 116,
        "midi": 59,
        "name": "B3",
        "ticks": 76560,
        "time": 124.2857495,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.2467538833333407,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 76800,
        "time": 124.67535999999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.0519483499999893,
        "durationTicks": 648,
        "midi": 45,
        "name": "A2",
        "ticks": 78720,
        "time": 127.792244,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 78960,
        "time": 128.1818545,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 78960,
        "time": 128.1818545,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6298703083333521,
        "durationTicks": 388,
        "midi": 60,
        "name": "C4",
        "ticks": 78960,
        "time": 128.1818545,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 57,
        "name": "A3",
        "ticks": 79440,
        "time": 128.9610755,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25324682499999085,
        "durationTicks": 156,
        "midi": 60,
        "name": "C4",
        "ticks": 79440,
        "time": 128.9610755,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.25324682499999085,
        "durationTicks": 156,
        "midi": 64,
        "name": "E4",
        "ticks": 79440,
        "time": 128.9610755,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.402597516666674,
        "durationTicks": 248,
        "midi": 40,
        "name": "E2",
        "ticks": 79680,
        "time": 129.350686,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.25974033333332613,
        "durationTicks": 160,
        "midi": 52,
        "name": "E3",
        "ticks": 79920,
        "time": 129.7402965,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 79920,
        "time": 129.7402965,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3181819083333153,
        "durationTicks": 196,
        "midi": 59,
        "name": "B3",
        "ticks": 79920,
        "time": 129.7402965,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.44155856666665727,
        "durationTicks": 272,
        "midi": 43,
        "name": "G2",
        "ticks": 80160,
        "time": 130.129907,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.279220858333332,
        "durationTicks": 172,
        "midi": 55,
        "name": "G3",
        "ticks": 80400,
        "time": 130.51951749999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 80400,
        "time": 130.51951749999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.324675416666679,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 80400,
        "time": 130.51951749999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.766234550000007,
        "durationTicks": 1704,
        "midi": 52,
        "name": "E3",
        "ticks": 80640,
        "time": 130.90912799999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.8116891083333257,
        "durationTicks": 1732,
        "midi": 45,
        "name": "A2",
        "ticks": 80640,
        "time": 130.90912799999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 57,
        "name": "A3",
        "ticks": 80880,
        "time": 131.29873849999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.4220786083333223,
        "durationTicks": 1492,
        "midi": 60,
        "name": "C4",
        "ticks": 80880,
        "time": 131.29873849999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.402598083333345,
        "durationTicks": 1480,
        "midi": 64,
        "name": "E4",
        "ticks": 80880,
        "time": 131.29873849999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.9740262500000085,
        "durationTicks": 600,
        "midi": 45,
        "name": "A2",
        "ticks": 82560,
        "time": 134.02601199999998,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 82800,
        "time": 134.41562249999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5649352249999993,
        "durationTicks": 348,
        "midi": 64,
        "name": "E4",
        "ticks": 82800,
        "time": 134.41562249999998,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5649352249999993,
        "durationTicks": 348,
        "midi": 57,
        "name": "A3",
        "ticks": 82800,
        "time": 134.41562249999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 57,
        "name": "A3",
        "ticks": 83280,
        "time": 135.1948435,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.20779226666667228,
        "durationTicks": 128,
        "midi": 60,
        "name": "C4",
        "ticks": 83280,
        "time": 135.1948435,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 64,
        "name": "E4",
        "ticks": 83280,
        "time": 135.1948435,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.37662348333333284,
        "durationTicks": 232,
        "midi": 40,
        "name": "E2",
        "ticks": 83520,
        "time": 135.584454,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.16233770833332528,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 83760,
        "time": 135.9740645,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.18181823333330271,
        "durationTicks": 112,
        "midi": 55,
        "name": "G3",
        "ticks": 83760,
        "time": 135.9740645,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.20129875833330857,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 83760,
        "time": 135.9740645,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.389610499999975,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 84000,
        "time": 136.363675,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 84240,
        "time": 136.75328549999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.25324682500001927,
        "durationTicks": 156,
        "midi": 62,
        "name": "D4",
        "ticks": 84240,
        "time": 136.75328549999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.23376630000001342,
        "durationTicks": 144,
        "midi": 59,
        "name": "B3",
        "ticks": 84240,
        "time": 136.75328549999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 2.448052641666692,
        "durationTicks": 1508,
        "midi": 52,
        "name": "E3",
        "ticks": 84480,
        "time": 137.14289599999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 45,
        "name": "A2",
        "ticks": 84480,
        "time": 137.14289599999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 2.1688317833333315,
        "durationTicks": 1336,
        "midi": 57,
        "name": "A3",
        "ticks": 84720,
        "time": 137.53250649999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.1753252916666668,
        "durationTicks": 1340,
        "midi": 60,
        "name": "C4",
        "ticks": 84720,
        "time": 137.53250649999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.201299325000008,
        "durationTicks": 1356,
        "midi": 64,
        "name": "E4",
        "ticks": 84720,
        "time": 137.53250649999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.785715075000013,
        "durationTicks": 1716,
        "midi": 52,
        "name": "E3",
        "ticks": 86400,
        "time": 140.25977999999998,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 2.759741041666672,
        "durationTicks": 1700,
        "midi": 59,
        "name": "B3",
        "ticks": 86400,
        "time": 140.25977999999998,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.48701312500000427,
        "durationTicks": 300,
        "midi": 62,
        "name": "D4",
        "ticks": 86640,
        "time": 140.64939049999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 67,
        "name": "G4",
        "ticks": 86640,
        "time": 140.64939049999998,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 87120,
        "time": 141.4286115,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 62,
        "name": "D4",
        "ticks": 87120,
        "time": 141.4286115,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.6103897833333178,
        "durationTicks": 376,
        "midi": 67,
        "name": "G4",
        "ticks": 87600,
        "time": 142.2078325,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.6103897833333178,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 87600,
        "time": 142.2078325,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.1493506916666547,
        "durationTicks": 92,
        "midi": 62,
        "name": "D4",
        "ticks": 88080,
        "time": 142.9870535,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13636367499998414,
        "durationTicks": 84,
        "midi": 67,
        "name": "G4",
        "ticks": 88080,
        "time": 142.9870535,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.5909098250000113,
        "durationTicks": 1596,
        "midi": 57,
        "name": "A3",
        "ticks": 88320,
        "time": 143.37666399999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.629870875000023,
        "durationTicks": 1620,
        "midi": 50,
        "name": "D3",
        "ticks": 88320,
        "time": 143.37666399999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.5454546999999934,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 88560,
        "time": 143.76627449999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 88560,
        "time": 143.76627449999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.6688313583333354,
        "durationTicks": 412,
        "midi": 65,
        "name": "F4",
        "ticks": 89040,
        "time": 144.5454955,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.6688313583333354,
        "durationTicks": 412,
        "midi": 60,
        "name": "C4",
        "ticks": 89040,
        "time": 144.5454955,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.636363816666659,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 89520,
        "time": 145.3247165,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.6298703083333237,
        "durationTicks": 388,
        "midi": 65,
        "name": "F4",
        "ticks": 89520,
        "time": 145.3247165,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.15584419999999,
        "durationTicks": 96,
        "midi": 60,
        "name": "C4",
        "ticks": 90000,
        "time": 146.1039375,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367499998414,
        "durationTicks": 84,
        "midi": 65,
        "name": "F4",
        "ticks": 90000,
        "time": 146.1039375,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.9545457250000027,
        "durationTicks": 588,
        "midi": 45,
        "name": "A2",
        "ticks": 90240,
        "time": 146.49354799999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 90480,
        "time": 146.88315849999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 57,
        "name": "A3",
        "ticks": 90480,
        "time": 146.88315849999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 90480,
        "time": 146.88315849999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367500001256,
        "durationTicks": 84,
        "midi": 60,
        "name": "C4",
        "ticks": 90960,
        "time": 147.6623795,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.1623377083333537,
        "durationTicks": 100,
        "midi": 57,
        "name": "A3",
        "ticks": 90960,
        "time": 147.6623795,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.14285718333334785,
        "durationTicks": 88,
        "midi": 64,
        "name": "E4",
        "ticks": 90960,
        "time": 147.6623795,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 40,
        "name": "E2",
        "ticks": 91200,
        "time": 148.05199,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.16233770833332528,
        "durationTicks": 100,
        "midi": 52,
        "name": "E3",
        "ticks": 91440,
        "time": 148.4416005,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.20779226666667228,
        "durationTicks": 128,
        "midi": 59,
        "name": "B3",
        "ticks": 91440,
        "time": 148.4416005,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.1948052500000017,
        "durationTicks": 120,
        "midi": 55,
        "name": "G3",
        "ticks": 91440,
        "time": 148.4416005,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 43,
        "name": "G2",
        "ticks": 91680,
        "time": 148.831211,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.18831174166666642,
        "durationTicks": 116,
        "midi": 62,
        "name": "D4",
        "ticks": 91920,
        "time": 149.2208215,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 91920,
        "time": 149.2208215,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.18831174166666642,
        "durationTicks": 116,
        "midi": 59,
        "name": "B3",
        "ticks": 91920,
        "time": 149.2208215,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 9.928574241666666,
        "durationTicks": 6116,
        "midi": 60,
        "name": "C4",
        "ticks": 92160,
        "time": 149.610432,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 8.993509041666641,
        "durationTicks": 5540,
        "midi": 52,
        "name": "E3",
        "ticks": 92160,
        "time": 149.610432,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 10.220782116666669,
        "durationTicks": 6296,
        "midi": 64,
        "name": "E4",
        "ticks": 92160,
        "time": 149.610432,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 9.779223549999983,
        "durationTicks": 6024,
        "midi": 57,
        "name": "A3",
        "ticks": 92160,
        "time": 149.610432,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 10.564938058333325,
        "durationTicks": 6508,
        "midi": 45,
        "name": "A2",
        "ticks": 92160,
        "time": 149.610432,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.8896106416666782,
        "durationTicks": 548,
        "midi": 52,
        "name": "E3",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9805197583333154,
        "durationTicks": 604,
        "midi": 45,
        "name": "A2",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.0129872999999918,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.019480808333327,
        "durationTicks": 628,
        "midi": 60,
        "name": "C4",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 1.0584418583333104,
        "durationTicks": 652,
        "midi": 57,
        "name": "A3",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3636364666666623,
        "durationTicks": 224,
        "midi": 40,
        "name": "E2",
        "ticks": 106560,
        "time": 172.98706199999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 52,
        "name": "E3",
        "ticks": 106800,
        "time": 173.37667249999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 106800,
        "time": 173.37667249999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 59,
        "name": "B3",
        "ticks": 106800,
        "time": 173.37667249999998,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.45454558333332784,
        "durationTicks": 280,
        "midi": 43,
        "name": "G2",
        "ticks": 107040,
        "time": 173.766283,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 107280,
        "time": 174.1558935,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 107280,
        "time": 174.1558935,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.2272727916666497,
        "durationTicks": 140,
        "midi": 62,
        "name": "D4",
        "ticks": 107280,
        "time": 174.1558935,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.2467538833333265,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 107520,
        "time": 174.545504,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 1.051948349999975,
        "durationTicks": 648,
        "midi": 45,
        "name": "A2",
        "ticks": 109440,
        "time": 177.662388,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.6103897833333178,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 109680,
        "time": 178.0519985,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.6103897833333178,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 109680,
        "time": 178.0519985,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.6298703083333237,
        "durationTicks": 388,
        "midi": 60,
        "name": "C4",
        "ticks": 109680,
        "time": 178.0519985,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 57,
        "name": "A3",
        "ticks": 110160,
        "time": 178.83121949999997,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.25324682499999085,
        "durationTicks": 156,
        "midi": 60,
        "name": "C4",
        "ticks": 110160,
        "time": 178.83121949999997,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.25324682499999085,
        "durationTicks": 156,
        "midi": 64,
        "name": "E4",
        "ticks": 110160,
        "time": 178.83121949999997,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.402597516666674,
        "durationTicks": 248,
        "midi": 40,
        "name": "E2",
        "ticks": 110400,
        "time": 179.22082999999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.25974033333335456,
        "durationTicks": 160,
        "midi": 52,
        "name": "E3",
        "ticks": 110640,
        "time": 179.61044049999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 110640,
        "time": 179.61044049999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.3181819083333437,
        "durationTicks": 196,
        "midi": 59,
        "name": "B3",
        "ticks": 110640,
        "time": 179.61044049999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.44155856666665727,
        "durationTicks": 272,
        "midi": 43,
        "name": "G2",
        "ticks": 110880,
        "time": 180.00005099999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.279220858333332,
        "durationTicks": 172,
        "midi": 55,
        "name": "G3",
        "ticks": 111120,
        "time": 180.3896615,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 111120,
        "time": 180.3896615,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 111120,
        "time": 180.3896615,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.4480526416666635,
        "durationTicks": 1508,
        "midi": 52,
        "name": "E3",
        "ticks": 111360,
        "time": 180.779272,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.441559133333328,
        "durationTicks": 1504,
        "midi": 45,
        "name": "A2",
        "ticks": 111360,
        "time": 180.779272,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 2.1688317833333315,
        "durationTicks": 1336,
        "midi": 57,
        "name": "A3",
        "ticks": 111600,
        "time": 181.1688825,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 2.1753252916666383,
        "durationTicks": 1340,
        "midi": 60,
        "name": "C4",
        "ticks": 111600,
        "time": 181.1688825,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.2012993249999795,
        "durationTicks": 1356,
        "midi": 64,
        "name": "E4",
        "ticks": 111600,
        "time": 181.1688825,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 2.7857150749999846,
        "durationTicks": 1716,
        "midi": 52,
        "name": "E3",
        "ticks": 113280,
        "time": 183.896156,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 2.7597410416666435,
        "durationTicks": 1700,
        "midi": 59,
        "name": "B3",
        "ticks": 113280,
        "time": 183.896156,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.48701312500000427,
        "durationTicks": 300,
        "midi": 62,
        "name": "D4",
        "ticks": 113520,
        "time": 184.2857665,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 67,
        "name": "G4",
        "ticks": 113520,
        "time": 184.2857665,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666667041,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 114000,
        "time": 185.06498749999997,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.5974027666667041,
        "durationTicks": 368,
        "midi": 62,
        "name": "D4",
        "ticks": 114000,
        "time": 185.06498749999997,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 67,
        "name": "G4",
        "ticks": 114480,
        "time": 185.84420849999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 114480,
        "time": 185.84420849999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.1493506916666547,
        "durationTicks": 92,
        "midi": 62,
        "name": "D4",
        "ticks": 114960,
        "time": 186.6234295,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13636367500001256,
        "durationTicks": 84,
        "midi": 67,
        "name": "G4",
        "ticks": 114960,
        "time": 186.6234295,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.590909824999983,
        "durationTicks": 1596,
        "midi": 57,
        "name": "A3",
        "ticks": 115200,
        "time": 187.01304,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.6298708749999946,
        "durationTicks": 1620,
        "midi": 50,
        "name": "D3",
        "ticks": 115200,
        "time": 187.01304,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.5454546999999934,
        "durationTicks": 336,
        "midi": 60,
        "name": "C4",
        "ticks": 115440,
        "time": 187.4026505,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 115440,
        "time": 187.4026505,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.668831358333307,
        "durationTicks": 412,
        "midi": 65,
        "name": "F4",
        "ticks": 115920,
        "time": 188.1818715,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.668831358333307,
        "durationTicks": 412,
        "midi": 60,
        "name": "C4",
        "ticks": 115920,
        "time": 188.1818715,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.636363816666659,
        "durationTicks": 392,
        "midi": 60,
        "name": "C4",
        "ticks": 116400,
        "time": 188.96109249999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.6298703083333521,
        "durationTicks": 388,
        "midi": 65,
        "name": "F4",
        "ticks": 116400,
        "time": 188.96109249999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.15584419999999,
        "durationTicks": 96,
        "midi": 60,
        "name": "C4",
        "ticks": 116880,
        "time": 189.74031349999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.13636367500001256,
        "durationTicks": 84,
        "midi": 65,
        "name": "F4",
        "ticks": 116880,
        "time": 189.74031349999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.8896106416666782,
        "durationTicks": 548,
        "midi": 52,
        "name": "E3",
        "ticks": 117120,
        "time": 190.129924,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9805197583333154,
        "durationTicks": 604,
        "midi": 45,
        "name": "A2",
        "ticks": 117120,
        "time": 190.129924,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.0129873000000202,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 117120,
        "time": 190.129924,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.019480808333327,
        "durationTicks": 628,
        "midi": 60,
        "name": "C4",
        "ticks": 117120,
        "time": 190.129924,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 1.0584418583333104,
        "durationTicks": 652,
        "midi": 57,
        "name": "A3",
        "ticks": 117120,
        "time": 190.129924,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3636364666666907,
        "durationTicks": 224,
        "midi": 40,
        "name": "E2",
        "ticks": 118080,
        "time": 191.68836599999997,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 52,
        "name": "E3",
        "ticks": 118320,
        "time": 192.07797649999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 118320,
        "time": 192.07797649999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 59,
        "name": "B3",
        "ticks": 118320,
        "time": 192.07797649999998,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.45454558333335626,
        "durationTicks": 280,
        "midi": 43,
        "name": "G2",
        "ticks": 118560,
        "time": 192.46758699999998,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 118800,
        "time": 192.85719749999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 118800,
        "time": 192.85719749999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.2272727916666497,
        "durationTicks": 140,
        "midi": 62,
        "name": "D4",
        "ticks": 118800,
        "time": 192.85719749999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.2467538833333265,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 119040,
        "time": 193.246808,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.8896106416666782,
        "durationTicks": 548,
        "midi": 52,
        "name": "E3",
        "ticks": 120960,
        "time": 196.363692,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9805197583333154,
        "durationTicks": 604,
        "midi": 45,
        "name": "A2",
        "ticks": 120960,
        "time": 196.363692,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.0129873000000202,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 120960,
        "time": 196.363692,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.019480808333327,
        "durationTicks": 628,
        "midi": 60,
        "name": "C4",
        "ticks": 120960,
        "time": 196.363692,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 1.0584418583333104,
        "durationTicks": 652,
        "midi": 57,
        "name": "A3",
        "ticks": 120960,
        "time": 196.363692,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.3636364666666907,
        "durationTicks": 224,
        "midi": 40,
        "name": "E2",
        "ticks": 121920,
        "time": 197.92213399999997,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 52,
        "name": "E3",
        "ticks": 122160,
        "time": 198.31174449999997,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.22077928333334285,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 122160,
        "time": 198.31174449999997,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 59,
        "name": "B3",
        "ticks": 122160,
        "time": 198.31174449999997,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.45454558333335626,
        "durationTicks": 280,
        "midi": 43,
        "name": "G2",
        "ticks": 122400,
        "time": 198.70135499999998,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.17532472499999585,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 122640,
        "time": 199.09096549999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 122640,
        "time": 199.09096549999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.2272727916666497,
        "durationTicks": 140,
        "midi": 62,
        "name": "D4",
        "ticks": 122640,
        "time": 199.09096549999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.2467538833333265,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 122880,
        "time": 199.48057599999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.8896106416666498,
        "durationTicks": 548,
        "midi": 52,
        "name": "E3",
        "ticks": 124800,
        "time": 202.59745999999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9805197583333154,
        "durationTicks": 604,
        "midi": 45,
        "name": "A2",
        "ticks": 124800,
        "time": 202.59745999999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.0129873000000202,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 124800,
        "time": 202.59745999999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.019480808333327,
        "durationTicks": 628,
        "midi": 60,
        "name": "C4",
        "ticks": 124800,
        "time": 202.59745999999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 1.0584418583333388,
        "durationTicks": 652,
        "midi": 57,
        "name": "A3",
        "ticks": 124800,
        "time": 202.59745999999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36363646666663385,
        "durationTicks": 224,
        "midi": 40,
        "name": "E2",
        "ticks": 125760,
        "time": 204.155902,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.22077928333337127,
        "durationTicks": 136,
        "midi": 52,
        "name": "E3",
        "ticks": 126000,
        "time": 204.54551249999997,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.22077928333337127,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 126000,
        "time": 204.54551249999997,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.2727273500000251,
        "durationTicks": 168,
        "midi": 59,
        "name": "B3",
        "ticks": 126000,
        "time": 204.54551249999997,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.45454558333332784,
        "durationTicks": 280,
        "midi": 43,
        "name": "G2",
        "ticks": 126240,
        "time": 204.93512299999998,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.17532472500002427,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 126480,
        "time": 205.32473349999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 126480,
        "time": 205.32473349999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22727279166667813,
        "durationTicks": 140,
        "midi": 62,
        "name": "D4",
        "ticks": 126480,
        "time": 205.32473349999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 2.2467538833333265,
        "durationTicks": 1384,
        "midi": 45,
        "name": "A2",
        "ticks": 126720,
        "time": 205.71434399999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.8896106416666498,
        "durationTicks": 548,
        "midi": 52,
        "name": "E3",
        "ticks": 128640,
        "time": 208.83122799999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9805197583333438,
        "durationTicks": 604,
        "midi": 45,
        "name": "A2",
        "ticks": 128640,
        "time": 208.83122799999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 1.0129873000000202,
        "durationTicks": 624,
        "midi": 64,
        "name": "E4",
        "ticks": 128640,
        "time": 208.83122799999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.019480808333327,
        "durationTicks": 628,
        "midi": 60,
        "name": "C4",
        "ticks": 128640,
        "time": 208.83122799999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 1.0584418583333388,
        "durationTicks": 652,
        "midi": 57,
        "name": "A3",
        "ticks": 128640,
        "time": 208.83122799999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.36363646666663385,
        "durationTicks": 224,
        "midi": 40,
        "name": "E2",
        "ticks": 129600,
        "time": 210.38967,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.22077928333337127,
        "durationTicks": 136,
        "midi": 52,
        "name": "E3",
        "ticks": 129840,
        "time": 210.77928049999997,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 0.22077928333337127,
        "durationTicks": 136,
        "midi": 55,
        "name": "G3",
        "ticks": 129840,
        "time": 210.77928049999997,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.2727273500000251,
        "durationTicks": 168,
        "midi": 59,
        "name": "B3",
        "ticks": 129840,
        "time": 210.77928049999997,
        "velocity": 0.8031496062992126
    },
    {
        "duration": 0.45454558333332784,
        "durationTicks": 280,
        "midi": 43,
        "name": "G2",
        "ticks": 130080,
        "time": 211.16889099999997,
        "velocity": 0.84251968503937
    },
    {
        "duration": 0.17532472500002427,
        "durationTicks": 108,
        "midi": 55,
        "name": "G3",
        "ticks": 130320,
        "time": 211.55850149999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 59,
        "name": "B3",
        "ticks": 130320,
        "time": 211.55850149999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.22727279166667813,
        "durationTicks": 140,
        "midi": 62,
        "name": "D4",
        "ticks": 130320,
        "time": 211.55850149999998,
        "velocity": 0.7874015748031497
    },
    {
        "duration": 5.441559983333349,
        "durationTicks": 3352,
        "midi": 57,
        "name": "A3",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 5.6688327749999985,
        "durationTicks": 3492,
        "midi": 45,
        "name": "A2",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 5.04545597500001,
        "durationTicks": 3108,
        "midi": 62,
        "name": "D4",
        "ticks": 130800,
        "time": 212.33772249999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 5.149352108333346,
        "durationTicks": 3172,
        "midi": 71,
        "name": "B4",
        "ticks": 130800,
        "time": 212.33772249999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 5.136365091666647,
        "durationTicks": 3164,
        "midi": 64,
        "name": "E4",
        "ticks": 130800,
        "time": 212.33772249999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 5.129871583333312,
        "durationTicks": 3160,
        "midi": 67,
        "name": "G4",
        "ticks": 130800,
        "time": 212.33772249999998,
        "velocity": 0.7007874015748031
    }
];

const recordingSecondNotes = [
    {
        "duration": 0.5064936499999995,
        "durationTicks": 312,
        "midi": 45,
        "name": "A2",
        "ticks": 5760,
        "time": 9.350652,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.4480520749999979,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 6000,
        "time": 9.7402625,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.42857154999999914,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 6000,
        "time": 9.7402625,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.43506505833333264,
        "durationTicks": 268,
        "midi": 45,
        "name": "A2",
        "ticks": 6240,
        "time": 10.129873,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3506494499999988,
        "durationTicks": 216,
        "midi": 55,
        "name": "G3",
        "ticks": 6480,
        "time": 10.5194835,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.292207874999999,
        "durationTicks": 180,
        "midi": 60,
        "name": "C4",
        "ticks": 6480,
        "time": 10.5194835,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5064936499999995,
        "durationTicks": 312,
        "midi": 40,
        "name": "E2",
        "ticks": 6720,
        "time": 10.909094,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.38961049999999986,
        "durationTicks": 240,
        "midi": 52,
        "name": "E3",
        "ticks": 6960,
        "time": 11.2987045,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.38961049999999986,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 6960,
        "time": 11.2987045,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5000001416666677,
        "durationTicks": 308,
        "midi": 43,
        "name": "G2",
        "ticks": 7200,
        "time": 11.688315,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.39610400833333337,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 7440,
        "time": 12.0779255,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.39610400833333337,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 7440,
        "time": 12.0779255,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 2.7922085833333323,
        "durationTicks": 1720,
        "midi": 45,
        "name": "A2",
        "ticks": 7680,
        "time": 12.467535999999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 7920,
        "time": 12.857146499999999,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 7920,
        "time": 12.857146499999999,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.5844157499999998,
        "durationTicks": 360,
        "midi": 55,
        "name": "G3",
        "ticks": 8400,
        "time": 13.636367499999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5844157499999998,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 8400,
        "time": 13.636367499999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.6168832916666673,
        "durationTicks": 380,
        "midi": 60,
        "name": "C4",
        "ticks": 8880,
        "time": 14.415588499999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.6298703083333343,
        "durationTicks": 388,
        "midi": 55,
        "name": "G3",
        "ticks": 8880,
        "time": 14.415588499999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.38961049999999986,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 9360,
        "time": 15.194809499999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3766234833333346,
        "durationTicks": 232,
        "midi": 60,
        "name": "C4",
        "ticks": 9360,
        "time": 15.194809499999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.201299041666669,
        "durationTicks": 740,
        "midi": 45,
        "name": "A2",
        "ticks": 9600,
        "time": 15.584419999999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333328,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 9840,
        "time": 15.9740305,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5779222416666645,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 9840,
        "time": 15.9740305,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333366,
        "durationTicks": 196,
        "midi": 55,
        "name": "G3",
        "ticks": 10320,
        "time": 16.753251499999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2727273500000038,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 10320,
        "time": 16.753251499999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.4740261083333337,
        "durationTicks": 292,
        "midi": 40,
        "name": "E2",
        "ticks": 10560,
        "time": 17.142861999999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 52,
        "name": "E3",
        "ticks": 10800,
        "time": 17.532472499999997,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.3246754166666683,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 10800,
        "time": 17.532472499999997,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.40909102500000216,
        "durationTicks": 252,
        "midi": 43,
        "name": "G2",
        "ticks": 11040,
        "time": 17.922082999999997,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 11280,
        "time": 18.311693499999997,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3116884000000013,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 11280,
        "time": 18.311693499999997,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 1.4740263916666656,
        "durationTicks": 908,
        "midi": 45,
        "name": "A2",
        "ticks": 11520,
        "time": 18.701304,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 11760,
        "time": 19.0909145,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.5194806666666665,
        "durationTicks": 320,
        "midi": 55,
        "name": "G3",
        "ticks": 11760,
        "time": 19.0909145,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.5194806666666665,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 12240,
        "time": 19.8701355,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5389611916666652,
        "durationTicks": 332,
        "midi": 55,
        "name": "G3",
        "ticks": 12240,
        "time": 19.8701355,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.4610393749999986,
        "durationTicks": 900,
        "midi": 45,
        "name": "A2",
        "ticks": 12480,
        "time": 20.259746,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.597402766666665,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 12720,
        "time": 20.6493565,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.597402766666665,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 12720,
        "time": 20.6493565,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.24025980833333094,
        "durationTicks": 148,
        "midi": 55,
        "name": "G3",
        "ticks": 13200,
        "time": 21.4285775,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.24025980833333094,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 13200,
        "time": 21.4285775,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.43506505833333264,
        "durationTicks": 268,
        "midi": 52,
        "name": "E3",
        "ticks": 13440,
        "time": 21.818188,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5000001416666642,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 13680,
        "time": 22.2077985,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.48051961666666543,
        "durationTicks": 296,
        "midi": 59,
        "name": "B3",
        "ticks": 13680,
        "time": 22.2077985,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.49350663333333245,
        "durationTicks": 304,
        "midi": 64,
        "name": "E4",
        "ticks": 13680,
        "time": 22.2077985,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.597402766666665,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 14160,
        "time": 22.9870195,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5779222416666663,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 14160,
        "time": 22.9870195,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.6233767999999991,
        "durationTicks": 384,
        "midi": 64,
        "name": "E4",
        "ticks": 14160,
        "time": 22.9870195,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5779222416666663,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 14640,
        "time": 23.7662405,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.6038962749999968,
        "durationTicks": 372,
        "midi": 64,
        "name": "E4",
        "ticks": 14640,
        "time": 23.7662405,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.597402766666665,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 14640,
        "time": 23.7662405,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 59,
        "name": "B3",
        "ticks": 15120,
        "time": 24.5454615,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.27272735000000026,
        "durationTicks": 168,
        "midi": 64,
        "name": "E4",
        "ticks": 15120,
        "time": 24.5454615,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.27272735000000026,
        "durationTicks": 168,
        "midi": 67,
        "name": "G4",
        "ticks": 15120,
        "time": 24.5454615,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 2.7662345499999965,
        "durationTicks": 1704,
        "midi": 50,
        "name": "D3",
        "ticks": 15360,
        "time": 24.935071999999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5909092583333333,
        "durationTicks": 364,
        "midi": 62,
        "name": "D4",
        "ticks": 15600,
        "time": 25.324682499999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5844157500000016,
        "durationTicks": 360,
        "midi": 57,
        "name": "A3",
        "ticks": 15600,
        "time": 25.324682499999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 15600,
        "time": 25.324682499999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 16080,
        "time": 26.103903499999998,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5909092583333333,
        "durationTicks": 364,
        "midi": 65,
        "name": "F4",
        "ticks": 16080,
        "time": 26.103903499999998,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 16080,
        "time": 26.103903499999998,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.5584417166666675,
        "durationTicks": 344,
        "midi": 65,
        "name": "F4",
        "ticks": 16560,
        "time": 26.883124499999997,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5584417166666675,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 16560,
        "time": 26.883124499999997,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 62,
        "name": "D4",
        "ticks": 16560,
        "time": 26.883124499999997,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 17040,
        "time": 27.662345499999997,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3701299750000011,
        "durationTicks": 228,
        "midi": 57,
        "name": "A3",
        "ticks": 17040,
        "time": 27.662345499999997,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3116884000000013,
        "durationTicks": 192,
        "midi": 65,
        "name": "F4",
        "ticks": 17040,
        "time": 27.662345499999997,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.24026009166667,
        "durationTicks": 764,
        "midi": 45,
        "name": "A2",
        "ticks": 17280,
        "time": 28.051955999999997,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 17520,
        "time": 28.441566499999997,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6233767999999991,
        "durationTicks": 384,
        "midi": 57,
        "name": "A3",
        "ticks": 17520,
        "time": 28.441566499999997,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.6233767999999991,
        "durationTicks": 384,
        "midi": 60,
        "name": "C4",
        "ticks": 17520,
        "time": 28.441566499999997,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.22727279166666747,
        "durationTicks": 140,
        "midi": 64,
        "name": "E4",
        "ticks": 18000,
        "time": 29.220787499999997,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.24025980833333094,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 18000,
        "time": 29.220787499999997,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2662338416666685,
        "durationTicks": 164,
        "midi": 57,
        "name": "A3",
        "ticks": 18000,
        "time": 29.220787499999997,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.46753260000000196,
        "durationTicks": 288,
        "midi": 40,
        "name": "E2",
        "ticks": 18240,
        "time": 29.610397999999996,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 52,
        "name": "E3",
        "ticks": 18480,
        "time": 30.000008499999996,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 18480,
        "time": 30.000008499999996,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.35064945000000236,
        "durationTicks": 216,
        "midi": 59,
        "name": "B3",
        "ticks": 18480,
        "time": 30.000008499999996,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.47402610833333725,
        "durationTicks": 292,
        "midi": 43,
        "name": "G2",
        "ticks": 18720,
        "time": 30.389618999999996,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.34415594166667063,
        "durationTicks": 212,
        "midi": 55,
        "name": "G3",
        "ticks": 18960,
        "time": 30.779229499999996,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.35064945000000236,
        "durationTicks": 216,
        "midi": 62,
        "name": "D4",
        "ticks": 18960,
        "time": 30.779229499999996,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.34415594166667063,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 18960,
        "time": 30.779229499999996,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 3.0064943583333346,
        "durationTicks": 1852,
        "midi": 45,
        "name": "A2",
        "ticks": 19200,
        "time": 31.168839999999996,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5000001416666677,
        "durationTicks": 308,
        "midi": 57,
        "name": "A3",
        "ticks": 19440,
        "time": 31.5584505,
        "velocity": 0.4094488188976378
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 19440,
        "time": 31.5584505,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.5259741749999947,
        "durationTicks": 324,
        "midi": 64,
        "name": "E4",
        "ticks": 19440,
        "time": 31.5584505,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.40909102499999506,
        "durationTicks": 252,
        "midi": 64,
        "name": "E4",
        "ticks": 19920,
        "time": 32.3376715,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.40909102499999506,
        "durationTicks": 252,
        "midi": 57,
        "name": "A3",
        "ticks": 19920,
        "time": 32.3376715,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.3961040083333316,
        "durationTicks": 244,
        "midi": 60,
        "name": "C4",
        "ticks": 19920,
        "time": 32.3376715,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.49350663333333245,
        "durationTicks": 304,
        "midi": 60,
        "name": "C4",
        "ticks": 20400,
        "time": 33.1168925,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 57,
        "name": "A3",
        "ticks": 20400,
        "time": 33.1168925,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 64,
        "name": "E4",
        "ticks": 20400,
        "time": 33.1168925,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22077928333332864,
        "durationTicks": 136,
        "midi": 64,
        "name": "E4",
        "ticks": 20880,
        "time": 33.8961135,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.20129875833332989,
        "durationTicks": 124,
        "midi": 57,
        "name": "A3",
        "ticks": 20880,
        "time": 33.8961135,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.20779226666666517,
        "durationTicks": 128,
        "midi": 60,
        "name": "C4",
        "ticks": 20880,
        "time": 33.8961135,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.506493650000003,
        "durationTicks": 312,
        "midi": 45,
        "name": "A2",
        "ticks": 21120,
        "time": 34.285723999999995,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.44805207499999966,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 21360,
        "time": 34.6753345,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.4285715499999938,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 21360,
        "time": 34.6753345,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333362,
        "durationTicks": 268,
        "midi": 45,
        "name": "A2",
        "ticks": 21600,
        "time": 35.064944999999994,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3506494499999988,
        "durationTicks": 216,
        "midi": 55,
        "name": "G3",
        "ticks": 21840,
        "time": 35.4545555,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 60,
        "name": "C4",
        "ticks": 21840,
        "time": 35.4545555,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.506493650000003,
        "durationTicks": 312,
        "midi": 40,
        "name": "E2",
        "ticks": 22080,
        "time": 35.844165999999994,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3896104999999963,
        "durationTicks": 240,
        "midi": 52,
        "name": "E3",
        "ticks": 22320,
        "time": 36.2337765,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3896104999999963,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 22320,
        "time": 36.2337765,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5000001416666677,
        "durationTicks": 308,
        "midi": 43,
        "name": "G2",
        "ticks": 22560,
        "time": 36.623386999999994,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.3961040083333316,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 22800,
        "time": 37.0129975,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3961040083333316,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 22800,
        "time": 37.0129975,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 2.792208583333334,
        "durationTicks": 1720,
        "midi": 45,
        "name": "A2",
        "ticks": 23040,
        "time": 37.402608,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 23280,
        "time": 37.7922185,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 23280,
        "time": 37.7922185,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.584415749999998,
        "durationTicks": 360,
        "midi": 55,
        "name": "G3",
        "ticks": 23760,
        "time": 38.5714395,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.584415749999998,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 23760,
        "time": 38.5714395,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.6168832916666673,
        "durationTicks": 380,
        "midi": 60,
        "name": "C4",
        "ticks": 24240,
        "time": 39.3506605,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.6298703083333308,
        "durationTicks": 388,
        "midi": 55,
        "name": "G3",
        "ticks": 24240,
        "time": 39.3506605,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 24720,
        "time": 40.129881499999996,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37662348333333284,
        "durationTicks": 232,
        "midi": 60,
        "name": "C4",
        "ticks": 24720,
        "time": 40.129881499999996,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.2012990416666653,
        "durationTicks": 740,
        "midi": 45,
        "name": "A2",
        "ticks": 24960,
        "time": 40.519492,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 25200,
        "time": 40.909102499999996,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 25200,
        "time": 40.909102499999996,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333366,
        "durationTicks": 196,
        "midi": 55,
        "name": "G3",
        "ticks": 25680,
        "time": 41.688323499999996,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2727273500000038,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 25680,
        "time": 41.688323499999996,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.4740261083333337,
        "durationTicks": 292,
        "midi": 40,
        "name": "E2",
        "ticks": 25920,
        "time": 42.077934,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 52,
        "name": "E3",
        "ticks": 26160,
        "time": 42.467544499999995,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 26160,
        "time": 42.467544499999995,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.40909102499999506,
        "durationTicks": 252,
        "midi": 43,
        "name": "G2",
        "ticks": 26400,
        "time": 42.857155,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 26640,
        "time": 43.246765499999995,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3116884000000013,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 26640,
        "time": 43.246765499999995,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 1.474026391666662,
        "durationTicks": 908,
        "midi": 45,
        "name": "A2",
        "ticks": 26880,
        "time": 43.636376,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.506493650000003,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 27120,
        "time": 44.025986499999995,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.5194806666666665,
        "durationTicks": 320,
        "midi": 55,
        "name": "G3",
        "ticks": 27120,
        "time": 44.025986499999995,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.5194806666666665,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 27600,
        "time": 44.805207499999995,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5389611916666723,
        "durationTicks": 332,
        "midi": 55,
        "name": "G3",
        "ticks": 27600,
        "time": 44.805207499999995,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.4610393749999986,
        "durationTicks": 900,
        "midi": 45,
        "name": "A2",
        "ticks": 27840,
        "time": 45.194818,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5974027666666686,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 28080,
        "time": 45.584428499999994,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666686,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 28080,
        "time": 45.584428499999994,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 55,
        "name": "G3",
        "ticks": 28560,
        "time": 46.363649499999994,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 28560,
        "time": 46.363649499999994,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333291,
        "durationTicks": 268,
        "midi": 52,
        "name": "E3",
        "ticks": 28800,
        "time": 46.75326,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5000001416666677,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 29040,
        "time": 47.142870499999994,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.480519616666669,
        "durationTicks": 296,
        "midi": 59,
        "name": "B3",
        "ticks": 29040,
        "time": 47.142870499999994,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.49350663333333245,
        "durationTicks": 304,
        "midi": 64,
        "name": "E4",
        "ticks": 29040,
        "time": 47.142870499999994,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666686,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 29520,
        "time": 47.92209149999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 29520,
        "time": 47.92209149999999,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.6233768000000026,
        "durationTicks": 384,
        "midi": 64,
        "name": "E4",
        "ticks": 29520,
        "time": 47.92209149999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 30000,
        "time": 48.70131249999999,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.6038962750000039,
        "durationTicks": 372,
        "midi": 64,
        "name": "E4",
        "ticks": 30000,
        "time": 48.70131249999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666686,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 30000,
        "time": 48.70131249999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.305194891666666,
        "durationTicks": 188,
        "midi": 59,
        "name": "B3",
        "ticks": 30480,
        "time": 49.48053349999999,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.2727273500000038,
        "durationTicks": 168,
        "midi": 64,
        "name": "E4",
        "ticks": 30480,
        "time": 49.48053349999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2727273500000038,
        "durationTicks": 168,
        "midi": 67,
        "name": "G4",
        "ticks": 30480,
        "time": 49.48053349999999,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 2.76623455,
        "durationTicks": 1704,
        "midi": 50,
        "name": "D3",
        "ticks": 30720,
        "time": 49.870143999999996,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5909092583333333,
        "durationTicks": 364,
        "midi": 62,
        "name": "D4",
        "ticks": 30960,
        "time": 50.2597545,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.584415749999998,
        "durationTicks": 360,
        "midi": 57,
        "name": "A3",
        "ticks": 30960,
        "time": 50.2597545,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5714287333333274,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 30960,
        "time": 50.2597545,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 31440,
        "time": 51.0389755,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5909092583333333,
        "durationTicks": 364,
        "midi": 65,
        "name": "F4",
        "ticks": 31440,
        "time": 51.0389755,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 31440,
        "time": 51.0389755,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 65,
        "name": "F4",
        "ticks": 31920,
        "time": 51.8181965,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 31920,
        "time": 51.8181965,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 62,
        "name": "D4",
        "ticks": 31920,
        "time": 51.8181965,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 32400,
        "time": 52.5974175,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37012997499999045,
        "durationTicks": 228,
        "midi": 57,
        "name": "A3",
        "ticks": 32400,
        "time": 52.5974175,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3116884000000013,
        "durationTicks": 192,
        "midi": 65,
        "name": "F4",
        "ticks": 32400,
        "time": 52.5974175,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.24026009166667,
        "durationTicks": 764,
        "midi": 45,
        "name": "A2",
        "ticks": 32640,
        "time": 52.987027999999995,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 32880,
        "time": 53.3766385,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6233767999999955,
        "durationTicks": 384,
        "midi": 57,
        "name": "A3",
        "ticks": 32880,
        "time": 53.3766385,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.6233767999999955,
        "durationTicks": 384,
        "midi": 60,
        "name": "C4",
        "ticks": 32880,
        "time": 53.3766385,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.22727279166667103,
        "durationTicks": 140,
        "midi": 64,
        "name": "E4",
        "ticks": 33360,
        "time": 54.1558595,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 33360,
        "time": 54.1558595,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2662338416666685,
        "durationTicks": 164,
        "midi": 57,
        "name": "A3",
        "ticks": 33360,
        "time": 54.1558595,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 40,
        "name": "E2",
        "ticks": 33600,
        "time": 54.545469999999995,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 52,
        "name": "E3",
        "ticks": 33840,
        "time": 54.9350805,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 33840,
        "time": 54.9350805,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.3506494499999988,
        "durationTicks": 216,
        "midi": 59,
        "name": "B3",
        "ticks": 33840,
        "time": 54.9350805,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.4740261083333337,
        "durationTicks": 292,
        "midi": 43,
        "name": "G2",
        "ticks": 34080,
        "time": 55.324690999999994,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3441559416666635,
        "durationTicks": 212,
        "midi": 55,
        "name": "G3",
        "ticks": 34320,
        "time": 55.7143015,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.3506494499999988,
        "durationTicks": 216,
        "midi": 62,
        "name": "D4",
        "ticks": 34320,
        "time": 55.7143015,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3441559416666635,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 34320,
        "time": 55.7143015,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 3.0064943583333346,
        "durationTicks": 1852,
        "midi": 45,
        "name": "A2",
        "ticks": 34560,
        "time": 56.103911999999994,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5000001416666677,
        "durationTicks": 308,
        "midi": 57,
        "name": "A3",
        "ticks": 34800,
        "time": 56.4935225,
        "velocity": 0.4094488188976378
    },
    {
        "duration": 0.506493650000003,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 34800,
        "time": 56.4935225,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.5259741749999947,
        "durationTicks": 324,
        "midi": 64,
        "name": "E4",
        "ticks": 34800,
        "time": 56.4935225,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.40909102500000216,
        "durationTicks": 252,
        "midi": 64,
        "name": "E4",
        "ticks": 35280,
        "time": 57.2727435,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.40909102500000216,
        "durationTicks": 252,
        "midi": 57,
        "name": "A3",
        "ticks": 35280,
        "time": 57.2727435,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 60,
        "name": "C4",
        "ticks": 35280,
        "time": 57.2727435,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.49350663333333955,
        "durationTicks": 304,
        "midi": 60,
        "name": "C4",
        "ticks": 35760,
        "time": 58.0519645,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.506493650000003,
        "durationTicks": 312,
        "midi": 57,
        "name": "A3",
        "ticks": 35760,
        "time": 58.0519645,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.506493650000003,
        "durationTicks": 312,
        "midi": 64,
        "name": "E4",
        "ticks": 35760,
        "time": 58.0519645,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22077928333332864,
        "durationTicks": 136,
        "midi": 64,
        "name": "E4",
        "ticks": 36240,
        "time": 58.8311855,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.201298758333337,
        "durationTicks": 124,
        "midi": 57,
        "name": "A3",
        "ticks": 36240,
        "time": 58.8311855,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.20779226666666517,
        "durationTicks": 128,
        "midi": 60,
        "name": "C4",
        "ticks": 36240,
        "time": 58.8311855,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.9220781833333263,
        "durationTicks": 568,
        "midi": 52,
        "name": "E3",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.9740262499999943,
        "durationTicks": 600,
        "midi": 45,
        "name": "A2",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.9285716916666615,
        "durationTicks": 572,
        "midi": 64,
        "name": "E4",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.9935067750000002,
        "durationTicks": 612,
        "midi": 57,
        "name": "A3",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.9545457249999885,
        "durationTicks": 588,
        "midi": 60,
        "name": "C4",
        "ticks": 48000,
        "time": 77.9221,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.29220787499998835,
        "durationTicks": 180,
        "midi": 52,
        "name": "E3",
        "ticks": 48960,
        "time": 79.480542,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.2662338416666614,
        "durationTicks": 164,
        "midi": 40,
        "name": "E2",
        "ticks": 48960,
        "time": 79.480542,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.3051948916666589,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 48960,
        "time": 79.480542,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.33116892499998585,
        "durationTicks": 204,
        "midi": 59,
        "name": "B3",
        "ticks": 48960,
        "time": 79.480542,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 50,
        "name": "D3",
        "ticks": 49440,
        "time": 80.25976299999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 59,
        "name": "B3",
        "ticks": 49440,
        "time": 80.25976299999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 55,
        "name": "G3",
        "ticks": 49440,
        "time": 80.25976299999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 43,
        "name": "G2",
        "ticks": 49440,
        "time": 80.25976299999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.285714933333324,
        "durationTicks": 1408,
        "midi": 52,
        "name": "E3",
        "ticks": 49920,
        "time": 81.038984,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 2.337662999999992,
        "durationTicks": 1440,
        "midi": 60,
        "name": "C4",
        "ticks": 49920,
        "time": 81.038984,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.3311694916666568,
        "durationTicks": 1436,
        "midi": 57,
        "name": "A3",
        "ticks": 49920,
        "time": 81.038984,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.30519545833333,
        "durationTicks": 1420,
        "midi": 45,
        "name": "A2",
        "ticks": 49920,
        "time": 81.038984,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 45,
        "name": "A2",
        "ticks": 51840,
        "time": 84.155868,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.44805207500000677,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 52080,
        "time": 84.54547849999999,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.4285715500000009,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 52080,
        "time": 84.54547849999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333362,
        "durationTicks": 268,
        "midi": 45,
        "name": "A2",
        "ticks": 52320,
        "time": 84.93508899999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3506494500000059,
        "durationTicks": 216,
        "midi": 55,
        "name": "G3",
        "ticks": 52560,
        "time": 85.3246995,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 60,
        "name": "C4",
        "ticks": 52560,
        "time": 85.3246995,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 40,
        "name": "E2",
        "ticks": 52800,
        "time": 85.71431,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 52,
        "name": "E3",
        "ticks": 53040,
        "time": 86.10392049999999,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 53040,
        "time": 86.10392049999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 43,
        "name": "G2",
        "ticks": 53280,
        "time": 86.49353099999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 53520,
        "time": 86.8831415,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 53520,
        "time": 86.8831415,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 1.4740263916666692,
        "durationTicks": 908,
        "midi": 45,
        "name": "A2",
        "ticks": 53760,
        "time": 87.272752,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 54000,
        "time": 87.6623625,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.5194806666666665,
        "durationTicks": 320,
        "midi": 55,
        "name": "G3",
        "ticks": 54000,
        "time": 87.6623625,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.5194806666666665,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 54480,
        "time": 88.4415835,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5389611916666581,
        "durationTicks": 332,
        "midi": 55,
        "name": "G3",
        "ticks": 54480,
        "time": 88.4415835,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.4610393749999986,
        "durationTicks": 900,
        "midi": 45,
        "name": "A2",
        "ticks": 54720,
        "time": 88.831194,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 54960,
        "time": 89.2208045,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 54960,
        "time": 89.2208045,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 55,
        "name": "G3",
        "ticks": 55440,
        "time": 90.00002549999999,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 55440,
        "time": 90.00002549999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333362,
        "durationTicks": 268,
        "midi": 52,
        "name": "E3",
        "ticks": 55680,
        "time": 90.389636,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5000001416666606,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 55920,
        "time": 90.7792465,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.48051961666665477,
        "durationTicks": 296,
        "midi": 59,
        "name": "B3",
        "ticks": 55920,
        "time": 90.7792465,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.49350663333332534,
        "durationTicks": 304,
        "midi": 64,
        "name": "E4",
        "ticks": 55920,
        "time": 90.7792465,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 56400,
        "time": 91.55846749999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5779222416666556,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 56400,
        "time": 91.55846749999999,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.6233768000000026,
        "durationTicks": 384,
        "midi": 64,
        "name": "E4",
        "ticks": 56400,
        "time": 91.55846749999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5779222416666556,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 56880,
        "time": 92.3376885,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.6038962749999968,
        "durationTicks": 372,
        "midi": 64,
        "name": "E4",
        "ticks": 56880,
        "time": 92.3376885,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666615,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 56880,
        "time": 92.3376885,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 59,
        "name": "B3",
        "ticks": 57360,
        "time": 93.11690949999999,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 64,
        "name": "E4",
        "ticks": 57360,
        "time": 93.11690949999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 67,
        "name": "G4",
        "ticks": 57360,
        "time": 93.11690949999999,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 2.766234549999993,
        "durationTicks": 1704,
        "midi": 50,
        "name": "D3",
        "ticks": 57600,
        "time": 93.50652,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5909092583333262,
        "durationTicks": 364,
        "midi": 62,
        "name": "D4",
        "ticks": 57840,
        "time": 93.8961305,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5844157499999909,
        "durationTicks": 360,
        "midi": 57,
        "name": "A3",
        "ticks": 57840,
        "time": 93.8961305,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 57840,
        "time": 93.8961305,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 58320,
        "time": 94.67535149999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5909092583333404,
        "durationTicks": 364,
        "midi": 65,
        "name": "F4",
        "ticks": 58320,
        "time": 94.67535149999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 58320,
        "time": 94.67535149999999,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 65,
        "name": "F4",
        "ticks": 58800,
        "time": 95.4545725,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 58800,
        "time": 95.4545725,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 62,
        "name": "D4",
        "ticks": 58800,
        "time": 95.4545725,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.324675416666679,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 59280,
        "time": 96.23379349999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37012997499999756,
        "durationTicks": 228,
        "midi": 57,
        "name": "A3",
        "ticks": 59280,
        "time": 96.23379349999999,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 65,
        "name": "F4",
        "ticks": 59280,
        "time": 96.23379349999999,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.24026009166667,
        "durationTicks": 764,
        "midi": 45,
        "name": "A2",
        "ticks": 59520,
        "time": 96.623404,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 59760,
        "time": 97.0130145,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6233767999999884,
        "durationTicks": 384,
        "midi": 57,
        "name": "A3",
        "ticks": 59760,
        "time": 97.0130145,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.6233767999999884,
        "durationTicks": 384,
        "midi": 60,
        "name": "C4",
        "ticks": 59760,
        "time": 97.0130145,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.22727279166667813,
        "durationTicks": 140,
        "midi": 64,
        "name": "E4",
        "ticks": 60240,
        "time": 97.79223549999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 60240,
        "time": 97.79223549999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.26623384166667563,
        "durationTicks": 164,
        "midi": 57,
        "name": "A3",
        "ticks": 60240,
        "time": 97.79223549999999,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 40,
        "name": "E2",
        "ticks": 60480,
        "time": 98.181846,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 52,
        "name": "E3",
        "ticks": 60720,
        "time": 98.5714565,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 60720,
        "time": 98.5714565,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 59,
        "name": "B3",
        "ticks": 60720,
        "time": 98.5714565,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.4740261083333479,
        "durationTicks": 292,
        "midi": 43,
        "name": "G2",
        "ticks": 60960,
        "time": 98.96106699999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.34415594166667063,
        "durationTicks": 212,
        "midi": 55,
        "name": "G3",
        "ticks": 61200,
        "time": 99.35067749999999,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.3506494500000059,
        "durationTicks": 216,
        "midi": 62,
        "name": "D4",
        "ticks": 61200,
        "time": 99.35067749999999,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.34415594166667063,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 61200,
        "time": 99.35067749999999,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 2.285714933333338,
        "durationTicks": 1408,
        "midi": 52,
        "name": "E3",
        "ticks": 61440,
        "time": 99.74028799999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 2.3376630000000063,
        "durationTicks": 1440,
        "midi": 60,
        "name": "C4",
        "ticks": 61440,
        "time": 99.74028799999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.331169491666671,
        "durationTicks": 1436,
        "midi": 57,
        "name": "A3",
        "ticks": 61440,
        "time": 99.74028799999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.305195458333344,
        "durationTicks": 1420,
        "midi": 45,
        "name": "A2",
        "ticks": 61440,
        "time": 99.74028799999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 45,
        "name": "A2",
        "ticks": 63360,
        "time": 102.85717199999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.44805207499999256,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 63600,
        "time": 103.2467825,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.4285715500000009,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 63600,
        "time": 103.2467825,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333362,
        "durationTicks": 268,
        "midi": 45,
        "name": "A2",
        "ticks": 63840,
        "time": 103.636393,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 55,
        "name": "G3",
        "ticks": 64080,
        "time": 104.02600349999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 60,
        "name": "C4",
        "ticks": 64080,
        "time": 104.02600349999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 40,
        "name": "E2",
        "ticks": 64320,
        "time": 104.41561399999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 52,
        "name": "E3",
        "ticks": 64560,
        "time": 104.8052245,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 64560,
        "time": 104.8052245,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 43,
        "name": "G2",
        "ticks": 64800,
        "time": 105.194835,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 65040,
        "time": 105.58444549999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 65040,
        "time": 105.58444549999999,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 2.7922085833333483,
        "durationTicks": 1720,
        "midi": 45,
        "name": "A2",
        "ticks": 65280,
        "time": 105.97405599999999,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5714287333333203,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 65520,
        "time": 106.3636665,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.5714287333333203,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 65520,
        "time": 106.3636665,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 55,
        "name": "G3",
        "ticks": 66000,
        "time": 107.14288749999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 66000,
        "time": 107.14288749999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.6168832916666531,
        "durationTicks": 380,
        "midi": 60,
        "name": "C4",
        "ticks": 66480,
        "time": 107.9221085,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.6298703083333379,
        "durationTicks": 388,
        "midi": 55,
        "name": "G3",
        "ticks": 66480,
        "time": 107.9221085,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 66960,
        "time": 108.70132949999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37662348333333284,
        "durationTicks": 232,
        "midi": 60,
        "name": "C4",
        "ticks": 66960,
        "time": 108.70132949999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.2012990416666582,
        "durationTicks": 740,
        "midi": 45,
        "name": "A2",
        "ticks": 67200,
        "time": 109.09093999999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333203,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 67440,
        "time": 109.48055049999999,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 67440,
        "time": 109.48055049999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333437,
        "durationTicks": 196,
        "midi": 55,
        "name": "G3",
        "ticks": 67920,
        "time": 110.25977149999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 67920,
        "time": 110.25977149999999,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.4740261083333195,
        "durationTicks": 292,
        "midi": 40,
        "name": "E2",
        "ticks": 68160,
        "time": 110.64938199999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 52,
        "name": "E3",
        "ticks": 68400,
        "time": 111.03899249999999,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 68400,
        "time": 111.03899249999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.40909102499999506,
        "durationTicks": 252,
        "midi": 43,
        "name": "G2",
        "ticks": 68640,
        "time": 111.428603,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.30519489166668734,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 68880,
        "time": 111.81821349999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 68880,
        "time": 111.81821349999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 1.4740263916666834,
        "durationTicks": 908,
        "midi": 45,
        "name": "A2",
        "ticks": 69120,
        "time": 112.20782399999999,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 69360,
        "time": 112.59743449999999,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.5194806666666523,
        "durationTicks": 320,
        "midi": 55,
        "name": "G3",
        "ticks": 69360,
        "time": 112.59743449999999,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.5194806666666523,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 69840,
        "time": 113.3766555,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5389611916666581,
        "durationTicks": 332,
        "midi": 55,
        "name": "G3",
        "ticks": 69840,
        "time": 113.3766555,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.4610393749999986,
        "durationTicks": 900,
        "midi": 45,
        "name": "A2",
        "ticks": 70080,
        "time": 113.76626599999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 70320,
        "time": 114.15587649999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 70320,
        "time": 114.15587649999999,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 55,
        "name": "G3",
        "ticks": 70800,
        "time": 114.9350975,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 70800,
        "time": 114.9350975,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333362,
        "durationTicks": 268,
        "midi": 52,
        "name": "E3",
        "ticks": 71040,
        "time": 115.32470799999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 71280,
        "time": 115.71431849999999,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.480519616666669,
        "durationTicks": 296,
        "midi": 59,
        "name": "B3",
        "ticks": 71280,
        "time": 115.71431849999999,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.49350663333332534,
        "durationTicks": 304,
        "midi": 64,
        "name": "E4",
        "ticks": 71280,
        "time": 115.71431849999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 71760,
        "time": 116.4935395,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 71760,
        "time": 116.4935395,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.6233768000000026,
        "durationTicks": 384,
        "midi": 64,
        "name": "E4",
        "ticks": 71760,
        "time": 116.4935395,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 72240,
        "time": 117.27276049999999,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.603896275000011,
        "durationTicks": 372,
        "midi": 64,
        "name": "E4",
        "ticks": 72240,
        "time": 117.27276049999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 72240,
        "time": 117.27276049999999,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 59,
        "name": "B3",
        "ticks": 72720,
        "time": 118.0519815,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 64,
        "name": "E4",
        "ticks": 72720,
        "time": 118.0519815,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 67,
        "name": "G4",
        "ticks": 72720,
        "time": 118.0519815,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 2.766234550000007,
        "durationTicks": 1704,
        "midi": 50,
        "name": "D3",
        "ticks": 72960,
        "time": 118.44159199999999,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5909092583333262,
        "durationTicks": 364,
        "midi": 62,
        "name": "D4",
        "ticks": 73200,
        "time": 118.83120249999999,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 57,
        "name": "A3",
        "ticks": 73200,
        "time": 118.83120249999999,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5714287333333203,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 73200,
        "time": 118.83120249999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 73680,
        "time": 119.6104235,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5909092583333262,
        "durationTicks": 364,
        "midi": 65,
        "name": "F4",
        "ticks": 73680,
        "time": 119.6104235,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 73680,
        "time": 119.6104235,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 65,
        "name": "F4",
        "ticks": 74160,
        "time": 120.38964449999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 74160,
        "time": 120.38964449999999,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5714287333333203,
        "durationTicks": 352,
        "midi": 62,
        "name": "D4",
        "ticks": 74160,
        "time": 120.38964449999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 74640,
        "time": 121.1688655,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37012997499999756,
        "durationTicks": 228,
        "midi": 57,
        "name": "A3",
        "ticks": 74640,
        "time": 121.1688655,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3116883999999942,
        "durationTicks": 192,
        "midi": 65,
        "name": "F4",
        "ticks": 74640,
        "time": 121.1688655,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.24026009166667,
        "durationTicks": 764,
        "midi": 45,
        "name": "A2",
        "ticks": 74880,
        "time": 121.55847599999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.610389783333332,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 75120,
        "time": 121.94808649999999,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6233768000000168,
        "durationTicks": 384,
        "midi": 57,
        "name": "A3",
        "ticks": 75120,
        "time": 121.94808649999999,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.6233768000000168,
        "durationTicks": 384,
        "midi": 60,
        "name": "C4",
        "ticks": 75120,
        "time": 121.94808649999999,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2272727916666497,
        "durationTicks": 140,
        "midi": 64,
        "name": "E4",
        "ticks": 75600,
        "time": 122.7273075,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2402598083333345,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 75600,
        "time": 122.7273075,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2662338416666614,
        "durationTicks": 164,
        "midi": 57,
        "name": "A3",
        "ticks": 75600,
        "time": 122.7273075,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 40,
        "name": "E2",
        "ticks": 75840,
        "time": 123.11691799999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 52,
        "name": "E3",
        "ticks": 76080,
        "time": 123.50652849999999,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3246754166666648,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 76080,
        "time": 123.50652849999999,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 59,
        "name": "B3",
        "ticks": 76080,
        "time": 123.50652849999999,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.4740261083333195,
        "durationTicks": 292,
        "midi": 43,
        "name": "G2",
        "ticks": 76320,
        "time": 123.89613899999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3441559416666564,
        "durationTicks": 212,
        "midi": 55,
        "name": "G3",
        "ticks": 76560,
        "time": 124.2857495,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 62,
        "name": "D4",
        "ticks": 76560,
        "time": 124.2857495,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3441559416666564,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 76560,
        "time": 124.2857495,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 2.285714933333338,
        "durationTicks": 1408,
        "midi": 52,
        "name": "E3",
        "ticks": 76800,
        "time": 124.67535999999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 2.3376630000000063,
        "durationTicks": 1440,
        "midi": 60,
        "name": "C4",
        "ticks": 76800,
        "time": 124.67535999999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.331169491666685,
        "durationTicks": 1436,
        "midi": 57,
        "name": "A3",
        "ticks": 76800,
        "time": 124.67535999999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.305195458333344,
        "durationTicks": 1420,
        "midi": 45,
        "name": "A2",
        "ticks": 76800,
        "time": 124.67535999999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5064936499999959,
        "durationTicks": 312,
        "midi": 45,
        "name": "A2",
        "ticks": 78720,
        "time": 127.792244,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.44805207499999256,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 78960,
        "time": 128.1818545,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.4285715500000151,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 78960,
        "time": 128.1818545,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333504,
        "durationTicks": 268,
        "midi": 45,
        "name": "A2",
        "ticks": 79200,
        "time": 128.571465,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 55,
        "name": "G3",
        "ticks": 79440,
        "time": 128.9610755,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 60,
        "name": "C4",
        "ticks": 79440,
        "time": 128.9610755,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 40,
        "name": "E2",
        "ticks": 79680,
        "time": 129.350686,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 52,
        "name": "E3",
        "ticks": 79920,
        "time": 129.7402965,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 79920,
        "time": 129.7402965,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 43,
        "name": "G2",
        "ticks": 80160,
        "time": 130.129907,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 80400,
        "time": 130.51951749999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 80400,
        "time": 130.51951749999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 2.7922085833333483,
        "durationTicks": 1720,
        "midi": 45,
        "name": "A2",
        "ticks": 80640,
        "time": 130.90912799999998,
        "velocity": 0.8267716535433071
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 80880,
        "time": 131.29873849999998,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 80880,
        "time": 131.29873849999998,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 55,
        "name": "G3",
        "ticks": 81360,
        "time": 132.0779595,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 60,
        "name": "C4",
        "ticks": 81360,
        "time": 132.0779595,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.6168832916666531,
        "durationTicks": 380,
        "midi": 60,
        "name": "C4",
        "ticks": 81840,
        "time": 132.8571805,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.6298703083333237,
        "durationTicks": 388,
        "midi": 55,
        "name": "G3",
        "ticks": 81840,
        "time": 132.8571805,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 82320,
        "time": 133.63640149999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37662348333333284,
        "durationTicks": 232,
        "midi": 60,
        "name": "C4",
        "ticks": 82320,
        "time": 133.63640149999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 1.2012990416666582,
        "durationTicks": 740,
        "midi": 45,
        "name": "A2",
        "ticks": 82560,
        "time": 134.02601199999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 55,
        "name": "G3",
        "ticks": 82800,
        "time": 134.41562249999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 60,
        "name": "C4",
        "ticks": 82800,
        "time": 134.41562249999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333437,
        "durationTicks": 196,
        "midi": 55,
        "name": "G3",
        "ticks": 83280,
        "time": 135.1948435,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 83280,
        "time": 135.1948435,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.4740261083333053,
        "durationTicks": 292,
        "midi": 40,
        "name": "E2",
        "ticks": 83520,
        "time": 135.584454,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 52,
        "name": "E3",
        "ticks": 83760,
        "time": 135.9740645,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 83760,
        "time": 135.9740645,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.40909102499998085,
        "durationTicks": 252,
        "midi": 43,
        "name": "G2",
        "ticks": 84000,
        "time": 136.363675,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.30519489166670155,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 84240,
        "time": 136.75328549999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 59,
        "name": "B3",
        "ticks": 84240,
        "time": 136.75328549999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 1.4740263916666834,
        "durationTicks": 908,
        "midi": 45,
        "name": "A2",
        "ticks": 84480,
        "time": 137.14289599999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 84720,
        "time": 137.53250649999998,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.5194806666666523,
        "durationTicks": 320,
        "midi": 55,
        "name": "G3",
        "ticks": 84720,
        "time": 137.53250649999998,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.5194806666666523,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 85200,
        "time": 138.3117275,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5389611916666581,
        "durationTicks": 332,
        "midi": 55,
        "name": "G3",
        "ticks": 85200,
        "time": 138.3117275,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.4610393749999844,
        "durationTicks": 900,
        "midi": 45,
        "name": "A2",
        "ticks": 85440,
        "time": 138.701338,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 85680,
        "time": 139.0909485,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 85680,
        "time": 139.0909485,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.24025980833332028,
        "durationTicks": 148,
        "midi": 55,
        "name": "G3",
        "ticks": 86160,
        "time": 139.8701695,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.24025980833332028,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 86160,
        "time": 139.8701695,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.4350650583333504,
        "durationTicks": 268,
        "midi": 52,
        "name": "E3",
        "ticks": 86400,
        "time": 140.25977999999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 86640,
        "time": 140.64939049999998,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.480519616666669,
        "durationTicks": 296,
        "midi": 59,
        "name": "B3",
        "ticks": 86640,
        "time": 140.64939049999998,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.49350663333333955,
        "durationTicks": 304,
        "midi": 64,
        "name": "E4",
        "ticks": 86640,
        "time": 140.64939049999998,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 87120,
        "time": 141.4286115,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 87120,
        "time": 141.4286115,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.6233768000000168,
        "durationTicks": 384,
        "midi": 64,
        "name": "E4",
        "ticks": 87120,
        "time": 141.4286115,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 87600,
        "time": 142.2078325,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.603896275000011,
        "durationTicks": 372,
        "midi": 64,
        "name": "E4",
        "ticks": 87600,
        "time": 142.2078325,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 87600,
        "time": 142.2078325,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 59,
        "name": "B3",
        "ticks": 88080,
        "time": 142.9870535,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 64,
        "name": "E4",
        "ticks": 88080,
        "time": 142.9870535,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 67,
        "name": "G4",
        "ticks": 88080,
        "time": 142.9870535,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 2.766234550000007,
        "durationTicks": 1704,
        "midi": 50,
        "name": "D3",
        "ticks": 88320,
        "time": 143.37666399999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5909092583333404,
        "durationTicks": 364,
        "midi": 62,
        "name": "D4",
        "ticks": 88560,
        "time": 143.76627449999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 57,
        "name": "A3",
        "ticks": 88560,
        "time": 143.76627449999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 88560,
        "time": 143.76627449999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 89040,
        "time": 144.5454955,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5909092583333404,
        "durationTicks": 364,
        "midi": 65,
        "name": "F4",
        "ticks": 89040,
        "time": 144.5454955,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 89040,
        "time": 144.5454955,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 65,
        "name": "F4",
        "ticks": 89520,
        "time": 145.3247165,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 89520,
        "time": 145.3247165,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 62,
        "name": "D4",
        "ticks": 89520,
        "time": 145.3247165,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 90000,
        "time": 146.1039375,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37012997499999756,
        "durationTicks": 228,
        "midi": 57,
        "name": "A3",
        "ticks": 90000,
        "time": 146.1039375,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.31168839999998,
        "durationTicks": 192,
        "midi": 65,
        "name": "F4",
        "ticks": 90000,
        "time": 146.1039375,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.24026009166667,
        "durationTicks": 764,
        "midi": 45,
        "name": "A2",
        "ticks": 90240,
        "time": 146.49354799999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.6103897833333463,
        "durationTicks": 376,
        "midi": 64,
        "name": "E4",
        "ticks": 90480,
        "time": 146.88315849999998,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6233768000000168,
        "durationTicks": 384,
        "midi": 57,
        "name": "A3",
        "ticks": 90480,
        "time": 146.88315849999998,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.6233768000000168,
        "durationTicks": 384,
        "midi": 60,
        "name": "C4",
        "ticks": 90480,
        "time": 146.88315849999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.2272727916666497,
        "durationTicks": 140,
        "midi": 64,
        "name": "E4",
        "ticks": 90960,
        "time": 147.6623795,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2402598083333487,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 90960,
        "time": 147.6623795,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2662338416666614,
        "durationTicks": 164,
        "midi": 57,
        "name": "A3",
        "ticks": 90960,
        "time": 147.6623795,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.4675325999999984,
        "durationTicks": 288,
        "midi": 40,
        "name": "E2",
        "ticks": 91200,
        "time": 148.05199,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 52,
        "name": "E3",
        "ticks": 91440,
        "time": 148.4416005,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 55,
        "name": "G3",
        "ticks": 91440,
        "time": 148.4416005,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 59,
        "name": "B3",
        "ticks": 91440,
        "time": 148.4416005,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.4740261083333053,
        "durationTicks": 292,
        "midi": 43,
        "name": "G2",
        "ticks": 91680,
        "time": 148.831211,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.3441559416666564,
        "durationTicks": 212,
        "midi": 55,
        "name": "G3",
        "ticks": 91920,
        "time": 149.2208215,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 62,
        "name": "D4",
        "ticks": 91920,
        "time": 149.2208215,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3441559416666564,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 91920,
        "time": 149.2208215,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 3.006494358333299,
        "durationTicks": 1852,
        "midi": 45,
        "name": "A2",
        "ticks": 92160,
        "time": 149.610432,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 57,
        "name": "A3",
        "ticks": 92400,
        "time": 150.00004249999998,
        "velocity": 0.4094488188976378
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 92400,
        "time": 150.00004249999998,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.525974175000016,
        "durationTicks": 324,
        "midi": 64,
        "name": "E4",
        "ticks": 92400,
        "time": 150.00004249999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.40909102500000927,
        "durationTicks": 252,
        "midi": 64,
        "name": "E4",
        "ticks": 92880,
        "time": 150.77926349999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.40909102500000927,
        "durationTicks": 252,
        "midi": 57,
        "name": "A3",
        "ticks": 92880,
        "time": 150.77926349999998,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 60,
        "name": "C4",
        "ticks": 92880,
        "time": 150.77926349999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.49350663333331113,
        "durationTicks": 304,
        "midi": 60,
        "name": "C4",
        "ticks": 93360,
        "time": 151.5584845,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 57,
        "name": "A3",
        "ticks": 93360,
        "time": 151.5584845,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 64,
        "name": "E4",
        "ticks": 93360,
        "time": 151.5584845,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.22077928333331442,
        "durationTicks": 136,
        "midi": 64,
        "name": "E4",
        "ticks": 93840,
        "time": 152.3377055,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.20129875833330857,
        "durationTicks": 124,
        "midi": 57,
        "name": "A3",
        "ticks": 93840,
        "time": 152.3377055,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.20779226666667228,
        "durationTicks": 128,
        "midi": 60,
        "name": "C4",
        "ticks": 93840,
        "time": 152.3377055,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.9220781833333263,
        "durationTicks": 568,
        "midi": 52,
        "name": "E3",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.9740262499999801,
        "durationTicks": 600,
        "midi": 45,
        "name": "A2",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.9285716916666615,
        "durationTicks": 572,
        "midi": 64,
        "name": "E4",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.993506774999986,
        "durationTicks": 612,
        "midi": 57,
        "name": "A3",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.9545457249999743,
        "durationTicks": 588,
        "midi": 60,
        "name": "C4",
        "ticks": 105600,
        "time": 171.42862,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 52,
        "name": "E3",
        "ticks": 106560,
        "time": 172.98706199999998,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.2662338416666614,
        "durationTicks": 164,
        "midi": 40,
        "name": "E2",
        "ticks": 106560,
        "time": 172.98706199999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 106560,
        "time": 172.98706199999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 59,
        "name": "B3",
        "ticks": 106560,
        "time": 172.98706199999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 50,
        "name": "D3",
        "ticks": 107040,
        "time": 173.766283,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 59,
        "name": "B3",
        "ticks": 107040,
        "time": 173.766283,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 55,
        "name": "G3",
        "ticks": 107040,
        "time": 173.766283,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 43,
        "name": "G2",
        "ticks": 107040,
        "time": 173.766283,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 2.285714933333338,
        "durationTicks": 1408,
        "midi": 52,
        "name": "E3",
        "ticks": 107520,
        "time": 174.545504,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 2.337662999999992,
        "durationTicks": 1440,
        "midi": 60,
        "name": "C4",
        "ticks": 107520,
        "time": 174.545504,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 2.3311694916666568,
        "durationTicks": 1436,
        "midi": 57,
        "name": "A3",
        "ticks": 107520,
        "time": 174.545504,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 2.305195458333344,
        "durationTicks": 1420,
        "midi": 45,
        "name": "A2",
        "ticks": 107520,
        "time": 174.545504,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 45,
        "name": "A2",
        "ticks": 109440,
        "time": 177.662388,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.44805207499999256,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 109680,
        "time": 178.0519985,
        "velocity": 0.4645669291338583
    },
    {
        "duration": 0.4285715499999867,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 109680,
        "time": 178.0519985,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.435065058333322,
        "durationTicks": 268,
        "midi": 45,
        "name": "A2",
        "ticks": 109920,
        "time": 178.441609,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3506494499999917,
        "durationTicks": 216,
        "midi": 55,
        "name": "G3",
        "ticks": 110160,
        "time": 178.83121949999997,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.29220787500000256,
        "durationTicks": 180,
        "midi": 60,
        "name": "C4",
        "ticks": 110160,
        "time": 178.83121949999997,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 40,
        "name": "E2",
        "ticks": 110400,
        "time": 179.22082999999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 52,
        "name": "E3",
        "ticks": 110640,
        "time": 179.61044049999998,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.3896105000000034,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 110640,
        "time": 179.61044049999998,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 43,
        "name": "G2",
        "ticks": 110880,
        "time": 180.00005099999998,
        "velocity": 0.7716535433070866
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 111120,
        "time": 180.3896615,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.3961040083333387,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 111120,
        "time": 180.3896615,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 1.4740263916666834,
        "durationTicks": 908,
        "midi": 45,
        "name": "A2",
        "ticks": 111360,
        "time": 180.779272,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.5064936499999817,
        "durationTicks": 312,
        "midi": 60,
        "name": "C4",
        "ticks": 111600,
        "time": 181.1688825,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.5194806666666523,
        "durationTicks": 320,
        "midi": 55,
        "name": "G3",
        "ticks": 111600,
        "time": 181.1688825,
        "velocity": 0.41732283464566927
    },
    {
        "duration": 0.5194806666666807,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 112080,
        "time": 181.94810349999997,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.5389611916666865,
        "durationTicks": 332,
        "midi": 55,
        "name": "G3",
        "ticks": 112080,
        "time": 181.94810349999997,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.4610393750000128,
        "durationTicks": 900,
        "midi": 45,
        "name": "A2",
        "ticks": 112320,
        "time": 182.33771399999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 60,
        "name": "C4",
        "ticks": 112560,
        "time": 182.72732449999998,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 55,
        "name": "G3",
        "ticks": 112560,
        "time": 182.72732449999998,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.2402598083333487,
        "durationTicks": 148,
        "midi": 55,
        "name": "G3",
        "ticks": 113040,
        "time": 183.5065455,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.2402598083333487,
        "durationTicks": 148,
        "midi": 60,
        "name": "C4",
        "ticks": 113040,
        "time": 183.5065455,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.435065058333322,
        "durationTicks": 268,
        "midi": 52,
        "name": "E3",
        "ticks": 113280,
        "time": 183.896156,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5000001416666748,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 113520,
        "time": 184.2857665,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.480519616666669,
        "durationTicks": 296,
        "midi": 59,
        "name": "B3",
        "ticks": 113520,
        "time": 184.2857665,
        "velocity": 0.47244094488188976
    },
    {
        "duration": 0.49350663333331113,
        "durationTicks": 304,
        "midi": 64,
        "name": "E4",
        "ticks": 113520,
        "time": 184.2857665,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666667041,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 114000,
        "time": 185.06498749999997,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5779222416666983,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 114000,
        "time": 185.06498749999997,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.6233768000000168,
        "durationTicks": 384,
        "midi": 64,
        "name": "E4",
        "ticks": 114000,
        "time": 185.06498749999997,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5779222416666698,
        "durationTicks": 356,
        "midi": 59,
        "name": "B3",
        "ticks": 114480,
        "time": 185.84420849999998,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.603896275000011,
        "durationTicks": 372,
        "midi": 64,
        "name": "E4",
        "ticks": 114480,
        "time": 185.84420849999998,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.5974027666666757,
        "durationTicks": 368,
        "midi": 67,
        "name": "G4",
        "ticks": 114480,
        "time": 185.84420849999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 59,
        "name": "B3",
        "ticks": 114960,
        "time": 186.6234295,
        "velocity": 0.4251968503937008
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 64,
        "name": "E4",
        "ticks": 114960,
        "time": 186.6234295,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 67,
        "name": "G4",
        "ticks": 114960,
        "time": 186.6234295,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 2.766234550000007,
        "durationTicks": 1704,
        "midi": 50,
        "name": "D3",
        "ticks": 115200,
        "time": 187.01304,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.590909258333312,
        "durationTicks": 364,
        "midi": 62,
        "name": "D4",
        "ticks": 115440,
        "time": 187.4026505,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5844157500000051,
        "durationTicks": 360,
        "midi": 57,
        "name": "A3",
        "ticks": 115440,
        "time": 187.4026505,
        "velocity": 0.5039370078740157
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 65,
        "name": "F4",
        "ticks": 115440,
        "time": 187.4026505,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.6103897833333178,
        "durationTicks": 376,
        "midi": 62,
        "name": "D4",
        "ticks": 115920,
        "time": 188.1818715,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.590909258333312,
        "durationTicks": 364,
        "midi": 65,
        "name": "F4",
        "ticks": 115920,
        "time": 188.1818715,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.6103897833333178,
        "durationTicks": 376,
        "midi": 57,
        "name": "A3",
        "ticks": 115920,
        "time": 188.1818715,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 65,
        "name": "F4",
        "ticks": 116400,
        "time": 188.96109249999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.558441716666664,
        "durationTicks": 344,
        "midi": 57,
        "name": "A3",
        "ticks": 116400,
        "time": 188.96109249999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 62,
        "name": "D4",
        "ticks": 116400,
        "time": 188.96109249999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 62,
        "name": "D4",
        "ticks": 116880,
        "time": 189.74031349999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 0.37012997499999756,
        "durationTicks": 228,
        "midi": 57,
        "name": "A3",
        "ticks": 116880,
        "time": 189.74031349999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 65,
        "name": "F4",
        "ticks": 116880,
        "time": 189.74031349999998,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 1.2922081583333238,
        "durationTicks": 796,
        "midi": 45,
        "name": "A2",
        "ticks": 117120,
        "time": 190.129924,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 64,
        "name": "E4",
        "ticks": 117360,
        "time": 190.5195345,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 117360,
        "time": 190.5195345,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 57,
        "name": "A3",
        "ticks": 117360,
        "time": 190.5195345,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 64,
        "name": "E4",
        "ticks": 117840,
        "time": 191.2987555,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.33766243333332113,
        "durationTicks": 208,
        "midi": 57,
        "name": "A3",
        "ticks": 117840,
        "time": 191.2987555,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333153,
        "durationTicks": 196,
        "midi": 60,
        "name": "C4",
        "ticks": 117840,
        "time": 191.2987555,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.40909102500000927,
        "durationTicks": 252,
        "midi": 40,
        "name": "E2",
        "ticks": 118080,
        "time": 191.68836599999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 52,
        "name": "E3",
        "ticks": 118320,
        "time": 192.07797649999998,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 55,
        "name": "G3",
        "ticks": 118320,
        "time": 192.07797649999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.34415594166668484,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 118320,
        "time": 192.07797649999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.37012997499999756,
        "durationTicks": 228,
        "midi": 43,
        "name": "G2",
        "ticks": 118560,
        "time": 192.46758699999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 118800,
        "time": 192.85719749999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 62,
        "name": "D4",
        "ticks": 118800,
        "time": 192.85719749999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 59,
        "name": "B3",
        "ticks": 118800,
        "time": 192.85719749999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 2.993507341666657,
        "durationTicks": 1844,
        "midi": 45,
        "name": "A2",
        "ticks": 119040,
        "time": 193.246808,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.5064936500000101,
        "durationTicks": 312,
        "midi": 57,
        "name": "A3",
        "ticks": 119280,
        "time": 193.6364185,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.512987158333317,
        "durationTicks": 316,
        "midi": 60,
        "name": "C4",
        "ticks": 119280,
        "time": 193.6364185,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.512987158333317,
        "durationTicks": 316,
        "midi": 64,
        "name": "E4",
        "ticks": 119280,
        "time": 193.6364185,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5389611916666581,
        "durationTicks": 332,
        "midi": 60,
        "name": "C4",
        "ticks": 119760,
        "time": 194.4156395,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5519482083333287,
        "durationTicks": 340,
        "midi": 57,
        "name": "A3",
        "ticks": 119760,
        "time": 194.4156395,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.5259741749999876,
        "durationTicks": 324,
        "midi": 64,
        "name": "E4",
        "ticks": 119760,
        "time": 194.4156395,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5324676833333513,
        "durationTicks": 328,
        "midi": 64,
        "name": "E4",
        "ticks": 120240,
        "time": 195.19486049999998,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5519482083333571,
        "durationTicks": 340,
        "midi": 60,
        "name": "C4",
        "ticks": 120240,
        "time": 195.19486049999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5519482083333571,
        "durationTicks": 340,
        "midi": 57,
        "name": "A3",
        "ticks": 120240,
        "time": 195.19486049999998,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.279220858333332,
        "durationTicks": 172,
        "midi": 57,
        "name": "A3",
        "ticks": 120720,
        "time": 195.97408149999998,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 64,
        "name": "E4",
        "ticks": 120720,
        "time": 195.97408149999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.2727273499999967,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 120720,
        "time": 195.97408149999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.2922081583333238,
        "durationTicks": 796,
        "midi": 45,
        "name": "A2",
        "ticks": 120960,
        "time": 196.363692,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 64,
        "name": "E4",
        "ticks": 121200,
        "time": 196.7533025,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 121200,
        "time": 196.7533025,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5714287333333061,
        "durationTicks": 352,
        "midi": 57,
        "name": "A3",
        "ticks": 121200,
        "time": 196.7533025,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 64,
        "name": "E4",
        "ticks": 121680,
        "time": 197.5325235,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.33766243333332113,
        "durationTicks": 208,
        "midi": 57,
        "name": "A3",
        "ticks": 121680,
        "time": 197.5325235,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333153,
        "durationTicks": 196,
        "midi": 60,
        "name": "C4",
        "ticks": 121680,
        "time": 197.5325235,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.40909102500000927,
        "durationTicks": 252,
        "midi": 40,
        "name": "E2",
        "ticks": 121920,
        "time": 197.92213399999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 52,
        "name": "E3",
        "ticks": 122160,
        "time": 198.31174449999997,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 55,
        "name": "G3",
        "ticks": 122160,
        "time": 198.31174449999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.34415594166668484,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 122160,
        "time": 198.31174449999997,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.37012997499999756,
        "durationTicks": 228,
        "midi": 43,
        "name": "G2",
        "ticks": 122400,
        "time": 198.70135499999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 122640,
        "time": 199.09096549999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 62,
        "name": "D4",
        "ticks": 122640,
        "time": 199.09096549999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.32467541666665056,
        "durationTicks": 200,
        "midi": 59,
        "name": "B3",
        "ticks": 122640,
        "time": 199.09096549999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 2.993507341666657,
        "durationTicks": 1844,
        "midi": 45,
        "name": "A2",
        "ticks": 122880,
        "time": 199.48057599999999,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.5064936499999817,
        "durationTicks": 312,
        "midi": 57,
        "name": "A3",
        "ticks": 123120,
        "time": 199.8701865,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5129871583333454,
        "durationTicks": 316,
        "midi": 60,
        "name": "C4",
        "ticks": 123120,
        "time": 199.8701865,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.5129871583333454,
        "durationTicks": 316,
        "midi": 64,
        "name": "E4",
        "ticks": 123120,
        "time": 199.8701865,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5389611916666581,
        "durationTicks": 332,
        "midi": 60,
        "name": "C4",
        "ticks": 123600,
        "time": 200.6494075,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5519482083333003,
        "durationTicks": 340,
        "midi": 57,
        "name": "A3",
        "ticks": 123600,
        "time": 200.6494075,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.5259741749999876,
        "durationTicks": 324,
        "midi": 64,
        "name": "E4",
        "ticks": 123600,
        "time": 200.6494075,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5324676833333513,
        "durationTicks": 328,
        "midi": 64,
        "name": "E4",
        "ticks": 124080,
        "time": 201.42862849999997,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5519482083333287,
        "durationTicks": 340,
        "midi": 60,
        "name": "C4",
        "ticks": 124080,
        "time": 201.42862849999997,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5519482083333287,
        "durationTicks": 340,
        "midi": 57,
        "name": "A3",
        "ticks": 124080,
        "time": 201.42862849999997,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2792208583333604,
        "durationTicks": 172,
        "midi": 57,
        "name": "A3",
        "ticks": 124560,
        "time": 202.20784949999998,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 64,
        "name": "E4",
        "ticks": 124560,
        "time": 202.20784949999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.2727273500000251,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 124560,
        "time": 202.20784949999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.2922081583333522,
        "durationTicks": 796,
        "midi": 45,
        "name": "A2",
        "ticks": 124800,
        "time": 202.59745999999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 64,
        "name": "E4",
        "ticks": 125040,
        "time": 202.9870705,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 125040,
        "time": 202.9870705,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 57,
        "name": "A3",
        "ticks": 125040,
        "time": 202.9870705,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3051948916666447,
        "durationTicks": 188,
        "midi": 64,
        "name": "E4",
        "ticks": 125520,
        "time": 203.7662915,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.33766243333332113,
        "durationTicks": 208,
        "midi": 57,
        "name": "A3",
        "ticks": 125520,
        "time": 203.7662915,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333437,
        "durationTicks": 196,
        "midi": 60,
        "name": "C4",
        "ticks": 125520,
        "time": 203.7662915,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.40909102499998085,
        "durationTicks": 252,
        "midi": 40,
        "name": "E2",
        "ticks": 125760,
        "time": 204.155902,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 52,
        "name": "E3",
        "ticks": 126000,
        "time": 204.54551249999997,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 55,
        "name": "G3",
        "ticks": 126000,
        "time": 204.54551249999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.34415594166668484,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 126000,
        "time": 204.54551249999997,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.370129975000026,
        "durationTicks": 228,
        "midi": 43,
        "name": "G2",
        "ticks": 126240,
        "time": 204.93512299999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 126480,
        "time": 205.32473349999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 62,
        "name": "D4",
        "ticks": 126480,
        "time": 205.32473349999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.324675416666679,
        "durationTicks": 200,
        "midi": 59,
        "name": "B3",
        "ticks": 126480,
        "time": 205.32473349999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 2.993507341666657,
        "durationTicks": 1844,
        "midi": 45,
        "name": "A2",
        "ticks": 126720,
        "time": 205.71434399999998,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.5064936499999817,
        "durationTicks": 312,
        "midi": 57,
        "name": "A3",
        "ticks": 126960,
        "time": 206.1039545,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.5129871583333454,
        "durationTicks": 316,
        "midi": 60,
        "name": "C4",
        "ticks": 126960,
        "time": 206.1039545,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.5129871583333454,
        "durationTicks": 316,
        "midi": 64,
        "name": "E4",
        "ticks": 126960,
        "time": 206.1039545,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5389611916666581,
        "durationTicks": 332,
        "midi": 60,
        "name": "C4",
        "ticks": 127440,
        "time": 206.8831755,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5519482083333003,
        "durationTicks": 340,
        "midi": 57,
        "name": "A3",
        "ticks": 127440,
        "time": 206.8831755,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.5259741749999876,
        "durationTicks": 324,
        "midi": 64,
        "name": "E4",
        "ticks": 127440,
        "time": 206.8831755,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5324676833333513,
        "durationTicks": 328,
        "midi": 64,
        "name": "E4",
        "ticks": 127920,
        "time": 207.66239649999997,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.5519482083333287,
        "durationTicks": 340,
        "midi": 60,
        "name": "C4",
        "ticks": 127920,
        "time": 207.66239649999997,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5519482083333287,
        "durationTicks": 340,
        "midi": 57,
        "name": "A3",
        "ticks": 127920,
        "time": 207.66239649999997,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2792208583333604,
        "durationTicks": 172,
        "midi": 57,
        "name": "A3",
        "ticks": 128400,
        "time": 208.44161749999998,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.29870138333333784,
        "durationTicks": 184,
        "midi": 64,
        "name": "E4",
        "ticks": 128400,
        "time": 208.44161749999998,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.2727273500000251,
        "durationTicks": 168,
        "midi": 60,
        "name": "C4",
        "ticks": 128400,
        "time": 208.44161749999998,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 1.2922081583333522,
        "durationTicks": 796,
        "midi": 45,
        "name": "A2",
        "ticks": 128640,
        "time": 208.83122799999998,
        "velocity": 0.7322834645669292
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 64,
        "name": "E4",
        "ticks": 128880,
        "time": 209.22083849999999,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 60,
        "name": "C4",
        "ticks": 128880,
        "time": 209.22083849999999,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.5714287333333345,
        "durationTicks": 352,
        "midi": 57,
        "name": "A3",
        "ticks": 128880,
        "time": 209.22083849999999,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.3051948916666447,
        "durationTicks": 188,
        "midi": 64,
        "name": "E4",
        "ticks": 129360,
        "time": 210.0000595,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 0.33766243333332113,
        "durationTicks": 208,
        "midi": 57,
        "name": "A3",
        "ticks": 129360,
        "time": 210.0000595,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.3181819083333437,
        "durationTicks": 196,
        "midi": 60,
        "name": "C4",
        "ticks": 129360,
        "time": 210.0000595,
        "velocity": 0.7480314960629921
    },
    {
        "duration": 0.40909102499998085,
        "durationTicks": 252,
        "midi": 40,
        "name": "E2",
        "ticks": 129600,
        "time": 210.38967,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.3116884000000084,
        "durationTicks": 192,
        "midi": 52,
        "name": "E3",
        "ticks": 129840,
        "time": 210.77928049999997,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 55,
        "name": "G3",
        "ticks": 129840,
        "time": 210.77928049999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.34415594166668484,
        "durationTicks": 212,
        "midi": 59,
        "name": "B3",
        "ticks": 129840,
        "time": 210.77928049999997,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.370129975000026,
        "durationTicks": 228,
        "midi": 43,
        "name": "G2",
        "ticks": 130080,
        "time": 211.16889099999997,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.30519489166667313,
        "durationTicks": 188,
        "midi": 55,
        "name": "G3",
        "ticks": 130320,
        "time": 211.55850149999998,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.33116892500001427,
        "durationTicks": 204,
        "midi": 62,
        "name": "D4",
        "ticks": 130320,
        "time": 211.55850149999998,
        "velocity": 0.7007874015748031
    },
    {
        "duration": 0.324675416666679,
        "durationTicks": 200,
        "midi": 59,
        "name": "B3",
        "ticks": 130320,
        "time": 211.55850149999998,
        "velocity": 0.7165354330708661
    },
    {
        "duration": 4.551949341666642,
        "durationTicks": 2804,
        "midi": 45,
        "name": "A2",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 4.571429866666676,
        "durationTicks": 2816,
        "midi": 64,
        "name": "E4",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.5826771653543307
    },
    {
        "duration": 4.532468816666665,
        "durationTicks": 2792,
        "midi": 52,
        "name": "E3",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 4.545455833333335,
        "durationTicks": 2800,
        "midi": 57,
        "name": "A3",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 4.545455833333335,
        "durationTicks": 2800,
        "midi": 60,
        "name": "C4",
        "ticks": 130560,
        "time": 211.94811199999998,
        "velocity": 0.6141732283464567
    }
];

// console.log({recordingNotes});

const recordingPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#008b8b';
    instrMapped.color = '#64b5f6'; // human blue

    // instrMapped.originalPosition.z -= 15;
    instrMapped.originalPosition.z -= 10;

    instrMapped.duration = datum.duration / 2;


    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingFirstNotes);      // twinkle twinkle little star
// }, recordingSecondNotes);  // bah bah black sheep
// }, recordingThirdNotes);  // alphabet song

recordingPart.loop = true;
recordingPart.start("0:0:0");

const recordingSecondPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#0000cd';
    // instrMapped.color = '#003366'; 

    instrMapped.color = '#64b5f6'; // human blue

    instrMapped.originalPosition.z += 15;

    instrMapped.duration = datum.duration / 2;


    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingSecondNotes);  // bah bah black sheep

// recordingSecondPart.loop = true;
// recordingSecondPart.start("0:0:0");
recordingSecondPart.start("1:0:0");