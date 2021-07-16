/*
 *** ECHARTS CIRCLE OF FIFTHS - PIE *** 
 // http://localhost:8082/circle-of-fifths.html
*/

// import Recording from '../assets/recording/1.js'; // c major scale
// import Recording from '../assets/recording/1_beethoven.js'; 
// import Recording from '../assets/recording/1_c7-g7_chords.js'; 
// import Recording from '../assets/recording/1_hmesh.js'; 
// import Recording from '../assets/recording/1_aintno.js'; 
// import Recording from '../assets/recording/1_twinkle.js'; 
import Recording from '../assets/recording/1_Bb_circle.js'; 

// console.log({Recording});
// console.log('Recording.tracks[0].notes: ', Recording.tracks[0].notes);
const toneMidiNotes = Recording.tracks[0].notes;

// TODO:
// - use tonal inside pie chart label formatter to directly map Tone.js MIDI output to ECharts compatible dataset 
// - nested pie chart, outside major notes, inside minor notes
//   - https://echarts.apache.org/examples/en/editor.html?c=pie-nest
// - make border size narrow so looks like circle of fifths poster
// - interactive setInterval as song plays to update graph
// - could radar chart be used? 
//   - https://echarts.apache.org/examples/en/editor.html?c=radar
// - could bar-polar-stack-radial be used?
//   - https://echarts.apache.org/examples/en/editor.html?c=bar-polar-stack-radial
// - use bar-race approach to update circle colors as notes play
//   - https://echarts.apache.org/examples/en/editor.html?c=bar-race
//   - https://echarts.apache.org/examples/en/editor.html?c=bar-race-country

// NOTES:
// - starting point: https://echarts.apache.org/examples/en/editor.html?c=pie-nest
// https://echarts.apache.org/en/option.html#series-pie.type
// https://echarts.apache.org/en/option.html#dataset.source
//   - Row based key-value format (object array), where the keys indicate dimension names.
// - https://echarts.apache.org/examples/en/editor.html?c=dataset-link
// - https://randscullard.com/CircleOfFifths/
// https://github.com/rulkens/MagicCircleOfFifths/blob/master/code/COFChord.java

// TONAL:
// https://github.com/tonaljs/tonal
// // import { Note, Interval, Scale } from "@tonaljs/tonal";
// // import { Note, Interval, Scale } from "tonal";
// import * as Tonal from "../node_modules/@tonaljs/tonal/browser/tonal.min.js";

// import { Note } from "../node_modules/@tonaljs/tonal/browser/tonal.min.js";
// import { Note } from "../node_modules/@tonaljs/note";


//////////////////
// MIDI MAPPING //
//////////////////

// console.log(Tonal);
// console.log(Tonal.Key.minorKey("Ab"));

let counter = 1;
// const filteredNotes = toneMidiNotes.filter((note) => {
const filteredNotes = toneMidiNotes.map((note) => {
    // console.log(note);
    // note.name.slice(1, 0);

    // note.octave = note.name.substr(0, 1);
    // note.octave = note.name.substr(1, 1);
    // https://github.com/tonaljs/tonal/tree/master/packages/note
    
    note.fullNote = Tonal.Note.fromMidi(note.midi); // TODO: how to get flat notes instead of sharp
    note.info = Tonal.Note.get(note.fullNote);
    note.octave = note.info.oct;

    note.count = 1;
    // note.count = counter;
    counter++;

    // name: the note name
    // pc: the pitch class name
    // letter: the note letter
    // step: the letter number (0..6)
    // acc: the note accidentals
    // alt: the accidental number (..., -1 = 'b', 0 = '', 1 = '#', ...)
    // oct: the octave (or null if not present)
    // chroma: the note chroma (0..11)
    // midi: the note midi or null if octave is not present
    // freq: the note frequency in Hertzes, or null if the octave is note present

    //
    // Note.name("fx4"); // => "F##4"
    // Note.pitchClass("Ab5"); // => "Ab"
    // Note.accidentals("Eb"); // => 'Eb'
    // Note.octave("C4"); // => 4
    // Note.midi("A4"); // => 6
    // Note.freq("A4"); // => 440
    // Note.chroma("D"); // => 2
    // ["C", "D", "E"].map(Note.chroma); // => [0, 2, 4]
    // Note.fromMidi(61); // => "Db4"
    // Note.fromMidi(61.7); // => "D4"
    // [60, 61, 62].map(Note.fromMidi); // => ["C4", "Db4", "D4"]
    // Note.fromMidiSharps(61); // => "C#4"


    return note;
});
// console.log({filteredNotes});
// console.log(Tonal.Key.minorKey("Ab"));

