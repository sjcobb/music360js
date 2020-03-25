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
Tone.Transport.timeSignature = 12; // v0.4, v0.5

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
// Store.polySynth.volume.value = -6;

// Store.polySynth.set("detune", +1200); // octave = 12 semitones of 100 cents each
Store.polySynth.set("detune", -1200);

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
const playerKick = new Player("./assets/sounds/drum-kits/808/808-kick-vm.mp3").toMaster(); // medium
// const playerKick = new Player("./assets/sounds/drum-kits/808/808-kick-vl.mp3").toMaster(); // low

// const playerKick = new Player("./assets/sounds/drum-kits/hiphop/kick.mp3").toMaster(); //v2, v3, v4 (boring, but not distorted)
playerKick.volume.value = +2;

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
        "duration": 0.42604166666666665,
        "durationTicks": 818,
        "midi": 54,
        "name": "F#3",
        "ticks": 897,
        "time": 0.4671875,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.4281250000000001,
        "durationTicks": 822,
        "midi": 57,
        "name": "A3",
        "ticks": 1704,
        "time": 0.8875,
        "velocity": 0.3464566929133858
    },
    {
        "duration": 0.7333333333333332,
        "durationTicks": 1408,
        "midi": 64,
        "name": "E4",
        "ticks": 2435,
        "time": 1.2682291666666667,
        "velocity": 0.3700787401574803
    },
    {
        "duration": 0.4161458333333332,
        "durationTicks": 799,
        "midi": 54,
        "name": "F#3",
        "ticks": 3873,
        "time": 2.0171875,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.44114583333333357,
        "durationTicks": 847,
        "midi": 57,
        "name": "A3",
        "ticks": 4672,
        "time": 2.433333333333333,
        "velocity": 0.3464566929133858
    },
    {
        "duration": 0.7859375000000002,
        "durationTicks": 1509,
        "midi": 62,
        "name": "D4",
        "ticks": 5415,
        "time": 2.8203125,
        "velocity": 0.3937007874015748
    },
    {
        "duration": 0.3541666666666665,
        "durationTicks": 680,
        "midi": 54,
        "name": "F#3",
        "ticks": 6878,
        "time": 3.582291666666667,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.39687499999999964,
        "durationTicks": 762,
        "midi": 57,
        "name": "A3",
        "ticks": 7652,
        "time": 3.9854166666666666,
        "velocity": 0.33858267716535434
    },
    {
        "duration": 0.7197916666666675,
        "durationTicks": 1382,
        "midi": 64,
        "name": "E4",
        "ticks": 8399,
        "time": 4.374479166666666,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 0.3489583333333339,
        "durationTicks": 670,
        "midi": 54,
        "name": "F#3",
        "ticks": 9760,
        "time": 5.083333333333333,
        "velocity": 0.33858267716535434
    },
    {
        "duration": 0.41822916666666643,
        "durationTicks": 803,
        "midi": 57,
        "name": "A3",
        "ticks": 10507,
        "time": 5.472395833333334,
        "velocity": 0.3228346456692913
    },
    {
        "duration": 0.7947916666666668,
        "durationTicks": 1526,
        "midi": 62,
        "name": "D4",
        "ticks": 11267,
        "time": 5.868229166666667,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.38437499999999947,
        "durationTicks": 738,
        "midi": 54,
        "name": "F#3",
        "ticks": 12766,
        "time": 6.648958333333334,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.3562500000000002,
        "durationTicks": 684,
        "midi": 57,
        "name": "A3",
        "ticks": 13577,
        "time": 7.071354166666667,
        "velocity": 0.2992125984251969
    },
    {
        "duration": 0.7421875000000009,
        "durationTicks": 1425,
        "midi": 64,
        "name": "E4",
        "ticks": 14297,
        "time": 7.446354166666667,
        "velocity": 0.3858267716535433
    },
    {
        "duration": 1.1499999999999995,
        "durationTicks": 2208,
        "midi": 81,
        "name": "A5",
        "ticks": 14335,
        "time": 7.466145833333333,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 1.1088541666666663,
        "durationTicks": 2129,
        "midi": 88,
        "name": "E6",
        "ticks": 14353,
        "time": 7.475520833333333,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 1.0848958333333334,
        "durationTicks": 2083,
        "midi": 85,
        "name": "C#6",
        "ticks": 14356,
        "time": 7.477083333333334,
        "velocity": 0.4409448818897638
    },
    {
        "duration": 0.4161458333333332,
        "durationTicks": 799,
        "midi": 54,
        "name": "F#3",
        "ticks": 15729,
        "time": 8.1921875,
        "velocity": 0.31496062992125984
    },
    {
        "duration": 0.4119791666666668,
        "durationTicks": 791,
        "midi": 57,
        "name": "A3",
        "ticks": 16553,
        "time": 8.621354166666666,
        "velocity": 0.30708661417322836
    },
    {
        "duration": 0.7406249999999996,
        "durationTicks": 1422,
        "midi": 62,
        "name": "D4",
        "ticks": 17325,
        "time": 9.0234375,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 1.1500000000000004,
        "durationTicks": 2208,
        "midi": 78,
        "name": "F#5",
        "ticks": 17340,
        "time": 9.03125,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 1.1442708333333318,
        "durationTicks": 2197,
        "midi": 81,
        "name": "A5",
        "ticks": 17342,
        "time": 9.032291666666667,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 1.1802083333333329,
        "durationTicks": 2266,
        "midi": 86,
        "name": "D6",
        "ticks": 17359,
        "time": 9.041145833333333,
        "velocity": 0.33858267716535434
    },
    {
        "duration": 0.3312500000000007,
        "durationTicks": 636,
        "midi": 54,
        "name": "F#3",
        "ticks": 18784,
        "time": 9.783333333333333,
        "velocity": 0.31496062992125984
    },
    {
        "duration": 0.5041666666666664,
        "durationTicks": 968,
        "midi": 57,
        "name": "A3",
        "ticks": 19550,
        "time": 10.182291666666666,
        "velocity": 0.31496062992125984
    },
    {
        "duration": 0.8260416666666668,
        "durationTicks": 1586,
        "midi": 64,
        "name": "E4",
        "ticks": 20433,
        "time": 10.6421875,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 1.1572916666666657,
        "durationTicks": 2222,
        "midi": 81,
        "name": "A5",
        "ticks": 20471,
        "time": 10.661979166666667,
        "velocity": 0.31496062992125984
    },
    {
        "duration": 0.1630208333333325,
        "durationTicks": 313,
        "midi": 85,
        "name": "C#6",
        "ticks": 20556,
        "time": 10.70625,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.3651041666666668,
        "durationTicks": 701,
        "midi": 54,
        "name": "F#3",
        "ticks": 21990,
        "time": 11.453125,
        "velocity": 0.3228346456692913
    },
    {
        "duration": 0.40572916666666536,
        "durationTicks": 779,
        "midi": 57,
        "name": "A3",
        "ticks": 22772,
        "time": 11.860416666666667,
        "velocity": 0.30708661417322836
    },
    {
        "duration": 0.8989583333333346,
        "durationTicks": 1726,
        "midi": 78,
        "name": "F#5",
        "ticks": 23555,
        "time": 12.268229166666666,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.8052083333333329,
        "durationTicks": 1546,
        "midi": 62,
        "name": "D4",
        "ticks": 23582,
        "time": 12.282291666666667,
        "velocity": 0.3464566929133858
    },
    {
        "duration": 0.8390624999999989,
        "durationTicks": 1611,
        "midi": 81,
        "name": "A5",
        "ticks": 23601,
        "time": 12.2921875,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.8968749999999996,
        "durationTicks": 1722,
        "midi": 86,
        "name": "D6",
        "ticks": 23617,
        "time": 12.300520833333334,
        "velocity": 0.33070866141732286
    },
    {
        "duration": 0.48385416666666714,
        "durationTicks": 929,
        "midi": 54,
        "name": "F#3",
        "ticks": 25132,
        "time": 13.089583333333334,
        "velocity": 0.30708661417322836
    },
    {
        "duration": 0.34791666666666643,
        "durationTicks": 668,
        "midi": 57,
        "name": "A3",
        "ticks": 26036,
        "time": 13.560416666666667,
        "velocity": 0.33858267716535434
    },
    {
        "duration": 0.8312499999999989,
        "durationTicks": 1596,
        "midi": 64,
        "name": "E4",
        "ticks": 26748,
        "time": 13.93125,
        "velocity": 0.3858267716535433
    },
    {
        "duration": 0.8510416666666671,
        "durationTicks": 1634,
        "midi": 81,
        "name": "A5",
        "ticks": 26760,
        "time": 13.9375,
        "velocity": 0.3464566929133858
    },
    {
        "duration": 0.216666666666665,
        "durationTicks": 416,
        "midi": 85,
        "name": "C#6",
        "ticks": 26762,
        "time": 13.938541666666667,
        "velocity": 0.3858267716535433
    },
    {
        "duration": 0.7947916666666668,
        "durationTicks": 1526,
        "midi": 88,
        "name": "E6",
        "ticks": 26766,
        "time": 13.940625,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.36666666666666536,
        "durationTicks": 704,
        "midi": 54,
        "name": "F#3",
        "ticks": 28296,
        "time": 14.7375,
        "velocity": 0.3228346456692913
    },
    {
        "duration": 0.4171875000000007,
        "durationTicks": 801,
        "midi": 57,
        "name": "A3",
        "ticks": 29085,
        "time": 15.1484375,
        "velocity": 0.31496062992125984
    },
    {
        "duration": 0.8447916666666657,
        "durationTicks": 1622,
        "midi": 78,
        "name": "F#5",
        "ticks": 29811,
        "time": 15.5265625,
        "velocity": 0.33858267716535434
    },
    {
        "duration": 0.7760416666666661,
        "durationTicks": 1490,
        "midi": 62,
        "name": "D4",
        "ticks": 29837,
        "time": 15.540104166666667,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.796875,
        "durationTicks": 1530,
        "midi": 81,
        "name": "A5",
        "ticks": 29857,
        "time": 15.550520833333334,
        "velocity": 0.3937007874015748
    },
    {
        "duration": 0.8859375000000007,
        "durationTicks": 1701,
        "midi": 86,
        "name": "D6",
        "ticks": 29866,
        "time": 15.555208333333333,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.408333333333335,
        "durationTicks": 784,
        "midi": 54,
        "name": "F#3",
        "ticks": 31323,
        "time": 16.3140625,
        "velocity": 0.33070866141732286
    },
    {
        "duration": 0.39687499999999787,
        "durationTicks": 762,
        "midi": 57,
        "name": "A3",
        "ticks": 32149,
        "time": 16.744270833333335,
        "velocity": 0.30708661417322836
    },
    {
        "duration": 1.0192708333333336,
        "durationTicks": 1957,
        "midi": 88,
        "name": "E6",
        "ticks": 32865,
        "time": 17.1171875,
        "velocity": 0.3937007874015748
    },
    {
        "duration": 1.0708333333333329,
        "durationTicks": 2056,
        "midi": 81,
        "name": "A5",
        "ticks": 32871,
        "time": 17.1203125,
        "velocity": 0.4015748031496063
    },
    {
        "duration": 0.7411458333333343,
        "durationTicks": 1423,
        "midi": 64,
        "name": "E4",
        "ticks": 32894,
        "time": 17.132291666666667,
        "velocity": 0.3937007874015748
    },
    {
        "duration": 0.8109375000000014,
        "durationTicks": 1557,
        "midi": 85,
        "name": "C#6",
        "ticks": 32896,
        "time": 17.133333333333333,
        "velocity": 0.4409448818897638
    },
    {
        "duration": 0.43697916666666714,
        "durationTicks": 839,
        "midi": 54,
        "name": "F#3",
        "ticks": 34313,
        "time": 17.871354166666666,
        "velocity": 0.33858267716535434
    },
    {
        "duration": 0.4156249999999986,
        "durationTicks": 798,
        "midi": 57,
        "name": "A3",
        "ticks": 35168,
        "time": 18.316666666666666,
        "velocity": 0.33070866141732286
    },
    {
        "duration": 1.9270833333333321,
        "durationTicks": 3700,
        "midi": 78,
        "name": "F#5",
        "ticks": 35910,
        "time": 18.703125,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 0.5843749999999979,
        "durationTicks": 1122,
        "midi": 62,
        "name": "D4",
        "ticks": 35922,
        "time": 18.709375,
        "velocity": 0.3858267716535433
    },
    {
        "duration": 1.8947916666666664,
        "durationTicks": 3638,
        "midi": 86,
        "name": "D6",
        "ticks": 35945,
        "time": 18.721354166666668,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 1.8916666666666657,
        "durationTicks": 3632,
        "midi": 81,
        "name": "A5",
        "ticks": 35949,
        "time": 18.7234375,
        "velocity": 0.4094488188976378
    }
];

const recordingSecondNotes = [];

// console.log({recordingNotes});

const recordingPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#008b8b'; // weird gray

    // instrMapped.originalPosition.z -= 20;

    // instrMapped.duration = datum.duration / 2;

    instrMapped.duration = datum.duration * 0.75;

    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingFirstNotes);      // twinkle twinkle little star
// }, recordingSecondNotes);  // bah bah black sheep
// }, recordingThirdNotes);  // alphabet song

// recordingPart.loop = true;
recordingPart.start("0:0:0");

const recordingSecondPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#0000cd';
    instrMapped.color = '#003366';

    // instrMapped.originalPosition.z += 20;

    // instrMapped.duration = datum.duration / 2;

    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingSecondNotes);  // bah bah black sheep

// recordingSecondPart.loop = true;
// recordingSecondPart.start("0:0:0");