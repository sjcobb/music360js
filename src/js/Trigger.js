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

const recordingOldNotes = [
    {
        "duration": 0.17708333333333337,
        "durationTicks": 340,
        "midi": 55,
        "name": "G3",
        "ticks": 1481,
        "time": 0.7713541666666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.14791666666666647,
        "durationTicks": 284,
        "midi": 55,
        "name": "G3",
        "ticks": 3537,
        "time": 1.8421875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1630208333333334,
        "durationTicks": 313,
        "midi": 55,
        "name": "G3",
        "ticks": 4115,
        "time": 2.1432291666666665,
        "velocity": 0.7401574803149606
    },
    {
        "duration": 0.19895833333333357,
        "durationTicks": 382,
        "midi": 72,
        "name": "C5",
        "ticks": 5253,
        "time": 2.7359375,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.15208333333333357,
        "durationTicks": 292,
        "midi": 65,
        "name": "F4",
        "ticks": 5268,
        "time": 2.74375,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.14583333333333348,
        "durationTicks": 280,
        "midi": 69,
        "name": "A4",
        "ticks": 5270,
        "time": 2.7447916666666665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.21875,
        "durationTicks": 420,
        "midi": 72,
        "name": "C5",
        "ticks": 7188,
        "time": 3.74375,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.18281249999999982,
        "durationTicks": 351,
        "midi": 69,
        "name": "A4",
        "ticks": 7196,
        "time": 3.747916666666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.18385416666666687,
        "durationTicks": 353,
        "midi": 65,
        "name": "F4",
        "ticks": 7200,
        "time": 3.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.16875000000000018,
        "durationTicks": 324,
        "midi": 55,
        "name": "G3",
        "ticks": 7767,
        "time": 4.0453125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.16093750000000018,
        "durationTicks": 309,
        "midi": 59,
        "name": "B3",
        "ticks": 7776,
        "time": 4.05,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.13593749999999982,
        "durationTicks": 261,
        "midi": 65,
        "name": "F4",
        "ticks": 8961,
        "time": 4.6671875,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.14999999999999947,
        "durationTicks": 288,
        "midi": 69,
        "name": "A4",
        "ticks": 8962,
        "time": 4.667708333333334,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14218749999999947,
        "durationTicks": 273,
        "midi": 62,
        "name": "D4",
        "ticks": 8962,
        "time": 4.667708333333334,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1416666666666666,
        "durationTicks": 272,
        "midi": 55,
        "name": "G3",
        "ticks": 8973,
        "time": 4.6734375,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13906249999999964,
        "durationTicks": 267,
        "midi": 48,
        "name": "C3",
        "ticks": 8990,
        "time": 4.682291666666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.13593749999999982,
        "durationTicks": 261,
        "midi": 55,
        "name": "G3",
        "ticks": 10219,
        "time": 5.322395833333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.14270833333333321,
        "durationTicks": 274,
        "midi": 48,
        "name": "C3",
        "ticks": 10248,
        "time": 5.3375,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.12291666666666679,
        "durationTicks": 236,
        "midi": 60,
        "name": "C4",
        "ticks": 10919,
        "time": 5.686979166666666,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.09427083333333286,
        "durationTicks": 181,
        "midi": 67,
        "name": "G4",
        "ticks": 10938,
        "time": 5.696875,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.1687499999999993,
        "durationTicks": 324,
        "midi": 60,
        "name": "C4",
        "ticks": 11461,
        "time": 5.969270833333334,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.13489583333333321,
        "durationTicks": 259,
        "midi": 67,
        "name": "G4",
        "ticks": 11522,
        "time": 6.001041666666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.13750000000000018,
        "durationTicks": 264,
        "midi": 60,
        "name": "C4",
        "ticks": 11532,
        "time": 6.00625,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.07604166666666679,
        "durationTicks": 146,
        "midi": 72,
        "name": "C5",
        "ticks": 12191,
        "time": 6.349479166666667,
        "velocity": 0.06299212598425197
    },
    {
        "duration": 0.18906249999999947,
        "durationTicks": 363,
        "midi": 72,
        "name": "C5",
        "ticks": 13286,
        "time": 6.919791666666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.11927083333333321,
        "durationTicks": 229,
        "midi": 53,
        "name": "F3",
        "ticks": 13358,
        "time": 6.957291666666666,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.10989583333333286,
        "durationTicks": 211,
        "midi": 57,
        "name": "A3",
        "ticks": 13366,
        "time": 6.961458333333334,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13593749999999982,
        "durationTicks": 261,
        "midi": 53,
        "name": "F3",
        "ticks": 13903,
        "time": 7.241145833333333,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 57,
        "name": "A3",
        "ticks": 13911,
        "time": 7.2453125,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.18802083333333286,
        "durationTicks": 361,
        "midi": 71,
        "name": "B4",
        "ticks": 13918,
        "time": 7.248958333333333,
        "velocity": 0.5118110236220472
    },
    {
        "duration": 0.2520833333333332,
        "durationTicks": 484,
        "midi": 69,
        "name": "A4",
        "ticks": 14505,
        "time": 7.5546875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.16041666666666643,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 15132,
        "time": 7.88125,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.12552083333333286,
        "durationTicks": 241,
        "midi": 53,
        "name": "F3",
        "ticks": 15701,
        "time": 8.177604166666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.13124999999999964,
        "durationTicks": 252,
        "midi": 57,
        "name": "A3",
        "ticks": 15723,
        "time": 8.1890625,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.14010416666666714,
        "durationTicks": 269,
        "midi": 60,
        "name": "C4",
        "ticks": 15761,
        "time": 8.208854166666667,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.1260416666666675,
        "durationTicks": 242,
        "midi": 57,
        "name": "A3",
        "ticks": 16336,
        "time": 8.508333333333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11197916666666785,
        "durationTicks": 215,
        "midi": 53,
        "name": "F3",
        "ticks": 16336,
        "time": 8.508333333333333,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1651041666666675,
        "durationTicks": 317,
        "midi": 64,
        "name": "E4",
        "ticks": 16385,
        "time": 8.533854166666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 60,
        "name": "C4",
        "ticks": 16984,
        "time": 8.845833333333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.13802083333333393,
        "durationTicks": 265,
        "midi": 67,
        "name": "G4",
        "ticks": 17644,
        "time": 9.189583333333333,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.18541666666666679,
        "durationTicks": 356,
        "midi": 64,
        "name": "E4",
        "ticks": 17646,
        "time": 9.190625,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.10208333333333286,
        "durationTicks": 196,
        "midi": 69,
        "name": "A4",
        "ticks": 18217,
        "time": 9.488020833333334,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 57,
        "name": "A3",
        "ticks": 18219,
        "time": 9.4890625,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.10468750000000071,
        "durationTicks": 201,
        "midi": 65,
        "name": "F4",
        "ticks": 18223,
        "time": 9.491145833333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.14635416666666679,
        "durationTicks": 281,
        "midi": 60,
        "name": "C4",
        "ticks": 18226,
        "time": 9.492708333333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.10885416666666536,
        "durationTicks": 209,
        "midi": 69,
        "name": "A4",
        "ticks": 18835,
        "time": 9.809895833333334,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.1161458333333325,
        "durationTicks": 223,
        "midi": 65,
        "name": "F4",
        "ticks": 18835,
        "time": 9.809895833333334,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.10677083333333215,
        "durationTicks": 205,
        "midi": 57,
        "name": "A3",
        "ticks": 19577,
        "time": 10.196354166666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.11406249999999929,
        "durationTicks": 219,
        "midi": 60,
        "name": "C4",
        "ticks": 19578,
        "time": 10.196875,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.12552083333333286,
        "durationTicks": 241,
        "midi": 67,
        "name": "G4",
        "ticks": 20201,
        "time": 10.521354166666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.16197916666666679,
        "durationTicks": 311,
        "midi": 64,
        "name": "E4",
        "ticks": 20206,
        "time": 10.523958333333333,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.14270833333333321,
        "durationTicks": 274,
        "midi": 55,
        "name": "G3",
        "ticks": 20729,
        "time": 10.796354166666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.14635416666666679,
        "durationTicks": 281,
        "midi": 59,
        "name": "B3",
        "ticks": 20741,
        "time": 10.802604166666667,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1291666666666682,
        "durationTicks": 248,
        "midi": 59,
        "name": "B3",
        "ticks": 20784,
        "time": 10.825,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.11510416666666679,
        "durationTicks": 221,
        "midi": 55,
        "name": "G3",
        "ticks": 20794,
        "time": 10.830208333333333,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.12864583333333357,
        "durationTicks": 247,
        "midi": 55,
        "name": "G3",
        "ticks": 21340,
        "time": 11.114583333333334,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12708333333333321,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 21345,
        "time": 11.1171875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.12708333333333321,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 21412,
        "time": 11.152083333333334,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1291666666666682,
        "durationTicks": 248,
        "midi": 59,
        "name": "B3",
        "ticks": 21418,
        "time": 11.155208333333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15312500000000107,
        "durationTicks": 294,
        "midi": 64,
        "name": "E4",
        "ticks": 22658,
        "time": 11.801041666666666,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.17343750000000036,
        "durationTicks": 333,
        "midi": 67,
        "name": "G4",
        "ticks": 22665,
        "time": 11.8046875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 60,
        "name": "C4",
        "ticks": 22679,
        "time": 11.811979166666667,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.11875000000000036,
        "durationTicks": 228,
        "midi": 55,
        "name": "G3",
        "ticks": 23273,
        "time": 12.121354166666666,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1260416666666675,
        "durationTicks": 242,
        "midi": 48,
        "name": "C3",
        "ticks": 23300,
        "time": 12.135416666666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15989583333333357,
        "durationTicks": 307,
        "midi": 72,
        "name": "C5",
        "ticks": 23831,
        "time": 12.411979166666667,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.13177083333333428,
        "durationTicks": 253,
        "midi": 55,
        "name": "G3",
        "ticks": 23836,
        "time": 12.414583333333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14583333333333393,
        "durationTicks": 280,
        "midi": 48,
        "name": "C3",
        "ticks": 23844,
        "time": 12.41875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14270833333333321,
        "durationTicks": 274,
        "midi": 69,
        "name": "A4",
        "ticks": 23847,
        "time": 12.4203125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.12812499999999893,
        "durationTicks": 246,
        "midi": 55,
        "name": "G3",
        "ticks": 24513,
        "time": 12.7671875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11197916666666607,
        "durationTicks": 215,
        "midi": 48,
        "name": "C3",
        "ticks": 24536,
        "time": 12.779166666666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.1671875000000007,
        "durationTicks": 321,
        "midi": 64,
        "name": "E4",
        "ticks": 25179,
        "time": 13.1140625,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.16666666666666607,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 25189,
        "time": 13.119270833333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1640625,
        "durationTicks": 315,
        "midi": 67,
        "name": "G4",
        "ticks": 25192,
        "time": 13.120833333333334,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.12291666666666679,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 25660,
        "time": 13.364583333333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1083333333333325,
        "durationTicks": 208,
        "midi": 53,
        "name": "F3",
        "ticks": 25665,
        "time": 13.3671875,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1213541666666682,
        "durationTicks": 233,
        "midi": 48,
        "name": "C3",
        "ticks": 25738,
        "time": 13.405208333333333,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1182291666666675,
        "durationTicks": 227,
        "midi": 55,
        "name": "G3",
        "ticks": 25744,
        "time": 13.408333333333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.11093750000000036,
        "durationTicks": 213,
        "midi": 53,
        "name": "F3",
        "ticks": 26303,
        "time": 13.699479166666666,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.12031250000000071,
        "durationTicks": 231,
        "midi": 57,
        "name": "A3",
        "ticks": 26304,
        "time": 13.7,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11666666666666714,
        "durationTicks": 224,
        "midi": 55,
        "name": "G3",
        "ticks": 26351,
        "time": 13.724479166666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.09583333333333321,
        "durationTicks": 184,
        "midi": 48,
        "name": "C3",
        "ticks": 26393,
        "time": 13.746354166666666,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.15885416666666607,
        "durationTicks": 305,
        "midi": 64,
        "name": "E4",
        "ticks": 27591,
        "time": 14.3703125,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1671875000000007,
        "durationTicks": 321,
        "midi": 67,
        "name": "G4",
        "ticks": 27596,
        "time": 14.372916666666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15260416666666643,
        "durationTicks": 293,
        "midi": 60,
        "name": "C4",
        "ticks": 27604,
        "time": 14.377083333333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1135416666666682,
        "durationTicks": 218,
        "midi": 57,
        "name": "A3",
        "ticks": 28179,
        "time": 14.6765625,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.11302083333333357,
        "durationTicks": 217,
        "midi": 53,
        "name": "F3",
        "ticks": 28190,
        "time": 14.682291666666666,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.12447916666666714,
        "durationTicks": 239,
        "midi": 55,
        "name": "G3",
        "ticks": 28759,
        "time": 14.978645833333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13072916666666679,
        "durationTicks": 251,
        "midi": 59,
        "name": "B3",
        "ticks": 28761,
        "time": 14.9796875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1473958333333325,
        "durationTicks": 283,
        "midi": 69,
        "name": "A4",
        "ticks": 28762,
        "time": 14.980208333333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 65,
        "name": "F4",
        "ticks": 28769,
        "time": 14.983854166666667,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.1083333333333325,
        "durationTicks": 208,
        "midi": 57,
        "name": "A3",
        "ticks": 29376,
        "time": 15.3,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.09010416666666643,
        "durationTicks": 173,
        "midi": 53,
        "name": "F3",
        "ticks": 29386,
        "time": 15.305208333333333,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.15677083333333286,
        "durationTicks": 301,
        "midi": 64,
        "name": "E4",
        "ticks": 30018,
        "time": 15.634375,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15104166666666607,
        "durationTicks": 290,
        "midi": 60,
        "name": "C4",
        "ticks": 30037,
        "time": 15.644270833333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.12916666666666643,
        "durationTicks": 248,
        "midi": 55,
        "name": "G3",
        "ticks": 30534,
        "time": 15.903125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1276041666666643,
        "durationTicks": 245,
        "midi": 59,
        "name": "B3",
        "ticks": 30546,
        "time": 15.909375,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.09166666666666679,
        "durationTicks": 176,
        "midi": 53,
        "name": "F3",
        "ticks": 30604,
        "time": 15.939583333333333,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.10312500000000036,
        "durationTicks": 198,
        "midi": 57,
        "name": "A3",
        "ticks": 30605,
        "time": 15.940104166666666,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1437500000000007,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 31132,
        "time": 16.214583333333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.14427083333333357,
        "durationTicks": 277,
        "midi": 59,
        "name": "B3",
        "ticks": 31137,
        "time": 16.2171875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12291666666666856,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 31181,
        "time": 16.240104166666665,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.10364583333333144,
        "durationTicks": 199,
        "midi": 53,
        "name": "F3",
        "ticks": 31191,
        "time": 16.2453125,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.17656250000000284,
        "durationTicks": 339,
        "midi": 67,
        "name": "G4",
        "ticks": 32351,
        "time": 16.849479166666665,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.161979166666665,
        "durationTicks": 311,
        "midi": 64,
        "name": "E4",
        "ticks": 32352,
        "time": 16.85,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15781250000000213,
        "durationTicks": 303,
        "midi": 60,
        "name": "C4",
        "ticks": 32356,
        "time": 16.852083333333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12187499999999929,
        "durationTicks": 234,
        "midi": 57,
        "name": "A3",
        "ticks": 32975,
        "time": 17.174479166666668,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.11770833333333286,
        "durationTicks": 226,
        "midi": 53,
        "name": "F3",
        "ticks": 32975,
        "time": 17.174479166666668,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12968750000000284,
        "durationTicks": 249,
        "midi": 55,
        "name": "G3",
        "ticks": 33476,
        "time": 17.435416666666665,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 48,
        "name": "C3",
        "ticks": 33492,
        "time": 17.44375,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1437500000000007,
        "durationTicks": 276,
        "midi": 67,
        "name": "G4",
        "ticks": 34061,
        "time": 17.740104166666665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.1171875,
        "durationTicks": 225,
        "midi": 57,
        "name": "A3",
        "ticks": 34180,
        "time": 17.802083333333332,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.09114583333333215,
        "durationTicks": 175,
        "midi": 53,
        "name": "F3",
        "ticks": 34192,
        "time": 17.808333333333334,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.12135416666666643,
        "durationTicks": 233,
        "midi": 65,
        "name": "F4",
        "ticks": 34677,
        "time": 18.0609375,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.138541666666665,
        "durationTicks": 266,
        "midi": 65,
        "name": "F4",
        "ticks": 34814,
        "time": 18.132291666666667,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.1401041666666636,
        "durationTicks": 269,
        "midi": 62,
        "name": "D4",
        "ticks": 34827,
        "time": 18.1390625,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.140625,
        "durationTicks": 270,
        "midi": 69,
        "name": "A4",
        "ticks": 34850,
        "time": 18.151041666666668,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.09895833333333215,
        "durationTicks": 190,
        "midi": 64,
        "name": "E4",
        "ticks": 35255,
        "time": 18.361979166666668,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.07500000000000284,
        "durationTicks": 144,
        "midi": 62,
        "name": "D4",
        "ticks": 35276,
        "time": 18.372916666666665,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.12395833333333073,
        "durationTicks": 238,
        "midi": 55,
        "name": "G3",
        "ticks": 35434,
        "time": 18.455208333333335,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.130729166666665,
        "durationTicks": 251,
        "midi": 59,
        "name": "B3",
        "ticks": 35436,
        "time": 18.45625,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.16927083333333215,
        "durationTicks": 325,
        "midi": 64,
        "name": "E4",
        "ticks": 35856,
        "time": 18.675,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.1171875,
        "durationTicks": 225,
        "midi": 55,
        "name": "G3",
        "ticks": 36077,
        "time": 18.790104166666666,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.11302083333333357,
        "durationTicks": 217,
        "midi": 59,
        "name": "B3",
        "ticks": 36089,
        "time": 18.796354166666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.13489583333333144,
        "durationTicks": 259,
        "midi": 67,
        "name": "G4",
        "ticks": 37304,
        "time": 19.429166666666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.142708333333335,
        "durationTicks": 274,
        "midi": 64,
        "name": "E4",
        "ticks": 37306,
        "time": 19.430208333333333,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1458333333333357,
        "durationTicks": 280,
        "midi": 71,
        "name": "B4",
        "ticks": 37307,
        "time": 19.430729166666666,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.11093750000000213,
        "durationTicks": 213,
        "midi": 57,
        "name": "A3",
        "ticks": 37959,
        "time": 19.7703125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.11145833333333499,
        "durationTicks": 214,
        "midi": 60,
        "name": "C4",
        "ticks": 37961,
        "time": 19.771354166666665,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.10677083333333215,
        "durationTicks": 205,
        "midi": 60,
        "name": "C4",
        "ticks": 38608,
        "time": 20.108333333333334,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.14270833333333144,
        "durationTicks": 274,
        "midi": 60,
        "name": "C4",
        "ticks": 39186,
        "time": 20.409375,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.10885416666666714,
        "durationTicks": 209,
        "midi": 48,
        "name": "C3",
        "ticks": 39847,
        "time": 20.753645833333334,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.11145833333333499,
        "durationTicks": 214,
        "midi": 57,
        "name": "A3",
        "ticks": 40331,
        "time": 21.005729166666665,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1869791666666636,
        "durationTicks": 359,
        "midi": 72,
        "name": "C5",
        "ticks": 40377,
        "time": 21.0296875,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.12604166666666572,
        "durationTicks": 242,
        "midi": 60,
        "name": "C4",
        "ticks": 40954,
        "time": 21.330208333333335,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 55,
        "name": "G3",
        "ticks": 41012,
        "time": 21.360416666666666,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.18541666666666856,
        "durationTicks": 356,
        "midi": 71,
        "name": "B4",
        "ticks": 41618,
        "time": 21.676041666666666,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.14687500000000142,
        "durationTicks": 282,
        "midi": 69,
        "name": "A4",
        "ticks": 42236,
        "time": 21.997916666666665,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14270833333333144,
        "durationTicks": 274,
        "midi": 60,
        "name": "C4",
        "ticks": 42799,
        "time": 22.291145833333335,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.11197916666666785,
        "durationTicks": 215,
        "midi": 53,
        "name": "F3",
        "ticks": 42849,
        "time": 22.3171875,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.14166666666666572,
        "durationTicks": 272,
        "midi": 67,
        "name": "G4",
        "ticks": 43358,
        "time": 22.582291666666666,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.16458333333333286,
        "durationTicks": 316,
        "midi": 67,
        "name": "G4",
        "ticks": 43450,
        "time": 22.630208333333332,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.14999999999999858,
        "durationTicks": 288,
        "midi": 64,
        "name": "E4",
        "ticks": 43970,
        "time": 22.901041666666668,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.130729166666665,
        "durationTicks": 251,
        "midi": 57,
        "name": "A3",
        "ticks": 44038,
        "time": 22.936458333333334,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.16770833333333357,
        "durationTicks": 322,
        "midi": 67,
        "name": "G4",
        "ticks": 44566,
        "time": 23.211458333333333,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.19166666666666643,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 44646,
        "time": 23.253125,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.11875000000000213,
        "durationTicks": 228,
        "midi": 64,
        "name": "E4",
        "ticks": 45205,
        "time": 23.544270833333332,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15781250000000213,
        "durationTicks": 303,
        "midi": 65,
        "name": "F4",
        "ticks": 45295,
        "time": 23.591145833333332,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 0.13072916666666856,
        "durationTicks": 251,
        "midi": 57,
        "name": "A3",
        "ticks": 45782,
        "time": 23.844791666666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14322916666666785,
        "durationTicks": 275,
        "midi": 60,
        "name": "C4",
        "ticks": 45880,
        "time": 23.895833333333332,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.21510416666666643,
        "durationTicks": 413,
        "midi": 64,
        "name": "E4",
        "ticks": 46479,
        "time": 24.2078125,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.12864583333333002,
        "durationTicks": 247,
        "midi": 57,
        "name": "A3",
        "ticks": 47089,
        "time": 24.525520833333335,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.12291666666666501,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 47684,
        "time": 24.835416666666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1843749999999993,
        "durationTicks": 354,
        "midi": 65,
        "name": "F4",
        "ticks": 47707,
        "time": 24.847395833333334,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.15208333333333357,
        "durationTicks": 292,
        "midi": 64,
        "name": "E4",
        "ticks": 48296,
        "time": 25.154166666666665,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13802083333333215,
        "durationTicks": 265,
        "midi": 60,
        "name": "C4",
        "ticks": 48298,
        "time": 25.155208333333334,
        "velocity": 0.5118110236220472
    },
    {
        "duration": 0.1828125000000007,
        "durationTicks": 351,
        "midi": 67,
        "name": "G4",
        "ticks": 48868,
        "time": 25.452083333333334,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.18385416666666643,
        "durationTicks": 353,
        "midi": 69,
        "name": "A4",
        "ticks": 48912,
        "time": 25.475,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1359375000000007,
        "durationTicks": 261,
        "midi": 64,
        "name": "E4",
        "ticks": 49450,
        "time": 25.755208333333332,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.16562500000000213,
        "durationTicks": 318,
        "midi": 67,
        "name": "G4",
        "ticks": 49525,
        "time": 25.794270833333332,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.16875000000000284,
        "durationTicks": 324,
        "midi": 60,
        "name": "C4",
        "ticks": 50095,
        "time": 26.091145833333332,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.1411458333333364,
        "durationTicks": 271,
        "midi": 65,
        "name": "F4",
        "ticks": 50133,
        "time": 26.1109375,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14479166666666643,
        "durationTicks": 278,
        "midi": 57,
        "name": "A3",
        "ticks": 50697,
        "time": 26.4046875,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1328125,
        "durationTicks": 255,
        "midi": 55,
        "name": "G3",
        "ticks": 50721,
        "time": 26.4171875,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.2218750000000007,
        "durationTicks": 426,
        "midi": 60,
        "name": "C4",
        "ticks": 51354,
        "time": 26.746875,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.20572916666666785,
        "durationTicks": 395,
        "midi": 62,
        "name": "D4",
        "ticks": 51969,
        "time": 27.0671875,
        "velocity": 0.4409448818897638
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 53,
        "name": "F3",
        "ticks": 52561,
        "time": 27.375520833333333,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.27187499999999787,
        "durationTicks": 522,
        "midi": 64,
        "name": "E4",
        "ticks": 52564,
        "time": 27.377083333333335,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.09166666666666501,
        "durationTicks": 176,
        "midi": 52,
        "name": "E3",
        "ticks": 53173,
        "time": 27.694270833333334,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.16197916666666856,
        "durationTicks": 311,
        "midi": 59,
        "name": "B3",
        "ticks": 53177,
        "time": 27.696354166666666,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11093749999999858,
        "durationTicks": 213,
        "midi": 55,
        "name": "G3",
        "ticks": 53181,
        "time": 27.6984375,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.16354166666666714,
        "durationTicks": 314,
        "midi": 65,
        "name": "F4",
        "ticks": 53789,
        "time": 28.015104166666667,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.1359375000000007,
        "durationTicks": 261,
        "midi": 60,
        "name": "C4",
        "ticks": 53793,
        "time": 28.0171875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1531249999999993,
        "durationTicks": 294,
        "midi": 64,
        "name": "E4",
        "ticks": 54359,
        "time": 28.311979166666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.15260416666666643,
        "durationTicks": 293,
        "midi": 55,
        "name": "G3",
        "ticks": 54362,
        "time": 28.313541666666666,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 59,
        "name": "B3",
        "ticks": 54953,
        "time": 28.621354166666666,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.12187499999999929,
        "durationTicks": 234,
        "midi": 62,
        "name": "D4",
        "ticks": 54958,
        "time": 28.623958333333334,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.1380208333333357,
        "durationTicks": 265,
        "midi": 57,
        "name": "A3",
        "ticks": 55556,
        "time": 28.935416666666665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.1197916666666643,
        "durationTicks": 230,
        "midi": 55,
        "name": "G3",
        "ticks": 55558,
        "time": 28.936458333333334,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.06666666666666998,
        "durationTicks": 128,
        "midi": 52,
        "name": "E3",
        "ticks": 55631,
        "time": 28.974479166666665,
        "velocity": 0.3700787401574803
    },
    {
        "duration": 0.16562500000000213,
        "durationTicks": 318,
        "midi": 59,
        "name": "B3",
        "ticks": 56186,
        "time": 29.263541666666665,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14270833333333144,
        "durationTicks": 274,
        "midi": 53,
        "name": "F3",
        "ticks": 56714,
        "time": 29.538541666666667,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.1437500000000007,
        "durationTicks": 276,
        "midi": 57,
        "name": "A3",
        "ticks": 56739,
        "time": 29.5515625,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.10989583333333286,
        "durationTicks": 211,
        "midi": 57,
        "name": "A3",
        "ticks": 57299,
        "time": 29.843229166666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.20468749999999858,
        "durationTicks": 393,
        "midi": 60,
        "name": "C4",
        "ticks": 57357,
        "time": 29.8734375,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.1328125,
        "durationTicks": 255,
        "midi": 60,
        "name": "C4",
        "ticks": 57896,
        "time": 30.154166666666665,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.28541666666666643,
        "durationTicks": 548,
        "midi": 62,
        "name": "D4",
        "ticks": 58019,
        "time": 30.218229166666667,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.11510416666666856,
        "durationTicks": 221,
        "midi": 57,
        "name": "A3",
        "ticks": 58478,
        "time": 30.457291666666666,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.2593749999999986,
        "durationTicks": 498,
        "midi": 64,
        "name": "E4",
        "ticks": 58594,
        "time": 30.517708333333335,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.10416666666666785,
        "durationTicks": 200,
        "midi": 65,
        "name": "F4",
        "ticks": 59084,
        "time": 30.772916666666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.28489583333333357,
        "durationTicks": 547,
        "midi": 62,
        "name": "D4",
        "ticks": 59215,
        "time": 30.841145833333332,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.24322916666666572,
        "durationTicks": 467,
        "midi": 60,
        "name": "C4",
        "ticks": 59827,
        "time": 31.159895833333334,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.9260416666666629,
        "durationTicks": 1778,
        "midi": 59,
        "name": "B3",
        "ticks": 60463,
        "time": 31.491145833333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.921875,
        "durationTicks": 1770,
        "midi": 55,
        "name": "G3",
        "ticks": 60463,
        "time": 31.491145833333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11562499999999787,
        "durationTicks": 222,
        "midi": 57,
        "name": "A3",
        "ticks": 60965,
        "time": 31.752604166666668,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.10833333333333428,
        "durationTicks": 208,
        "midi": 60,
        "name": "C4",
        "ticks": 61587,
        "time": 32.0765625,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.13749999999999574,
        "durationTicks": 264,
        "midi": 55,
        "name": "G3",
        "ticks": 62172,
        "time": 32.38125,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.3140624999999986,
        "durationTicks": 603,
        "midi": 64,
        "name": "E4",
        "ticks": 62464,
        "time": 32.53333333333333,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.10260416666666572,
        "durationTicks": 197,
        "midi": 59,
        "name": "B3",
        "ticks": 62833,
        "time": 32.725520833333334,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.3609374999999986,
        "durationTicks": 693,
        "midi": 65,
        "name": "F4",
        "ticks": 63109,
        "time": 32.86927083333333,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.30104166666667,
        "durationTicks": 578,
        "midi": 67,
        "name": "G4",
        "ticks": 63752,
        "time": 33.204166666666666,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.4151041666666657,
        "durationTicks": 797,
        "midi": 65,
        "name": "F4",
        "ticks": 64368,
        "time": 33.525,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 1.2166666666666615,
        "durationTicks": 2336,
        "midi": 57,
        "name": "A3",
        "ticks": 65066,
        "time": 33.88854166666667,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.75364583333333,
        "durationTicks": 1447,
        "midi": 60,
        "name": "C4",
        "ticks": 65079,
        "time": 33.8953125,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.12187500000000284,
        "durationTicks": 234,
        "midi": 53,
        "name": "F3",
        "ticks": 65611,
        "time": 34.17239583333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13437499999999858,
        "durationTicks": 258,
        "midi": 64,
        "name": "E4",
        "ticks": 66267,
        "time": 34.5140625,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.6151041666666686,
        "durationTicks": 1181,
        "midi": 60,
        "name": "C4",
        "ticks": 66275,
        "time": 34.518229166666664,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.41822916666667,
        "durationTicks": 803,
        "midi": 72,
        "name": "C5",
        "ticks": 67159,
        "time": 34.97864583333333,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.36406249999999574,
        "durationTicks": 699,
        "midi": 71,
        "name": "B4",
        "ticks": 67749,
        "time": 35.2859375,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5135416666666686,
        "durationTicks": 986,
        "midi": 69,
        "name": "A4",
        "ticks": 68402,
        "time": 35.626041666666666,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.13906250000000142,
        "durationTicks": 267,
        "midi": 57,
        "name": "A3",
        "ticks": 69626,
        "time": 36.26354166666667,
        "velocity": 0.7401574803149606
    },
    {
        "duration": 0.13697916666666288,
        "durationTicks": 263,
        "midi": 53,
        "name": "F3",
        "ticks": 69628,
        "time": 36.264583333333334,
        "velocity": 0.7401574803149606
    },
    {
        "duration": 0.8411458333333357,
        "durationTicks": 1615,
        "midi": 59,
        "name": "B3",
        "ticks": 69633,
        "time": 36.2671875,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.80104166666667,
        "durationTicks": 1538,
        "midi": 65,
        "name": "F4",
        "ticks": 69635,
        "time": 36.268229166666664,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.7953125000000014,
        "durationTicks": 1527,
        "midi": 69,
        "name": "A4",
        "ticks": 69636,
        "time": 36.26875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.8302083333333314,
        "durationTicks": 1594,
        "midi": 62,
        "name": "D4",
        "ticks": 69648,
        "time": 36.275,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.23333333333333428,
        "durationTicks": 448,
        "midi": 72,
        "name": "C5",
        "ticks": 71965,
        "time": 37.481770833333336,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.1848958333333357,
        "durationTicks": 355,
        "midi": 60,
        "name": "C4",
        "ticks": 71989,
        "time": 37.49427083333333,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.18385416666666288,
        "durationTicks": 353,
        "midi": 53,
        "name": "F3",
        "ticks": 71993,
        "time": 37.49635416666667,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.12656249999999858,
        "durationTicks": 243,
        "midi": 55,
        "name": "G3",
        "ticks": 72128,
        "time": 37.56666666666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11354166666666288,
        "durationTicks": 218,
        "midi": 65,
        "name": "F4",
        "ticks": 72164,
        "time": 37.58541666666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.2864583333333357,
        "durationTicks": 550,
        "midi": 71,
        "name": "B4",
        "ticks": 72615,
        "time": 37.8203125,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14687500000000142,
        "durationTicks": 282,
        "midi": 69,
        "name": "A4",
        "ticks": 72659,
        "time": 37.84322916666667,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11354166666666998,
        "durationTicks": 218,
        "midi": 69,
        "name": "A4",
        "ticks": 73234,
        "time": 38.14270833333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.10729166666666856,
        "durationTicks": 206,
        "midi": 57,
        "name": "A3",
        "ticks": 73267,
        "time": 38.15989583333333,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.12291666666666146,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 73270,
        "time": 38.161458333333336,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11354166666666288,
        "durationTicks": 218,
        "midi": 60,
        "name": "C4",
        "ticks": 73272,
        "time": 38.1625,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11249999999999716,
        "durationTicks": 216,
        "midi": 53,
        "name": "F3",
        "ticks": 73274,
        "time": 38.16354166666667,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 65,
        "name": "F4",
        "ticks": 73886,
        "time": 38.48229166666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13385416666666572,
        "durationTicks": 257,
        "midi": 69,
        "name": "A4",
        "ticks": 74498,
        "time": 38.80104166666667,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.17291666666666572,
        "durationTicks": 332,
        "midi": 71,
        "name": "B4",
        "ticks": 74498,
        "time": 38.80104166666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11666666666666714,
        "durationTicks": 224,
        "midi": 55,
        "name": "G3",
        "ticks": 74522,
        "time": 38.813541666666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.1119791666666643,
        "durationTicks": 215,
        "midi": 59,
        "name": "B3",
        "ticks": 74533,
        "time": 38.819270833333334,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.06875000000000142,
        "durationTicks": 132,
        "midi": 52,
        "name": "E3",
        "ticks": 74612,
        "time": 38.860416666666666,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 0.12916666666666998,
        "durationTicks": 248,
        "midi": 59,
        "name": "B3",
        "ticks": 75061,
        "time": 39.09427083333333,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.20781249999999574,
        "durationTicks": 399,
        "midi": 69,
        "name": "A4",
        "ticks": 75103,
        "time": 39.116145833333334,
        "velocity": 0.5118110236220472
    },
    {
        "duration": 0.10989583333333997,
        "durationTicks": 211,
        "midi": 71,
        "name": "B4",
        "ticks": 75712,
        "time": 39.43333333333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.15156249999999716,
        "durationTicks": 291,
        "midi": 67,
        "name": "G4",
        "ticks": 75714,
        "time": 39.434375,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.14010416666666714,
        "durationTicks": 269,
        "midi": 55,
        "name": "G3",
        "ticks": 75714,
        "time": 39.434375,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.13125000000000142,
        "durationTicks": 252,
        "midi": 48,
        "name": "C3",
        "ticks": 75739,
        "time": 39.44739583333333,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 60,
        "name": "C4",
        "ticks": 76234,
        "time": 39.70520833333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13593750000000426,
        "durationTicks": 261,
        "midi": 69,
        "name": "A4",
        "ticks": 76896,
        "time": 40.05,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.14999999999999858,
        "durationTicks": 288,
        "midi": 55,
        "name": "G3",
        "ticks": 77018,
        "time": 40.11354166666667,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 48,
        "name": "C3",
        "ticks": 77031,
        "time": 40.1203125,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14687500000000142,
        "durationTicks": 282,
        "midi": 67,
        "name": "G4",
        "ticks": 77075,
        "time": 40.143229166666664,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.11302083333333002,
        "durationTicks": 217,
        "midi": 67,
        "name": "G4",
        "ticks": 77488,
        "time": 40.358333333333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.2239583333333357,
        "durationTicks": 430,
        "midi": 65,
        "name": "F4",
        "ticks": 77553,
        "time": 40.3921875,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.12604166666666572,
        "durationTicks": 242,
        "midi": 60,
        "name": "C4",
        "ticks": 78118,
        "time": 40.686458333333334,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.1067708333333286,
        "durationTicks": 205,
        "midi": 64,
        "name": "E4",
        "ticks": 78264,
        "time": 40.7625,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.10572916666666998,
        "durationTicks": 203,
        "midi": 57,
        "name": "A3",
        "ticks": 78318,
        "time": 40.790625,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.08177083333333712,
        "durationTicks": 157,
        "midi": 53,
        "name": "F3",
        "ticks": 78318,
        "time": 40.790625,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.1328125,
        "durationTicks": 255,
        "midi": 65,
        "name": "F4",
        "ticks": 78732,
        "time": 41.00625,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.16614583333333144,
        "durationTicks": 319,
        "midi": 60,
        "name": "C4",
        "ticks": 79014,
        "time": 41.153125,
        "velocity": 0.10236220472440945
    },
    {
        "duration": 0.12968749999999574,
        "durationTicks": 249,
        "midi": 59,
        "name": "B3",
        "ticks": 79374,
        "time": 41.340625,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13072916666666856,
        "durationTicks": 251,
        "midi": 62,
        "name": "D4",
        "ticks": 79550,
        "time": 41.432291666666664,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1302083333333286,
        "durationTicks": 250,
        "midi": 55,
        "name": "G3",
        "ticks": 79569,
        "time": 41.4421875,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.06979166666666714,
        "durationTicks": 134,
        "midi": 52,
        "name": "E3",
        "ticks": 79639,
        "time": 41.47864583333333,
        "velocity": 0.4409448818897638
    },
    {
        "duration": 0.13333333333333997,
        "durationTicks": 256,
        "midi": 55,
        "name": "G3",
        "ticks": 80632,
        "time": 41.99583333333333,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.12187500000000284,
        "durationTicks": 234,
        "midi": 60,
        "name": "C4",
        "ticks": 80654,
        "time": 42.00729166666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.12708333333333854,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 80842,
        "time": 42.10520833333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.10781250000000142,
        "durationTicks": 207,
        "midi": 65,
        "name": "F4",
        "ticks": 80852,
        "time": 42.110416666666666,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.12447916666666714,
        "durationTicks": 239,
        "midi": 48,
        "name": "C3",
        "ticks": 80864,
        "time": 42.11666666666667,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 82578,
        "time": 43.009375,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12968750000000284,
        "durationTicks": 249,
        "midi": 48,
        "name": "C3",
        "ticks": 82604,
        "time": 43.02291666666667,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.13489583333333144,
        "durationTicks": 259,
        "midi": 67,
        "name": "G4",
        "ticks": 82662,
        "time": 43.053125,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.08385416666666856,
        "durationTicks": 161,
        "midi": 53,
        "name": "F3",
        "ticks": 82726,
        "time": 43.08645833333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.09166666666666856,
        "durationTicks": 176,
        "midi": 57,
        "name": "A3",
        "ticks": 82738,
        "time": 43.092708333333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.1067708333333286,
        "durationTicks": 205,
        "midi": 55,
        "name": "G3",
        "ticks": 83185,
        "time": 43.325520833333336,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.11562500000000142,
        "durationTicks": 222,
        "midi": 60,
        "name": "C4",
        "ticks": 83193,
        "time": 43.3296875,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11093750000000568,
        "durationTicks": 213,
        "midi": 48,
        "name": "C3",
        "ticks": 83195,
        "time": 43.330729166666664,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1119791666666643,
        "durationTicks": 215,
        "midi": 67,
        "name": "G4",
        "ticks": 83198,
        "time": 43.33229166666667,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.11406249999999574,
        "durationTicks": 219,
        "midi": 65,
        "name": "F4",
        "ticks": 83246,
        "time": 43.35729166666667,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11770833333333286,
        "durationTicks": 226,
        "midi": 64,
        "name": "E4",
        "ticks": 83849,
        "time": 43.67135416666667,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.15833333333333144,
        "durationTicks": 304,
        "midi": 60,
        "name": "C4",
        "ticks": 84498,
        "time": 44.009375,
        "velocity": 0.6299212598425197
    }
];

