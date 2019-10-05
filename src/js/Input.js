import globals from './globals.js';
import InstrumentMappings from './InstrumentMappings.js';
import Tone from 'Tone';

// import { note, interval, transpose, distance, midi } from "tonal";
import * as Tonal from "tonal";

import * as WebMidi from "webmidi";
import Physics from './Physics.js';

// Neural.js
// CODEPEN DEMO DEBUG -> -> -> https://codepen.io/sjcobb/pen/QWLemdR
// Using the Improv RNN pretrained model from https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn
let rnn = new mm.MusicRNN(
    'https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/chord_pitches_improv'
);
let temperature = 1.1;

let reverb = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').toMaster();
reverb.wet.value = 0.25;

let sampler = new Tone.Sampler(
    {
        C3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c3.mp3',
        'D#3': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds3.mp3',
        'F#3': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs3.mp3',
        A3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a3.mp3',
        C4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c4.mp3',
        'D#4': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds4.mp3',
        'F#4': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs4.mp3',
        A4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a4.mp3',
        C5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c5.mp3',
        'D#5': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds5.mp3',
        'F#5': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs5.mp3',
        A5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3'
    }
).connect(reverb);
// sampler.release.value = 2;
console.log({ rnn });
// rnn: t
//     biasShapes: []
//     checkpointURL: "https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/chord_pitches_improv"
//     initialized: false
//     lstmCells: []
//     rawVars: {}
//     spec: undefined
// console.log({sampler});

/*
 *** INPUT - MIDI KEYS MAPPING ***
 * TODO *
 * - use https://github.com/tonaljs/tonal instead of keyCode_to_note
 */

const physics = new Physics();
const instrument = new InstrumentMappings();

// constants from neural-arpeggiator
const MIN_NOTE = 48;
const MAX_NOTE = 84;
const DEFAULT_BPM = 120;
const MAX_MIDI_BPM = 240;
const TEMPO_MIDI_CONTROLLER = 20; // Control changes for tempo for this controller id

let enabledWebMidi = false;
WebMidi.enable(err => {
    if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
    } else {
        console.log("WebMidi enabled...");
        enabledWebMidi = true;

        // var input = WebMidi.getInputByName("Axiom Pro 25 USB A In");
        var input = WebMidi.getInputByName("MPK mini play");
        console.log({ input });

        if (input !== false) {
            globals.inputMidi = true;
            input.addListener('pitchbend', "all", function (e) {
                console.log("Pitch value: " + e.value); // Pitch value: -0.2528076171875
            });

            onActiveInputChange(input.id);
        }
        // _midiInput: MIDIInput
        // connection: "open"
        // id: "-456726709"
        // manufacturer: "AKAI"
        // name: "MPK mini play"
        // onmidimessage: ƒ ()
        // onstatechange: null
        // state: "connected"
        // type: "input"
        // version: ""
    }

});

if (enabledWebMidi) {
    // // var input = WebMidi.getInputByName("Axiom Pro 25 USB A In");
    // var input = WebMidi.getInputByName("MPK mini play");
    // console.log({input});

    // input.addListener('pitchbend', "all", function (e) {
    //     console.log("Pitch value: " + e.value);
    // });
}

/* teropa nerual-arpeggiator
https://codepen.io/teropa/pen/ddqEwj
https://codepen.io/sjcobb/pen/xxKXgVZ
*/

let activeInput;
function onActiveInputChange(id) {
    if (activeInput) {
        activeInput.removeListener();
    }
    let input = WebMidi.getInputById(id);
    if (input) {
        input.addListener('noteon', 1, e => {
            humanKeyDown(e.note.number, e.velocity);
            // hideUI();
        });
        input.addListener('controlchange', 1, e => {
            if (e.controller.number === TEMPO_MIDI_CONTROLLER) {
                Tone.Transport.bpm.value = (e.value / 128) * MAX_MIDI_BPM;
                echo.delayTime.value = Tone.Time('8n.').toSeconds();
            }
        });
        input.addListener('noteoff', 1, e => humanKeyUp(e.note.number));
        // for (let option of Array.from(inputSelector.children)) {
        //     option.selected = option.value === id;
        // }
        activeInput = input;
        console.log({ activeInput });
    }
}