// const exampleMidiNote = {
//     duration: 0.11458333333333348,
//     durationTicks: 220,
//     midi: 35,
//     name: "B1",
//     ticks: 7295,
//     time: 3.7994791666666665,
//     velocity: 0.4409448818897638,
// };
// // console.log('exampleMidiNote: ', exampleMidiNote);


////////////
// AUDIO //
///////////
// console.log({Tone});

Tone.Transport.bpm.value = 120;

const synth = new Tone.Synth().toDestination();
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();

// synth.triggerAttackRelease("C4", "8n");

// // //
// https://tonejs.github.io/examples/polySynth.html
// https://tonejs.github.io/docs/13.8.25/PolySynth
// TODO: PR with doc fix for PolySynth example -> https://github.com/Tonejs/Tone.js/blob/dev/examples/polySynth.html
const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
// const now = Tone.now()
// polySynth.triggerAttack("D4", now);
// polySynth.triggerAttack("F4", now + 0.5);

// // const polySynth = new Tone.PolySynth(10, Tone.Synth, { // ERR Uncaught Error: DEPRECATED: The polyphony count is no longer the first argument.
// // var polySynth = new Tone.PolySynth(6, Tone.Synth, {
// const polySynth = new Tone.PolySynth(6, Tone.Synth, {
//     // oscillator: {
//     //     type: "triangle", // sine, square, sawtooth, triangle (default), custom
//     //     // frequency: 440 ,
//     //     // detune: 0 ,
//     //     // phase: 0 ,
//     //     // partials: [] ,
//     //    partialCount: 0
//     // },
//     // // https://tonejs.github.io/docs/13.8.25/Envelope
//     envelope: {
//         attack: 0.02,
//         decay: 0.1,
//         sustain: 0.3,
//         release: 1,
//         // attack: 0.1,
//         // decay: 0.2,
//         // sustain: 1, // v0.5
//         // sustain: 0.5, 
//         // release: 0.8,
//     },
//     // // https://tonejs.github.io/docs/13.8.25/Filter#type
//     // filter: {
// 	// 	// type: "highpass", // lowpass, highpass, bandpass, lowshelf, highshelf, notch, allpass, peaking
// 	// },
// }).toMaster();

// // polySynth.volume.value = -8; // v0.4, v0.5
// polySynth.volume.value = -18;
// // polySynth.set("detune", +1200); // octave = 12 semitones of 100 cents each
// // polySynth.set("detune", +1200);

// // //

// https://tonejs.github.io/docs/14.7.77/Part.html
const recordingPart = new Tone.Part(function(time, datum){
    // console.log(time);
    // console.log(datum);

    // // // const instrMapped = generateInstrMetadata(datum.name);
    // // // instrMapped.color = '#FFFF00';
    // // // instrMapped.duration = datum.duration;
    // // // instrMapped.variation = 'piano';
    // // // physics.addBody(true, Store.dropPosX, instrMapped, 0);

    // // synth.triggerAttackRelease(datum.note, "8n", time, datum.velocity);
    // synthA.triggerAttackRelease(datum.fullNote, "8n", time, datum.velocity); // TODO: fix chords ERR: Tone.min.js:1 Uncaught Error: Start time must be strictly greater than previous start time

    polySynth.triggerAttackRelease(datum.fullNote, "8n", time, datum.velocity);
    updateCircleData(datum, time);
}, toneMidiNotes);
// recordingPart.start(0);
recordingPart.start(0);

setTimeout(() => {
    Tone.Transport.start();
}, 3000);
// }, 11000);

// Tone.Transport.stop();

// // //
// var allDrumsPart = new Tone.Part(function(time, instr) {
//     physics.addBody(true, Store.dropPosX, instr);
// }, [
//     ["0:0:0", Store.instr.kickPrimary],
//     ["0:1:0", Store.instr.kickPrimary],
//     ["0:2:0", Store.instr.kickPrimary],
//     // ["0:4:0", Store.instr.crashPrimary],
//     // ["0:8:0", Store.instr.snarePrimary],
//     // ["0:9:0", Store.instr.snarePrimary],
//     // ["0:4:0", Store.instr.tomHigh],
// ]);
// allDrumsPart.loop = true;
// // allDrumsPart.start("0:0:0");
// // allDrumsPart.start("1:0:0");