const recordingFirstNotes = [
    {
        "duration": 0.1416666666666666,
        "durationTicks": 272,
        "midi": 55,
        "name": "G3",
        "ticks": 8973,
        "time": 4.6734375,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13906249999999964,
        "durationTicks": 267,
        "midi": 48,
        "name": "C3",
        "ticks": 8990,
        "time": 4.682291666666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12291666666666679,
        "durationTicks": 236,
        "midi": 60,
        "name": "C4",
        "ticks": 10919,
        "time": 5.686979166666666,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.09427083333333286,
        "durationTicks": 181,
        "midi": 67,
        "name": "G4",
        "ticks": 10938,
        "time": 5.696875,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.13489583333333321,
        "durationTicks": 259,
        "midi": 67,
        "name": "G4",
        "ticks": 11522,
        "time": 6.001041666666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1317708333333334,
        "durationTicks": 253,
        "midi": 60,
        "name": "C4",
        "ticks": 11532,
        "time": 6.00625,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.11927083333333321,
        "durationTicks": 229,
        "midi": 53,
        "name": "F3",
        "ticks": 13358,
        "time": 6.957291666666666,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.10989583333333286,
        "durationTicks": 211,
        "midi": 57,
        "name": "A3",
        "ticks": 13366,
        "time": 6.961458333333334,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13593749999999982,
        "durationTicks": 261,
        "midi": 53,
        "name": "F3",
        "ticks": 13903,
        "time": 7.241145833333333,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 57,
        "name": "A3",
        "ticks": 13911,
        "time": 7.2453125,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.12552083333333286,
        "durationTicks": 241,
        "midi": 53,
        "name": "F3",
        "ticks": 15701,
        "time": 8.177604166666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.13124999999999964,
        "durationTicks": 252,
        "midi": 57,
        "name": "A3",
        "ticks": 15723,
        "time": 8.1890625,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.1260416666666675,
        "durationTicks": 242,
        "midi": 57,
        "name": "A3",
        "ticks": 16336,
        "time": 8.508333333333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11197916666666785,
        "durationTicks": 215,
        "midi": 53,
        "name": "F3",
        "ticks": 16336,
        "time": 8.508333333333333,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.10208333333333286,
        "durationTicks": 196,
        "midi": 69,
        "name": "A4",
        "ticks": 18217,
        "time": 9.488020833333334,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.10468750000000071,
        "durationTicks": 201,
        "midi": 65,
        "name": "F4",
        "ticks": 18223,
        "time": 9.491145833333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.10885416666666536,
        "durationTicks": 209,
        "midi": 69,
        "name": "A4",
        "ticks": 18835,
        "time": 9.809895833333334,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.1161458333333325,
        "durationTicks": 223,
        "midi": 65,
        "name": "F4",
        "ticks": 18835,
        "time": 9.809895833333334,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.14270833333333321,
        "durationTicks": 274,
        "midi": 55,
        "name": "G3",
        "ticks": 20729,
        "time": 10.796354166666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1515625000000007,
        "durationTicks": 291,
        "midi": 59,
        "name": "B3",
        "ticks": 20741,
        "time": 10.802604166666667,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.12864583333333357,
        "durationTicks": 247,
        "midi": 55,
        "name": "G3",
        "ticks": 21340,
        "time": 11.114583333333334,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12708333333333321,
        "durationTicks": 244,
        "midi": 59,
        "name": "B3",
        "ticks": 21345,
        "time": 11.1171875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15989583333333357,
        "durationTicks": 307,
        "midi": 72,
        "name": "C5",
        "ticks": 23831,
        "time": 12.411979166666667,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.13177083333333428,
        "durationTicks": 253,
        "midi": 55,
        "name": "G3",
        "ticks": 23836,
        "time": 12.414583333333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14583333333333393,
        "durationTicks": 280,
        "midi": 48,
        "name": "C3",
        "ticks": 23844,
        "time": 12.41875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14270833333333321,
        "durationTicks": 274,
        "midi": 69,
        "name": "A4",
        "ticks": 23847,
        "time": 12.4203125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.12291666666666679,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 25660,
        "time": 13.364583333333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1083333333333325,
        "durationTicks": 208,
        "midi": 53,
        "name": "F3",
        "ticks": 25665,
        "time": 13.3671875,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11093750000000036,
        "durationTicks": 213,
        "midi": 53,
        "name": "F3",
        "ticks": 26303,
        "time": 13.699479166666666,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.12031250000000071,
        "durationTicks": 231,
        "midi": 57,
        "name": "A3",
        "ticks": 26304,
        "time": 13.7,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.12447916666666714,
        "durationTicks": 239,
        "midi": 55,
        "name": "G3",
        "ticks": 28759,
        "time": 14.978645833333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13072916666666679,
        "durationTicks": 251,
        "midi": 59,
        "name": "B3",
        "ticks": 28761,
        "time": 14.9796875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1473958333333325,
        "durationTicks": 283,
        "midi": 69,
        "name": "A4",
        "ticks": 28762,
        "time": 14.980208333333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 65,
        "name": "F4",
        "ticks": 28769,
        "time": 14.983854166666667,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.12916666666666643,
        "durationTicks": 248,
        "midi": 55,
        "name": "G3",
        "ticks": 30534,
        "time": 15.903125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1276041666666643,
        "durationTicks": 245,
        "midi": 59,
        "name": "B3",
        "ticks": 30546,
        "time": 15.909375,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1437500000000007,
        "durationTicks": 276,
        "midi": 55,
        "name": "G3",
        "ticks": 31132,
        "time": 16.214583333333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.14427083333333357,
        "durationTicks": 277,
        "midi": 59,
        "name": "B3",
        "ticks": 31137,
        "time": 16.2171875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12968750000000284,
        "durationTicks": 249,
        "midi": 55,
        "name": "G3",
        "ticks": 33476,
        "time": 17.435416666666665,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 48,
        "name": "C3",
        "ticks": 33492,
        "time": 17.44375,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1437500000000007,
        "durationTicks": 276,
        "midi": 67,
        "name": "G4",
        "ticks": 34061,
        "time": 17.740104166666665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.12135416666666643,
        "durationTicks": 233,
        "midi": 65,
        "name": "F4",
        "ticks": 34677,
        "time": 18.0609375,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.09895833333333215,
        "durationTicks": 190,
        "midi": 64,
        "name": "E4",
        "ticks": 35255,
        "time": 18.361979166666668,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.07500000000000284,
        "durationTicks": 144,
        "midi": 62,
        "name": "D4",
        "ticks": 35276,
        "time": 18.372916666666665,
        "velocity": 0.48031496062992124
    },
    {
        "duration": 0.16927083333333215,
        "durationTicks": 325,
        "midi": 64,
        "name": "E4",
        "ticks": 35856,
        "time": 18.675,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.10677083333333215,
        "durationTicks": 205,
        "midi": 60,
        "name": "C4",
        "ticks": 38608,
        "time": 20.108333333333334,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.11145833333333499,
        "durationTicks": 214,
        "midi": 57,
        "name": "A3",
        "ticks": 40331,
        "time": 21.005729166666665,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12604166666666572,
        "durationTicks": 242,
        "midi": 60,
        "name": "C4",
        "ticks": 40954,
        "time": 21.330208333333335,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14270833333333144,
        "durationTicks": 274,
        "midi": 60,
        "name": "C4",
        "ticks": 42799,
        "time": 22.291145833333335,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14166666666666572,
        "durationTicks": 272,
        "midi": 67,
        "name": "G4",
        "ticks": 43358,
        "time": 22.582291666666666,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.14999999999999858,
        "durationTicks": 288,
        "midi": 64,
        "name": "E4",
        "ticks": 43970,
        "time": 22.901041666666668,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.16770833333333357,
        "durationTicks": 322,
        "midi": 67,
        "name": "G4",
        "ticks": 44566,
        "time": 23.211458333333333,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.11875000000000213,
        "durationTicks": 228,
        "midi": 64,
        "name": "E4",
        "ticks": 45205,
        "time": 23.544270833333332,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13072916666666856,
        "durationTicks": 251,
        "midi": 57,
        "name": "A3",
        "ticks": 45782,
        "time": 23.844791666666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.12291666666666501,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 47684,
        "time": 24.835416666666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15208333333333357,
        "durationTicks": 292,
        "midi": 64,
        "name": "E4",
        "ticks": 48296,
        "time": 25.154166666666665,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1828125000000007,
        "durationTicks": 351,
        "midi": 67,
        "name": "G4",
        "ticks": 48868,
        "time": 25.452083333333334,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.1359375000000007,
        "durationTicks": 261,
        "midi": 64,
        "name": "E4",
        "ticks": 49450,
        "time": 25.755208333333332,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.16875000000000284,
        "durationTicks": 324,
        "midi": 60,
        "name": "C4",
        "ticks": 50095,
        "time": 26.091145833333332,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.14479166666666643,
        "durationTicks": 278,
        "midi": 57,
        "name": "A3",
        "ticks": 50697,
        "time": 26.4046875,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 53,
        "name": "F3",
        "ticks": 52561,
        "time": 27.375520833333333,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.16197916666666856,
        "durationTicks": 311,
        "midi": 59,
        "name": "B3",
        "ticks": 53177,
        "time": 27.696354166666666,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1359375000000007,
        "durationTicks": 261,
        "midi": 60,
        "name": "C4",
        "ticks": 53793,
        "time": 28.0171875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.15260416666666643,
        "durationTicks": 293,
        "midi": 55,
        "name": "G3",
        "ticks": 54362,
        "time": 28.313541666666666,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 59,
        "name": "B3",
        "ticks": 54953,
        "time": 28.621354166666666,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1380208333333357,
        "durationTicks": 265,
        "midi": 57,
        "name": "A3",
        "ticks": 55556,
        "time": 28.935416666666665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.10989583333333286,
        "durationTicks": 211,
        "midi": 57,
        "name": "A3",
        "ticks": 57299,
        "time": 29.843229166666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1328125,
        "durationTicks": 255,
        "midi": 60,
        "name": "C4",
        "ticks": 57896,
        "time": 30.154166666666665,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.11510416666666856,
        "durationTicks": 221,
        "midi": 57,
        "name": "A3",
        "ticks": 58478,
        "time": 30.457291666666666,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.10416666666666785,
        "durationTicks": 200,
        "midi": 65,
        "name": "F4",
        "ticks": 59084,
        "time": 30.772916666666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11562499999999787,
        "durationTicks": 222,
        "midi": 57,
        "name": "A3",
        "ticks": 60965,
        "time": 31.752604166666668,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.10833333333333428,
        "durationTicks": 208,
        "midi": 60,
        "name": "C4",
        "ticks": 61587,
        "time": 32.0765625,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.13749999999999574,
        "durationTicks": 264,
        "midi": 55,
        "name": "G3",
        "ticks": 62172,
        "time": 32.38125,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.10260416666666572,
        "durationTicks": 197,
        "midi": 59,
        "name": "B3",
        "ticks": 62833,
        "time": 32.725520833333334,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.12187500000000284,
        "durationTicks": 234,
        "midi": 53,
        "name": "F3",
        "ticks": 65611,
        "time": 34.17239583333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13437499999999858,
        "durationTicks": 258,
        "midi": 64,
        "name": "E4",
        "ticks": 66267,
        "time": 34.5140625,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13072916666666856,
        "durationTicks": 251,
        "midi": 60,
        "name": "C4",
        "ticks": 66275,
        "time": 34.518229166666664,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.13906250000000142,
        "durationTicks": 267,
        "midi": 57,
        "name": "A3",
        "ticks": 69626,
        "time": 36.26354166666667,
        "velocity": 0.7401574803149606
    },
    {
        "duration": 0.13697916666666288,
        "durationTicks": 263,
        "midi": 53,
        "name": "F3",
        "ticks": 69628,
        "time": 36.264583333333334,
        "velocity": 0.7401574803149606
    },
    {
        "duration": 0.12656249999999858,
        "durationTicks": 243,
        "midi": 55,
        "name": "G3",
        "ticks": 72128,
        "time": 37.56666666666667,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11354166666666288,
        "durationTicks": 218,
        "midi": 65,
        "name": "F4",
        "ticks": 72164,
        "time": 37.58541666666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.14687500000000142,
        "durationTicks": 282,
        "midi": 69,
        "name": "A4",
        "ticks": 72659,
        "time": 37.84322916666667,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.12447916666666714,
        "durationTicks": 239,
        "midi": 57,
        "name": "A3",
        "ticks": 73267,
        "time": 38.15989583333333,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 65,
        "name": "F4",
        "ticks": 73886,
        "time": 38.48229166666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13385416666666572,
        "durationTicks": 257,
        "midi": 69,
        "name": "A4",
        "ticks": 74498,
        "time": 38.80104166666667,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.12916666666666998,
        "durationTicks": 248,
        "midi": 59,
        "name": "B3",
        "ticks": 75061,
        "time": 39.09427083333333,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.10989583333333997,
        "durationTicks": 211,
        "midi": 71,
        "name": "B4",
        "ticks": 75712,
        "time": 39.43333333333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 60,
        "name": "C4",
        "ticks": 76234,
        "time": 39.70520833333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13593750000000426,
        "durationTicks": 261,
        "midi": 69,
        "name": "A4",
        "ticks": 76896,
        "time": 40.05,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.11302083333333002,
        "durationTicks": 217,
        "midi": 67,
        "name": "G4",
        "ticks": 77488,
        "time": 40.358333333333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.12604166666666572,
        "durationTicks": 242,
        "midi": 60,
        "name": "C4",
        "ticks": 78118,
        "time": 40.686458333333334,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.1328125,
        "durationTicks": 255,
        "midi": 65,
        "name": "F4",
        "ticks": 78732,
        "time": 41.00625,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12968749999999574,
        "durationTicks": 249,
        "midi": 59,
        "name": "B3",
        "ticks": 79374,
        "time": 41.340625,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.13333333333333997,
        "durationTicks": 256,
        "midi": 55,
        "name": "G3",
        "ticks": 80632,
        "time": 41.99583333333333,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.12187500000000284,
        "durationTicks": 234,
        "midi": 60,
        "name": "C4",
        "ticks": 80654,
        "time": 42.00729166666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.125,
        "durationTicks": 240,
        "midi": 55,
        "name": "G3",
        "ticks": 82578,
        "time": 43.009375,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12968750000000284,
        "durationTicks": 249,
        "midi": 48,
        "name": "C3",
        "ticks": 82604,
        "time": 43.02291666666667,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1067708333333286,
        "durationTicks": 205,
        "midi": 55,
        "name": "G3",
        "ticks": 83185,
        "time": 43.325520833333336,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.11562500000000142,
        "durationTicks": 222,
        "midi": 60,
        "name": "C4",
        "ticks": 83193,
        "time": 43.3296875,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.11093750000000568,
        "durationTicks": 213,
        "midi": 48,
        "name": "C3",
        "ticks": 83195,
        "time": 43.330729166666664,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1119791666666643,
        "durationTicks": 215,
        "midi": 67,
        "name": "G4",
        "ticks": 83198,
        "time": 43.33229166666667,
        "velocity": 0.6850393700787402
    }
];