function onActiveOutputChange(id) {
    if (activeOutput !== 'internal') {
        outputs[activeOutput] = null;
    }
    activeOutput = id;
    if (activeOutput !== 'internal') {
        let output = WebMidi.getOutputById(id);
        outputs[id] = {
            play: (note, velocity = 1, time, hold = false) => {
                if (!hold) {
                    let delay = (time - Tone.now()) * 1000;
                    let duration = Tone.Time('16n').toMilliseconds();
                    output.playNote(note, 'all', {
                        time: delay > 0 ? `+${delay}` : WebMidi.now,
                        velocity,
                        duration
                    });
                }
            },
            stop: (note, time) => {
                let delay = (time - Tone.now()) * 1000;
                output.stopNote(note, 2, {
                    time: delay > 0 ? `+${delay}` : WebMidi.now
                });
            }
        };
    }
    // for (let option of Array.from(outputSelector.children)) {
    //     option.selected = option.value === id;
    // }
}

function getInstrByInputNote(note = 'C4') {
    console.log('getInstrByInputNote -> note:   ', note); // => "Db4");
    return instrument.getInstrByNote(note);
}

let humanKeyAdds = [],
    humanKeyRemovals = [];
function humanKeyDown(note, velocity = 0.7) {
    // console.group('Group - ', note);
    // console.log('humanKeyDown -> note: ', note);

    // console.log(Tonal);
    // console.log(Tonal.Note);

    // let tonalNote = Tonal.midi.midiToNoteName(note);
    // let tonalNote = Tonal.note("a4").freq;
    // let tonalNote = Tonal.Note.midiToFreq(note);
    let tonalNote = Tonal.Note.fromMidi(note);
    let tonalFreq = Tonal.Note.midiToFreq(note);

    const instrMapped = getInstrByInputNote(tonalNote);

    physics.addBody(true, globals.dropPosX, instrMapped);

    // console.log('humanKeyDown -> velocity: ', velocity);
    if (note < MIN_NOTE || note > MAX_NOTE) return;
    humanKeyAdds.push({ note, velocity });
    // console.log({humanKeyAdds});
}
function humanKeyUp(note) {
    if (note < MIN_NOTE || note > MAX_NOTE) return;
    humanKeyRemovals.push({ note });
    // console.log({humanKeyRemovals});
}

function machineKeyDown(midiNote = 60, time = 0) {
    console.log('machineKeyDown -> midiNote: ', midiNote);
    console.log('machineKeyDown -> time: ', time);

    let note = Tonal.Note.fromMidi(midiNote);
    console.log('machineKeyDown -> note: ', note);

    const instrMapped = getInstrByInputNote(note);
    console.log('machineKeyDown -> instrMapped: ', instrMapped);

    physics.addBody(true, globals.dropPosX, instrMapped);
    // TODO: how to time note drop using Transport.scheduleRepeat or Tone.Part
    // // https://tonejs.github.io/docs/13.8.25/Transport
    // setTimeout(physics.addBody(true, globals.dropPosX, instrMapped), 2000);

    // if (note < MIN_NOTE || note > MAX_NOTE) return;
    // sampler.triggerAttack(Tone.Frequency(note, 'midi'));
    // animatePlay(onScreenKeyboard[note - MIN_NOTE], note, false);
    // animateMachine(machinePlayer[note - MIN_NOTE]);
}