//////////////////
// MAJOR CIRCLE //
//////////////////

let circleFifthsMajorId = document.getElementById('music-staff-lines');
const graphMusicStaffLines = echarts.init(circleFifthsMajorId, 'tech-blue');

// https://echarts.apache.org/en/tutorial.html#Data%20Transform
// https://echarts.apache.org/examples/en/editor.html?c=doc-example/data-transform-multiple-sort-bar
//
//   Symbol       Unicode entity
// ♭ Flat	       &#x266d;
// ♮ Natural      &#x266e;
// ♯ Sharp	       &#x266f;
// 𝄫 Double flat  &#x1D12B;


const circleOfFifthsMajorOrderedNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];

// COLOR PALETTE //
// USE: https://www.canva.com/colors/color-palettes/streamers-and-confetti/
// #6BCAE2 // Aquamarine
// #AE4DAF // Orchid
// #FDF493 // Yellow
// #C1ECFD // Baby Blue
//
// https://www.canva.com/colors/color-palettes/thwarted-summer-shower/
// https://www.canva.com/colors/color-palettes/in-the-blue/
// https://www.colorhexa.com/99badd
// // const noteInactiveColor =  '#99badd'; // carolina blue
// // const noteInactiveColor =  '#d2e1f0'; // ltblue
// const noteInactiveColor =  '#FFFFE0'; // ltyellow
// const noteActiveColor =  '#6093ca'; // dkblue

const noteInactiveColor =  '#C1ECFD'; // Baby Blue
const noteActiveColor =  '#ffff00'; // yellow
// const noteActiveColor =  '#AE4DAF'; // Orchid

// // const debugNote = Tonal.Note.get('E♭'); // undef
// // const debugNote = Tonal.Note.get('Eb');
// const debugNote = Tonal.Note.get('E#');

function generateCircleNotes(noteLetters, octave=4) {
    const octaveNoteData = [];
    // circleOfFifthsMajorOrderedNotes.forEach((note, index) => {
    noteLetters.forEach((note, index) => {
        const fullNote = note + octave;
        // console.log('circleOfFifthsMajorOrderedNotes -> fullNote: ', fullNote);

        const notesDataTemplate = {
            value: 1,
            itemStyle: {
                color: noteInactiveColor,
                // color: '#99badd', // carolina blue
                // color: '#ffff00', // yellow
            },
            info: Tonal.Note.get(note + octave),
        };
        octaveNoteData.push(notesDataTemplate);
    });
    // console.log({octaveNoteData});
    return octaveNoteData;
}

const fullCircleData = [];
for (let i=0; i<=8; i++) {
    const tempOctaveData = generateCircleNotes(circleOfFifthsMajorOrderedNotes, i);
    fullCircleData.push(tempOctaveData);
}
// console.log({fullCircleData});

// const circleOfFifthsMajorData = generateCircleNotes(circleOfFifthsMajorOrderedNotes);
// console.log({circleOfFifthsMajorData});