const recordingSecondNotes = [
    {
        "duration": 0.17708333333333337,
        "durationTicks": 340,
        "midi": 55,
        "name": "G3",
        "ticks": 1481,
        "time": 0.7713541666666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.14791666666666647,
        "durationTicks": 284,
        "midi": 55,
        "name": "G3",
        "ticks": 3537,
        "time": 1.8421875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1630208333333334,
        "durationTicks": 313,
        "midi": 55,
        "name": "G3",
        "ticks": 4115,
        "time": 2.1432291666666665,
        "velocity": 0.7401574803149606
    },
    {
        "duration": 0.19895833333333357,
        "durationTicks": 382,
        "midi": 72,
        "name": "C5",
        "ticks": 5253,
        "time": 2.7359375,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.15208333333333357,
        "durationTicks": 292,
        "midi": 65,
        "name": "F4",
        "ticks": 5268,
        "time": 2.74375,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.14583333333333348,
        "durationTicks": 280,
        "midi": 69,
        "name": "A4",
        "ticks": 5270,
        "time": 2.7447916666666665,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.21875,
        "durationTicks": 420,
        "midi": 72,
        "name": "C5",
        "ticks": 7188,
        "time": 3.74375,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.18281249999999982,
        "durationTicks": 351,
        "midi": 69,
        "name": "A4",
        "ticks": 7196,
        "time": 3.747916666666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.18385416666666687,
        "durationTicks": 353,
        "midi": 65,
        "name": "F4",
        "ticks": 7200,
        "time": 3.75,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.16875000000000018,
        "durationTicks": 324,
        "midi": 55,
        "name": "G3",
        "ticks": 7767,
        "time": 4.0453125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.16093750000000018,
        "durationTicks": 309,
        "midi": 59,
        "name": "B3",
        "ticks": 7776,
        "time": 4.05,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.13593749999999982,
        "durationTicks": 261,
        "midi": 65,
        "name": "F4",
        "ticks": 8961,
        "time": 4.6671875,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.14999999999999947,
        "durationTicks": 288,
        "midi": 69,
        "name": "A4",
        "ticks": 8962,
        "time": 4.667708333333334,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14218749999999947,
        "durationTicks": 273,
        "midi": 62,
        "name": "D4",
        "ticks": 8962,
        "time": 4.667708333333334,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.13593749999999982,
        "durationTicks": 261,
        "midi": 55,
        "name": "G3",
        "ticks": 10219,
        "time": 5.322395833333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.14270833333333321,
        "durationTicks": 274,
        "midi": 48,
        "name": "C3",
        "ticks": 10248,
        "time": 5.3375,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.17447916666666607,
        "durationTicks": 335,
        "midi": 60,
        "name": "C4",
        "ticks": 11461,
        "time": 5.969270833333334,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.07604166666666679,
        "durationTicks": 146,
        "midi": 72,
        "name": "C5",
        "ticks": 12191,
        "time": 6.349479166666667,
        "velocity": 0.06299212598425197
    },
    {
        "duration": 0.18906249999999947,
        "durationTicks": 363,
        "midi": 72,
        "name": "C5",
        "ticks": 13286,
        "time": 6.919791666666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.18802083333333286,
        "durationTicks": 361,
        "midi": 71,
        "name": "B4",
        "ticks": 13918,
        "time": 7.248958333333333,
        "velocity": 0.5118110236220472
    },
    {
        "duration": 0.2520833333333332,
        "durationTicks": 484,
        "midi": 69,
        "name": "A4",
        "ticks": 14505,
        "time": 7.5546875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.16041666666666643,
        "durationTicks": 308,
        "midi": 67,
        "name": "G4",
        "ticks": 15132,
        "time": 7.88125,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.14010416666666714,
        "durationTicks": 269,
        "midi": 60,
        "name": "C4",
        "ticks": 15761,
        "time": 8.208854166666667,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.1651041666666675,
        "durationTicks": 317,
        "midi": 64,
        "name": "E4",
        "ticks": 16385,
        "time": 8.533854166666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 60,
        "name": "C4",
        "ticks": 16984,
        "time": 8.845833333333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.13802083333333393,
        "durationTicks": 265,
        "midi": 67,
        "name": "G4",
        "ticks": 17644,
        "time": 9.189583333333333,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.18541666666666679,
        "durationTicks": 356,
        "midi": 64,
        "name": "E4",
        "ticks": 17646,
        "time": 9.190625,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 57,
        "name": "A3",
        "ticks": 18219,
        "time": 9.4890625,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.14635416666666679,
        "durationTicks": 281,
        "midi": 60,
        "name": "C4",
        "ticks": 18226,
        "time": 9.492708333333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.10677083333333215,
        "durationTicks": 205,
        "midi": 57,
        "name": "A3",
        "ticks": 19577,
        "time": 10.196354166666667,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.11406249999999929,
        "durationTicks": 219,
        "midi": 60,
        "name": "C4",
        "ticks": 19578,
        "time": 10.196875,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.12552083333333286,
        "durationTicks": 241,
        "midi": 67,
        "name": "G4",
        "ticks": 20201,
        "time": 10.521354166666667,
        "velocity": 0.6929133858267716
    },
    {
        "duration": 0.16197916666666679,
        "durationTicks": 311,
        "midi": 64,
        "name": "E4",
        "ticks": 20206,
        "time": 10.523958333333333,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.12395833333333428,
        "durationTicks": 238,
        "midi": 59,
        "name": "B3",
        "ticks": 20784,
        "time": 10.825,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.11510416666666679,
        "durationTicks": 221,
        "midi": 55,
        "name": "G3",
        "ticks": 20794,
        "time": 10.830208333333333,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.12708333333333321,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 21412,
        "time": 11.152083333333334,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1291666666666682,
        "durationTicks": 248,
        "midi": 59,
        "name": "B3",
        "ticks": 21418,
        "time": 11.155208333333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15312500000000107,
        "durationTicks": 294,
        "midi": 64,
        "name": "E4",
        "ticks": 22658,
        "time": 11.801041666666666,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.17343750000000036,
        "durationTicks": 333,
        "midi": 67,
        "name": "G4",
        "ticks": 22665,
        "time": 11.8046875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.13697916666666643,
        "durationTicks": 263,
        "midi": 60,
        "name": "C4",
        "ticks": 22679,
        "time": 11.811979166666667,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.11875000000000036,
        "durationTicks": 228,
        "midi": 55,
        "name": "G3",
        "ticks": 23273,
        "time": 12.121354166666666,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1260416666666675,
        "durationTicks": 242,
        "midi": 48,
        "name": "C3",
        "ticks": 23300,
        "time": 12.135416666666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.12812499999999893,
        "durationTicks": 246,
        "midi": 55,
        "name": "G3",
        "ticks": 24513,
        "time": 12.7671875,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11197916666666607,
        "durationTicks": 215,
        "midi": 48,
        "name": "C3",
        "ticks": 24536,
        "time": 12.779166666666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.1671875000000007,
        "durationTicks": 321,
        "midi": 64,
        "name": "E4",
        "ticks": 25179,
        "time": 13.1140625,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.16666666666666607,
        "durationTicks": 320,
        "midi": 60,
        "name": "C4",
        "ticks": 25189,
        "time": 13.119270833333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1640625,
        "durationTicks": 315,
        "midi": 67,
        "name": "G4",
        "ticks": 25192,
        "time": 13.120833333333334,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1213541666666682,
        "durationTicks": 233,
        "midi": 48,
        "name": "C3",
        "ticks": 25738,
        "time": 13.405208333333333,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.1182291666666675,
        "durationTicks": 227,
        "midi": 55,
        "name": "G3",
        "ticks": 25744,
        "time": 13.408333333333333,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.11666666666666714,
        "durationTicks": 224,
        "midi": 55,
        "name": "G3",
        "ticks": 26351,
        "time": 13.724479166666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.09583333333333321,
        "durationTicks": 184,
        "midi": 48,
        "name": "C3",
        "ticks": 26393,
        "time": 13.746354166666666,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.15885416666666607,
        "durationTicks": 305,
        "midi": 64,
        "name": "E4",
        "ticks": 27591,
        "time": 14.3703125,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1671875000000007,
        "durationTicks": 321,
        "midi": 67,
        "name": "G4",
        "ticks": 27596,
        "time": 14.372916666666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15260416666666643,
        "durationTicks": 293,
        "midi": 60,
        "name": "C4",
        "ticks": 27604,
        "time": 14.377083333333333,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.1135416666666682,
        "durationTicks": 218,
        "midi": 57,
        "name": "A3",
        "ticks": 28179,
        "time": 14.6765625,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.11302083333333357,
        "durationTicks": 217,
        "midi": 53,
        "name": "F3",
        "ticks": 28190,
        "time": 14.682291666666666,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.1083333333333325,
        "durationTicks": 208,
        "midi": 57,
        "name": "A3",
        "ticks": 29376,
        "time": 15.3,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.09010416666666643,
        "durationTicks": 173,
        "midi": 53,
        "name": "F3",
        "ticks": 29386,
        "time": 15.305208333333333,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.15677083333333286,
        "durationTicks": 301,
        "midi": 64,
        "name": "E4",
        "ticks": 30018,
        "time": 15.634375,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.15104166666666607,
        "durationTicks": 290,
        "midi": 60,
        "name": "C4",
        "ticks": 30037,
        "time": 15.644270833333334,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.09166666666666679,
        "durationTicks": 176,
        "midi": 53,
        "name": "F3",
        "ticks": 30604,
        "time": 15.939583333333333,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.10312500000000036,
        "durationTicks": 198,
        "midi": 57,
        "name": "A3",
        "ticks": 30605,
        "time": 15.940104166666666,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.12291666666666856,
        "durationTicks": 236,
        "midi": 57,
        "name": "A3",
        "ticks": 31181,
        "time": 16.240104166666665,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.10364583333333144,
        "durationTicks": 199,
        "midi": 53,
        "name": "F3",
        "ticks": 31191,
        "time": 16.2453125,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.17656250000000284,
        "durationTicks": 339,
        "midi": 67,
        "name": "G4",
        "ticks": 32351,
        "time": 16.849479166666665,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.161979166666665,
        "durationTicks": 311,
        "midi": 64,
        "name": "E4",
        "ticks": 32352,
        "time": 16.85,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15781250000000213,
        "durationTicks": 303,
        "midi": 60,
        "name": "C4",
        "ticks": 32356,
        "time": 16.852083333333333,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.12187499999999929,
        "durationTicks": 234,
        "midi": 57,
        "name": "A3",
        "ticks": 32975,
        "time": 17.174479166666668,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.11770833333333286,
        "durationTicks": 226,
        "midi": 53,
        "name": "F3",
        "ticks": 32975,
        "time": 17.174479166666668,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.1171875,
        "durationTicks": 225,
        "midi": 57,
        "name": "A3",
        "ticks": 34180,
        "time": 17.802083333333332,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.09114583333333215,
        "durationTicks": 175,
        "midi": 53,
        "name": "F3",
        "ticks": 34192,
        "time": 17.808333333333334,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.138541666666665,
        "durationTicks": 266,
        "midi": 65,
        "name": "F4",
        "ticks": 34814,
        "time": 18.132291666666667,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.1401041666666636,
        "durationTicks": 269,
        "midi": 62,
        "name": "D4",
        "ticks": 34827,
        "time": 18.1390625,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.140625,
        "durationTicks": 270,
        "midi": 69,
        "name": "A4",
        "ticks": 34850,
        "time": 18.151041666666668,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.12395833333333073,
        "durationTicks": 238,
        "midi": 55,
        "name": "G3",
        "ticks": 35434,
        "time": 18.455208333333335,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.130729166666665,
        "durationTicks": 251,
        "midi": 59,
        "name": "B3",
        "ticks": 35436,
        "time": 18.45625,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.1171875,
        "durationTicks": 225,
        "midi": 55,
        "name": "G3",
        "ticks": 36077,
        "time": 18.790104166666666,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.11302083333333357,
        "durationTicks": 217,
        "midi": 59,
        "name": "B3",
        "ticks": 36089,
        "time": 18.796354166666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.13489583333333144,
        "durationTicks": 259,
        "midi": 67,
        "name": "G4",
        "ticks": 37304,
        "time": 19.429166666666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.142708333333335,
        "durationTicks": 274,
        "midi": 64,
        "name": "E4",
        "ticks": 37306,
        "time": 19.430208333333333,
        "velocity": 0.6771653543307087
    },
    {
        "duration": 0.1458333333333357,
        "durationTicks": 280,
        "midi": 71,
        "name": "B4",
        "ticks": 37307,
        "time": 19.430729166666666,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.11093750000000213,
        "durationTicks": 213,
        "midi": 57,
        "name": "A3",
        "ticks": 37959,
        "time": 19.7703125,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.11145833333333499,
        "durationTicks": 214,
        "midi": 60,
        "name": "C4",
        "ticks": 37961,
        "time": 19.771354166666665,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.14270833333333144,
        "durationTicks": 274,
        "midi": 60,
        "name": "C4",
        "ticks": 39186,
        "time": 20.409375,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.10885416666666714,
        "durationTicks": 209,
        "midi": 48,
        "name": "C3",
        "ticks": 39847,
        "time": 20.753645833333334,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.1869791666666636,
        "durationTicks": 359,
        "midi": 72,
        "name": "C5",
        "ticks": 40377,
        "time": 21.0296875,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14791666666666714,
        "durationTicks": 284,
        "midi": 55,
        "name": "G3",
        "ticks": 41012,
        "time": 21.360416666666666,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.18541666666666856,
        "durationTicks": 356,
        "midi": 71,
        "name": "B4",
        "ticks": 41618,
        "time": 21.676041666666666,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.14687500000000142,
        "durationTicks": 282,
        "midi": 69,
        "name": "A4",
        "ticks": 42236,
        "time": 21.997916666666665,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.11197916666666785,
        "durationTicks": 215,
        "midi": 53,
        "name": "F3",
        "ticks": 42849,
        "time": 22.3171875,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.16458333333333286,
        "durationTicks": 316,
        "midi": 67,
        "name": "G4",
        "ticks": 43450,
        "time": 22.630208333333332,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.130729166666665,
        "durationTicks": 251,
        "midi": 57,
        "name": "A3",
        "ticks": 44038,
        "time": 22.936458333333334,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.19166666666666643,
        "durationTicks": 368,
        "midi": 64,
        "name": "E4",
        "ticks": 44646,
        "time": 23.253125,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.15781250000000213,
        "durationTicks": 303,
        "midi": 65,
        "name": "F4",
        "ticks": 45295,
        "time": 23.591145833333332,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 0.14322916666666785,
        "durationTicks": 275,
        "midi": 60,
        "name": "C4",
        "ticks": 45880,
        "time": 23.895833333333332,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.21510416666666643,
        "durationTicks": 413,
        "midi": 64,
        "name": "E4",
        "ticks": 46479,
        "time": 24.2078125,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.12864583333333002,
        "durationTicks": 247,
        "midi": 57,
        "name": "A3",
        "ticks": 47089,
        "time": 24.525520833333335,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.1843749999999993,
        "durationTicks": 354,
        "midi": 65,
        "name": "F4",
        "ticks": 47707,
        "time": 24.847395833333334,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.13802083333333215,
        "durationTicks": 265,
        "midi": 60,
        "name": "C4",
        "ticks": 48298,
        "time": 25.155208333333334,
        "velocity": 0.5118110236220472
    },
    {
        "duration": 0.18385416666666643,
        "durationTicks": 353,
        "midi": 69,
        "name": "A4",
        "ticks": 48912,
        "time": 25.475,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.16562500000000213,
        "durationTicks": 318,
        "midi": 67,
        "name": "G4",
        "ticks": 49525,
        "time": 25.794270833333332,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.1411458333333364,
        "durationTicks": 271,
        "midi": 65,
        "name": "F4",
        "ticks": 50133,
        "time": 26.1109375,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.1328125,
        "durationTicks": 255,
        "midi": 55,
        "name": "G3",
        "ticks": 50721,
        "time": 26.4171875,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.2218750000000007,
        "durationTicks": 426,
        "midi": 60,
        "name": "C4",
        "ticks": 51354,
        "time": 26.746875,
        "velocity": 0.3543307086614173
    },
    {
        "duration": 0.20572916666666785,
        "durationTicks": 395,
        "midi": 62,
        "name": "D4",
        "ticks": 51969,
        "time": 27.0671875,
        "velocity": 0.4409448818897638
    },
    {
        "duration": 0.27187499999999787,
        "durationTicks": 522,
        "midi": 64,
        "name": "E4",
        "ticks": 52564,
        "time": 27.377083333333335,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.09166666666666501,
        "durationTicks": 176,
        "midi": 52,
        "name": "E3",
        "ticks": 53173,
        "time": 27.694270833333334,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.11093749999999858,
        "durationTicks": 213,
        "midi": 55,
        "name": "G3",
        "ticks": 53181,
        "time": 27.6984375,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.16354166666666714,
        "durationTicks": 314,
        "midi": 65,
        "name": "F4",
        "ticks": 53789,
        "time": 28.015104166666667,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.1531249999999993,
        "durationTicks": 294,
        "midi": 64,
        "name": "E4",
        "ticks": 54359,
        "time": 28.311979166666667,
        "velocity": 0.5984251968503937
    },
    {
        "duration": 0.12187499999999929,
        "durationTicks": 234,
        "midi": 62,
        "name": "D4",
        "ticks": 54958,
        "time": 28.623958333333334,
        "velocity": 0.44881889763779526
    },
    {
        "duration": 0.1197916666666643,
        "durationTicks": 230,
        "midi": 55,
        "name": "G3",
        "ticks": 55558,
        "time": 28.936458333333334,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.06666666666666998,
        "durationTicks": 128,
        "midi": 52,
        "name": "E3",
        "ticks": 55631,
        "time": 28.974479166666665,
        "velocity": 0.3700787401574803
    },
    {
        "duration": 0.16562500000000213,
        "durationTicks": 318,
        "midi": 59,
        "name": "B3",
        "ticks": 56186,
        "time": 29.263541666666665,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.14270833333333144,
        "durationTicks": 274,
        "midi": 53,
        "name": "F3",
        "ticks": 56714,
        "time": 29.538541666666667,
        "velocity": 0.4330708661417323
    },
    {
        "duration": 0.1437500000000007,
        "durationTicks": 276,
        "midi": 57,
        "name": "A3",
        "ticks": 56739,
        "time": 29.5515625,
        "velocity": 0.4566929133858268
    },
    {
        "duration": 0.20468749999999858,
        "durationTicks": 393,
        "midi": 60,
        "name": "C4",
        "ticks": 57357,
        "time": 29.8734375,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.28541666666666643,
        "durationTicks": 548,
        "midi": 62,
        "name": "D4",
        "ticks": 58019,
        "time": 30.218229166666667,
        "velocity": 0.5196850393700787
    },
    {
        "duration": 0.2593749999999986,
        "durationTicks": 498,
        "midi": 64,
        "name": "E4",
        "ticks": 58594,
        "time": 30.517708333333335,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.28489583333333357,
        "durationTicks": 547,
        "midi": 62,
        "name": "D4",
        "ticks": 59215,
        "time": 30.841145833333332,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.24322916666666572,
        "durationTicks": 467,
        "midi": 60,
        "name": "C4",
        "ticks": 59827,
        "time": 31.159895833333334,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.9260416666666629,
        "durationTicks": 1778,
        "midi": 59,
        "name": "B3",
        "ticks": 60463,
        "time": 31.491145833333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.921875,
        "durationTicks": 1770,
        "midi": 55,
        "name": "G3",
        "ticks": 60463,
        "time": 31.491145833333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.3140624999999986,
        "durationTicks": 603,
        "midi": 64,
        "name": "E4",
        "ticks": 62464,
        "time": 32.53333333333333,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 0.3609374999999986,
        "durationTicks": 693,
        "midi": 65,
        "name": "F4",
        "ticks": 63109,
        "time": 32.86927083333333,
        "velocity": 0.36220472440944884
    },
    {
        "duration": 0.30104166666667,
        "durationTicks": 578,
        "midi": 67,
        "name": "G4",
        "ticks": 63752,
        "time": 33.204166666666666,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.4151041666666657,
        "durationTicks": 797,
        "midi": 65,
        "name": "F4",
        "ticks": 64368,
        "time": 33.525,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 1.2166666666666615,
        "durationTicks": 2336,
        "midi": 57,
        "name": "A3",
        "ticks": 65066,
        "time": 33.88854166666667,
        "velocity": 0.49606299212598426
    },
    {
        "duration": 1.23802083333333,
        "durationTicks": 2377,
        "midi": 60,
        "name": "C4",
        "ticks": 65079,
        "time": 33.8953125,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.41822916666667,
        "durationTicks": 803,
        "midi": 72,
        "name": "C5",
        "ticks": 67159,
        "time": 34.97864583333333,
        "velocity": 0.6141732283464567
    },
    {
        "duration": 0.36406249999999574,
        "durationTicks": 699,
        "midi": 71,
        "name": "B4",
        "ticks": 67749,
        "time": 35.2859375,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.5135416666666686,
        "durationTicks": 986,
        "midi": 69,
        "name": "A4",
        "ticks": 68402,
        "time": 35.626041666666666,
        "velocity": 0.5275590551181102
    },
    {
        "duration": 0.8411458333333357,
        "durationTicks": 1615,
        "midi": 59,
        "name": "B3",
        "ticks": 69633,
        "time": 36.2671875,
        "velocity": 0.5354330708661418
    },
    {
        "duration": 0.80104166666667,
        "durationTicks": 1538,
        "midi": 65,
        "name": "F4",
        "ticks": 69635,
        "time": 36.268229166666664,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.7953125000000014,
        "durationTicks": 1527,
        "midi": 69,
        "name": "A4",
        "ticks": 69636,
        "time": 36.26875,
        "velocity": 0.6535433070866141
    },
    {
        "duration": 0.8302083333333314,
        "durationTicks": 1594,
        "midi": 62,
        "name": "D4",
        "ticks": 69648,
        "time": 36.275,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.23333333333333428,
        "durationTicks": 448,
        "midi": 72,
        "name": "C5",
        "ticks": 71965,
        "time": 37.481770833333336,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.1848958333333357,
        "durationTicks": 355,
        "midi": 60,
        "name": "C4",
        "ticks": 71989,
        "time": 37.49427083333333,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.18385416666666288,
        "durationTicks": 353,
        "midi": 53,
        "name": "F3",
        "ticks": 71993,
        "time": 37.49635416666667,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.2864583333333357,
        "durationTicks": 550,
        "midi": 71,
        "name": "B4",
        "ticks": 72615,
        "time": 37.8203125,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.11354166666666998,
        "durationTicks": 218,
        "midi": 69,
        "name": "A4",
        "ticks": 73234,
        "time": 38.14270833333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.10572916666666288,
        "durationTicks": 203,
        "midi": 57,
        "name": "A3",
        "ticks": 73270,
        "time": 38.161458333333336,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11354166666666288,
        "durationTicks": 218,
        "midi": 60,
        "name": "C4",
        "ticks": 73272,
        "time": 38.1625,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11249999999999716,
        "durationTicks": 216,
        "midi": 53,
        "name": "F3",
        "ticks": 73274,
        "time": 38.16354166666667,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.17291666666666572,
        "durationTicks": 332,
        "midi": 71,
        "name": "B4",
        "ticks": 74498,
        "time": 38.80104166666667,
        "velocity": 0.6692913385826772
    },
    {
        "duration": 0.11666666666666714,
        "durationTicks": 224,
        "midi": 55,
        "name": "G3",
        "ticks": 74522,
        "time": 38.813541666666666,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.1119791666666643,
        "durationTicks": 215,
        "midi": 59,
        "name": "B3",
        "ticks": 74533,
        "time": 38.819270833333334,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.06875000000000142,
        "durationTicks": 132,
        "midi": 52,
        "name": "E3",
        "ticks": 74612,
        "time": 38.860416666666666,
        "velocity": 0.3779527559055118
    },
    {
        "duration": 0.20781249999999574,
        "durationTicks": 399,
        "midi": 69,
        "name": "A4",
        "ticks": 75103,
        "time": 39.116145833333334,
        "velocity": 0.5118110236220472
    },
    {
        "duration": 0.15156249999999716,
        "durationTicks": 291,
        "midi": 67,
        "name": "G4",
        "ticks": 75714,
        "time": 39.434375,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.14010416666666714,
        "durationTicks": 269,
        "midi": 55,
        "name": "G3",
        "ticks": 75714,
        "time": 39.434375,
        "velocity": 0.5511811023622047
    },
    {
        "duration": 0.13125000000000142,
        "durationTicks": 252,
        "midi": 48,
        "name": "C3",
        "ticks": 75739,
        "time": 39.44739583333333,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.14999999999999858,
        "durationTicks": 288,
        "midi": 55,
        "name": "G3",
        "ticks": 77018,
        "time": 40.11354166666667,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.15416666666666856,
        "durationTicks": 296,
        "midi": 48,
        "name": "C3",
        "ticks": 77031,
        "time": 40.1203125,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.14687500000000142,
        "durationTicks": 282,
        "midi": 67,
        "name": "G4",
        "ticks": 77075,
        "time": 40.143229166666664,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.2239583333333357,
        "durationTicks": 430,
        "midi": 65,
        "name": "F4",
        "ticks": 77553,
        "time": 40.3921875,
        "velocity": 0.4881889763779528
    },
    {
        "duration": 0.1067708333333286,
        "durationTicks": 205,
        "midi": 64,
        "name": "E4",
        "ticks": 78264,
        "time": 40.7625,
        "velocity": 0.6299212598425197
    },
    {
        "duration": 0.10572916666666998,
        "durationTicks": 203,
        "midi": 57,
        "name": "A3",
        "ticks": 78318,
        "time": 40.790625,
        "velocity": 0.5590551181102362
    },
    {
        "duration": 0.08177083333333712,
        "durationTicks": 157,
        "midi": 53,
        "name": "F3",
        "ticks": 78318,
        "time": 40.790625,
        "velocity": 0.5669291338582677
    },
    {
        "duration": 0.16614583333333144,
        "durationTicks": 319,
        "midi": 60,
        "name": "C4",
        "ticks": 79014,
        "time": 41.153125,
        "velocity": 0.10236220472440945
    },
    {
        "duration": 0.13072916666666856,
        "durationTicks": 251,
        "midi": 62,
        "name": "D4",
        "ticks": 79550,
        "time": 41.432291666666664,
        "velocity": 0.6456692913385826
    },
    {
        "duration": 0.1302083333333286,
        "durationTicks": 250,
        "midi": 55,
        "name": "G3",
        "ticks": 79569,
        "time": 41.4421875,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.06979166666666714,
        "durationTicks": 134,
        "midi": 52,
        "name": "E3",
        "ticks": 79639,
        "time": 41.47864583333333,
        "velocity": 0.4409448818897638
    },
    {
        "duration": 0.12708333333333854,
        "durationTicks": 244,
        "midi": 55,
        "name": "G3",
        "ticks": 80842,
        "time": 42.10520833333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.10781250000000142,
        "durationTicks": 207,
        "midi": 65,
        "name": "F4",
        "ticks": 80852,
        "time": 42.110416666666666,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.12447916666666714,
        "durationTicks": 239,
        "midi": 48,
        "name": "C3",
        "ticks": 80864,
        "time": 42.11666666666667,
        "velocity": 0.5905511811023622
    },
    {
        "duration": 0.13489583333333144,
        "durationTicks": 259,
        "midi": 67,
        "name": "G4",
        "ticks": 82662,
        "time": 43.053125,
        "velocity": 0.6850393700787402
    },
    {
        "duration": 0.08385416666666856,
        "durationTicks": 161,
        "midi": 53,
        "name": "F3",
        "ticks": 82726,
        "time": 43.08645833333333,
        "velocity": 0.6377952755905512
    },
    {
        "duration": 0.09166666666666856,
        "durationTicks": 176,
        "midi": 57,
        "name": "A3",
        "ticks": 82738,
        "time": 43.092708333333334,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11406249999999574,
        "durationTicks": 219,
        "midi": 65,
        "name": "F4",
        "ticks": 83246,
        "time": 43.35729166666667,
        "velocity": 0.6062992125984252
    },
    {
        "duration": 0.11770833333333286,
        "durationTicks": 226,
        "midi": 64,
        "name": "E4",
        "ticks": 83849,
        "time": 43.67135416666667,
        "velocity": 0.5748031496062992
    },
    {
        "duration": 0.15833333333333144,
        "durationTicks": 304,
        "midi": 60,
        "name": "C4",
        "ticks": 84498,
        "time": 44.009375,
        "velocity": 0.6299212598425197
    }
];

// console.log({recordingNotes});

const recordingPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    instrMapped.color = '#008b8b';
    instrMapped.originalPosition.z -= 20;

    instrMapped.duration = datum.duration / 2;


    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingFirstNotes);      // twinkle twinkle little star
// }, recordingSecondNotes);  // bah bah black sheep
// }, recordingThirdNotes);  // alphabet song

// recordingPart.loop = true;
// recordingPart.start("0:0:0");

const recordingSecondPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    const instrMapped = generateInstrMetadata(datum.name);

    // instrMapped.color = '#0000cd';
    instrMapped.color = '#003366'; 
    instrMapped.originalPosition.z += 20;

    instrMapped.duration = datum.duration / 2;


    physics.addBody(true, Store.dropPosX, instrMapped, 0);

}, recordingSecondNotes);  // bah bah black sheep

// recordingSecondPart.loop = true;
// recordingSecondPart.start("0:0:0");