function buildNoteSequence(seed) {
    console.log('buildNoteSequence -> seed: ', seed);
    // // seed:
    // [{note: 60, time: 0.546984126984127}]

    // // seqOpts:
    // notes: [{pitch: 60, startTime: 0, endTime: 0.5}]
    // quantizationInfo: {stepsPerQuarter: 1}
    // tempos: [{time: 0, qpm: 120}]
    // ticksPerQuarter: 220
    // timeSignatures: [{time: 0, numerator: 4, denominator: 4}]
    // totalTime: 0.5

    const seqOpts = {
        ticksPerQuarter: 220,
        totalTime: seed.length * 0.5,
        quantizationInfo: {
            stepsPerQuarter: 1
        },
        timeSignatures: [
            {
                time: 0,
                numerator: 4,
                denominator: 4
            }
        ],
        tempos: [
            {
                time: 0,
                qpm: 120
            }
        ],
        notes: seed.map((n, idx) => ({
            pitch: n.note,
            startTime: idx * 0.5,
            endTime: (idx + 1) * 0.5
        }))
    };
    console.log({ seqOpts });

    return mm.sequences.quantizeNoteSequence(
        seqOpts,
        1
    );
}

function startSequenceGenerator(seedSeq = [], seedInput = [{ note: 60, time: Tone.now() }]) {
    console.log('startSequenceGenerator -> seedSeq: ', seedSeq);

    console.log('seedSeq -> notes: ', seedSeq.notes);
    // let generatedSequence =
    //     Math.random() < 0.7 ? _.clone(seedSeq.notes.map(n => n.pitch)) : [];

    let generatedSequence = seedSeq.notes.map(n => n.pitch);
    console.log({generatedSequence});

    generatedSequence.forEach((seqDatum, seqIndex) => {
        console.log({seqDatum});
        machineKeyDown(seqDatum, seqIndex);
        // setTimeout(machineKeyDown(seqDatum, seqIndex), seqIndex * 2000);
        // setTimeout(machineKeyDown(seqDatum, seqIndex), 5000);
    });

    // https://tonejs.github.io/docs/13.8.25/Transport
    Tone.Transport.scheduleRepeat(function(time){
        //
    }, "8n");
    // }, "16:0:0");

    // const generatedNotes = generateDummySequence();
    // console.log({generatedNotes});

    // // // //

    // let running = true,
    //     lastGenerationTask = Promise.resolve();

    // let chords = detectChord(seed);
    // let chord = _.first(chords) || 'CM';
    // let seedSeq = buildNoteSequence(seed);
    // let generatedSequence =
    //     Math.random() < 0.7 ? _.clone(seedSeq.notes.map(n => n.pitch)) : [];
    // let launchWaitTime = getSequenceLaunchWaitTime(seed);
    // let playIntervalTime = getSequencePlayIntervalTime(seed);
    // let generationIntervalTime = playIntervalTime / 2;

    // function generateNext() {
    //     if (!running) return;
    //     if (generatedSequence.length < 10) {
    //         lastGenerationTask = rnn
    //             .continueSequence(seedSeq, 20, temperature, [chord])
    //             .then(genSeq => {
    //                 generatedSequence = generatedSequence.concat(
    //                     genSeq.notes.map(n => n.pitch)
    //                 );
    //                 setTimeout(generateNext, generationIntervalTime * 1000);
    //             });
    //     } else {
    //         setTimeout(generateNext, generationIntervalTime * 1000);
    //     }
    // }

    // function consumeNext(time) {
    //     if (generatedSequence.length) {
    //         console.log('consumeNext -> generatedSequence: ', generatedSequence);
    //         let note = generatedSequence.shift();
    //         if (note > 0) {
    //             machineKeyDown(note, time);
    //         }
    //     }
    // }

    // setTimeout(generateNext, launchWaitTime * 1000);
    // let consumerId = Tone.Transport.scheduleRepeat(
    //     consumeNext,
    //     playIntervalTime,
    //     Tone.Transport.seconds + launchWaitTime
    // );

    // return () => {
    //     running = false;
    //     Tone.Transport.clear(consumerId);
    // };
}

