import globals from './globals.js';
import InstrumentMappings from './InstrumentMappings.js';
// import { note, interval, transpose, distance, midi } from "tonal";
import * as Tonal from "tonal";
import * as WebMidi from "webmidi";
import Physics from './Physics.js';

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
        console.log({input});

        if (input !== false) {
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
        console.log({activeInput});
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

let humanKeyAdds = [],
    humanKeyRemovals = [];
function humanKeyDown(note, velocity = 0.7) {
    // console.group('Group - ', note);
    // console.log('humanKeyDown -> note: ', note);

    // console.log(Tonal);
    // console.log(Tonal.Note);

    // let tonalNote = '';
    // let tonalNote = Tonal.midi.midiToNoteName(note);
    // let tonalNote = Tonal.note("a4").freq;
    // let tonalNote = Tonal.Note.midiToFreq(note);
    let tonalNote = Tonal.Note.fromMidi(note);
    let tonalFreq = Tonal.Note.midiToFreq(note);
    // let tonalNote = midiToNoteName(61);
    console.log('Input -> NOTE:   ', tonalNote); // => "Db4");
    // console.log('tonalFreq: ', tonalFreq); // => "Db4");

    // TODO: add getNoteMapping equivalent for getting instrument by note (ex: D4)
    const instrMapped = instrument.getInstrByNote(tonalNote);
    // console.log('Input -> instrMapped: ', instrMapped);
    
    // physics.addBody(true, globals.dropPosX, '');
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

// // Startup
// function generateDummySequence() {
//     // Generate a throwaway sequence to get the RNN loaded so it doesn't
//     // cause jank later.
//     return rnn.continueSequence(
//         buildNoteSequence([{ note: 60, time: Tone.now() }]),
//         20,
//         temperature,
//         ['Cm']
//     );
// }