const majorOption = {
    title: {
        show: false,
        text: 'Circle of Fifths',
        // color: '#234468',
        // textAlign: 'center',
        left: 'center',
        textStyle: {
            // https://echarts.apache.org/en/option.html#title.textStyle
            color: '#333',
            // fontFamily: '"Open Sans", Verdana, sans-serif',
            fontFamily: '"Roboto Condensed", Verdana, sans-serif',
            fontWeight: 600,
            fontSize: 16,
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        },
    },
    legend: {
        show: false,
        type: 'plain',
        // type: 'scroll',
        data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3', 'Octave 4', 'Octave 5', 'Octave 6', 'Octave 7', 'Octave 8'],
    },
    grid: {
        // top: 0,
        // containLabel: false,
        // top: 90,
        // left: '10%',
        // right: '10%',
        // containLabel: true, // no effect
    },
    yAxis: {
        // https://echarts.apache.org/en/option.html#radiusAxis
        type: 'value',
        show: false,
        // boundaryGap: [0, 0], // no effect
        axisTick: {
            // https://echarts.apache.org/en/option.html#radiusAxis.axisTick
            show: false,
        },
        // polarIndex: 1,
    },
    xAxis: {
        // https://echarts.apache.org/en/option.html#angleAxis
        type: 'category',
        show: true,
        data: circleOfFifthsMajorOrderedNotes,
        position: 'top',
        splitArea: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        // nameGap: 100, // no effect
        axisLabel: {
            interval: 0,
            margin: 0,
            color: '#234468',
            color: '#ffffff',
            // fontFamily: 'Verdana',
            fontFamily: '"Roboto Condensed", Verdana, sans-serif',
            fontWeight: 400,
            fontSize: 18, 
            // fontSize: 44, // prev
            formatter: (value, index) => {
                // console.log(value);
                // ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
                // ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F']; // undef ♭
                // ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F']; // undef ♯
                switch (value) {
                    case 'Gb':
                        return 'G♭';
                    case 'Db':
                            return 'D♭';
                    case 'Ab':
                            return 'A♭';
                    case 'Eb':
                        return 'E♭';
                    case 'Bb':
                        return 'B♭';
                    default:
                        return value;
                }
            }
        }
    },
    series: [
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 0',
            stack: 'total',
            data: fullCircleData[0],
            // https://echarts.apache.org/en/option.html#series-line.symbol
            // symbol: 'emptyCircle', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 1',
            stack: 'total',
            data: fullCircleData[1],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 2',
            stack: 'total',
            data: fullCircleData[2],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 3',
            stack: 'total',
            data: fullCircleData[3],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 4',
            stack: 'total',
            data: fullCircleData[4],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 5',
            stack: 'total',
            data: fullCircleData[5],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 6',
            stack: 'total',
            data: fullCircleData[6],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 7',
            stack: 'total',
            data: fullCircleData[7],
            symbol: 'circle',
            symbolSize: 20,
        },
        {
            type: 'line',
            // areaStyle: {},
            name: 'Octave 8',
            stack: 'total',
            data: fullCircleData[8],
            symbol: 'circle',
            symbolSize: 20,
        },
    ]
};

console.log('INITIAL -> majorOption: ', majorOption);
graphMusicStaffLines.setOption(majorOption);

let allPlayedNotes = [];

////////////
// UPDATE //
////////////

// https://echarts.apache.org/examples/en/editor.html?c=bar-race
// https://echarts.apache.org/examples/en/editor.html?c=bar-race-country
function updateCircleData(noteData, time) {
    // console.log('updateCircleData -> noteData: ', noteData);
    // console.log('updateCircleData -> time: ', time);

    // updateChordDisplay(noteData, time);

    // // //

    const newMajorOption = majorOption;

    const millisecondsNoteDuration = noteData.duration * 1000; // or use noteData.durationTicks ???
    // const millisecondsNoteDuration = noteData.durationTicks; // seems some notes are held too long
    // console.log('updateCircleData -> millisecondsNoteDuration: ', millisecondsNoteDuration);

    // const millisecondsTransportTime = time * 1000;
    // console.log('updateCircleData -> millisecondsTransportTime: ', millisecondsTransportTime);

    const currentOctavePlayed = majorOption.series[noteData.octave];
    // console.log({currentOctavePlayed});
    // console.log('majorOption.series[noteData.octave]: ', majorOption.series[noteData.octave]);
    
    currentOctavePlayed.data.forEach((octaveData, index) => {
        if (octaveData.info.midi === noteData.midi) {
            // TODO: why do fullNote and note not match (Gb vs. F#), only right side of circle is working :(
            // console.log('newMajorOption.series[noteData.octave].data[index]: ', newMajorOption.series[noteData.octave].data[index]);
            newMajorOption.series[noteData.octave].data[index].itemStyle.color = noteActiveColor;

            setTimeout(() => {
                newMajorOption.series[noteData.octave].data[index].itemStyle.color = noteInactiveColor;
            }, millisecondsNoteDuration);
            // }, 250);
        }
    });

    // TODO: use time to set newMajorOption.series[noteData.octave].data[index].itemStyle.color back to noteInactiveColor

    graphMusicStaffLines.setOption(newMajorOption);

    // TODO: include sharps and flats in MIDI data
    // - map steps to appropriate note so can call currentOctavePlayed.data[step] and update itemStyle.color to yellow
    // - update majorOption,

    // A = step: 5
    // B = step: 6
    // C = step: 0
    // D = step: 1
    // E = step: 2
    // F = step: 3
    // G = step: 4

    allPlayedNotes.push(noteData.name);
}

///////////////////
// UI - SETTINGS //
///////////////////

const elemStartSong = document.getElementById('start-song');
// elemStartSong.style.color = '#ffffff';
elemStartSong.onclick = () => {
    Tone.Transport.start();
}