function generateDummySequence(seed = [{ note: 60, time: Tone.now() }]) {
    console.log('generateDummySequence called......');
    // IF rnn.initialize() NOT RUN THEN - ERR: magentamusic.js:45080 Uncaught (in promise) Error: Unexpected chord progression provided.

    const sequence = rnn.continueSequence(
        buildNoteSequence(seed),
        20,
        temperature,
        ['Cm']
    );
    console.log('generateDummySequence -> sequence: ', sequence);
    return sequence;
}

/* AYSNC - AWAIT VERSION */
rnn.initialize();
function resolveAfterDelay() {
    return new Promise(resolve => {
        setTimeout(() => {
            // // resolve('resolved');
            // const dummySequence = generateDummySequence();
            // console.log('dummySequence: ', dummySequence);
            resolve(generateDummySequence());
            // // notes:
            // [
            //     {pitch: 57, quantizedStartStep: 1, quantizedEndStep: 3}
            //     {pitch: 55, quantizedStartStep: 3, quantizedEndStep: 5}
            //     {pitch: 55, quantizedStartStep: 5, quantizedEndStep: 7}
            //     {pitch: 55, quantizedStartStep: 7, quantizedEndStep: 15}
            //     {pitch: 55, quantizedStartStep: 15, quantizedEndStep: 17}
            //     {pitch: 55, quantizedStartStep: 17, quantizedEndStep: 19}
            //     {pitch: 60, quantizedStartStep: 19, quantizedEndStep: 20}
            // ]
        }, 2000);
    });
}
function initRNN() {
    return new Promise(resolve => {
        rnn.initialize();
        resolve('resolved');
    });
}
// async function asyncGeneratePattern() {
//     console.log('asyncGeneratePattern() run......');
//     var result = await resolveAfterDelay();
//     // // var result = await initRNN(); // TODO: fix so it resolves after RNN is initialized (takes about 1 second after page load)
//     console.log(result);
// }
// asyncGeneratePattern();

// // rnn.initialize();
// window.setTimeout(generateDummySequence(), 5000);
// // generateDummySequence();

// window.onload = () => {
document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (event) {
        let keyMapped = instrument.getKeyboardMapping(keyName);
        console.log({ keyMapped });

        switch (keyName) {
            case ('0'):
                console.log('0 pressed -> generateDummySequence...')
                
                let generatedPattern = [];
                async function asyncGeneratePattern() {
                    console.log('asyncGeneratePattern() run......');
                    // var result = await resolveAfterDelay();
                    generatedPattern = await resolveAfterDelay();
                    if (generatedPattern) {
                        startSequenceGenerator(generatedPattern);
                    }
                }
                asyncGeneratePattern();

                // startSequenceGenerator(generatedPattern); 
        }
    }
}, false);
// };

/* PROMISE VERSION */
// let bufferLoadPromise = new Promise(res => Tone.Buffer.on('load', res));
// Promise.all([bufferLoadPromise, rnn.initialize()])
//   .then(generateDummySequence)
// //   .then(() => {
// //     Tone.Transport.start();
// //     onScreenKeyboardContainer.classList.add('loaded');
// //     document.querySelector('.loading').remove();
// //   });
// // // StartAudioContext(Tone.context, document.documentElement);

/*
 * https://codepen.io/sjcobb/pen/QWLemdR
 * https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn
 * https://tensorflow.github.io/magenta-js/music/modules/_core_sequences_.html#quantizenotesequence
 * https://bl.ocks.org/virtix/be35c6c69b08c10b0968fb5f8a657474
 * https://medium.com/@oluwafunmi.ojo/getting-started-with-magenta-js-e7ffbcb64c21
 * https://observablehq.com/@visnup/using-magenta-music-as-a-midi-player
 *
 * quantizeNoteSequence
 * console.log of consumeNext -> generatedSequence:  (15) [69, 67, 74, 76, 83, 81, 79, 78, 79, 77, 74, 76, 76, 72, 69]
 * also see: updateChord -> currentSeed
 * results in:
 * machineKeyDown -> note:  69
 * machineKeyDown -> time:  2.7666666666666697
 */

/* Neural Drum Machine
* https://codepen.io/teropa/pen/JLjXGK
*
*/