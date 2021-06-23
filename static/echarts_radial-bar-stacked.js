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
recordingPart.start(3);

Tone.Transport.start();
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

let circleFifthsMajorId = document.getElementById('circle-of-fifths-major');
const graphCircleFifthsMajor = echarts.init(circleFifthsMajorId, 'tech-blue');

// https://echarts.apache.org/en/tutorial.html#Data%20Transform
// https://echarts.apache.org/examples/en/editor.html?c=doc-example/data-transform-multiple-sort-bar
//
//   Symbol       Unicode entity
// ♭ Flat	       &#x266d;
// ♮ Natural      &#x266e;
// ♯ Sharp	       &#x266f;
// 𝄫 Double flat  &#x1D12B;


const circleOfFifthsMajorOrderedNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
// const circleOfFifthsMajorOrderedNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F']; // undef ♭
// const circleOfFifthsMajorOrderedNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F']; // undef ♯

// const circleOfFifthsMinorOrderedNotes = ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm']; // undef ♯ ♭
const circleOfFifthsMinorOrderedNotes = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];

// https://www.colorhexa.com/99badd
// const noteInactiveColor =  '#99badd'; // carolina blue
const noteInactiveColor =  '#d2e1f0'; // ltblue
const noteActiveColor =  '#6093ca'; // dkblue
// const noteActiveColor =  '#ffff00'; // yellow

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
        color: '#234468',
        // textAlign: 'center',
        left: 'center',
        textStyle: {
            // https://echarts.apache.org/en/option.html#title.textStyle
            color: '#333',
            fontFamily: 'Verdana',
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
        // // left: '3%',
        // // right: '4%',
        // // bottom: '3%',
        // // containLabel: true,
    },
    polar: {
        // https://echarts.apache.org/en/option.html#polar
        // center = position of chart relative to center of container
        // center: ['50%', '55%%'], // needed when legend.show = true
        center: ['50%', '50%'], 
        // radius: '90%', 
        // radius: ['70%', '80%'], // too narrow and too large gap in center
        // radius: ['60%', '85%'], // prev
        radius: ['52%', '85%'], 
    },
    // yAxis: {
    radiusAxis: {
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
    // xAxis: {
    // radiusAxis: {
    angleAxis: {
        // https://echarts.apache.org/en/option.html#angleAxis
        type: 'category',
        show: true,
        data: circleOfFifthsMajorOrderedNotes,
        clockwise: true,
        // startAngle: 90, // default
        startAngle: 105,
        // inverse: true,
        // z: 10,
        // boundaryGap: [0, 0], // no effect
        // boundaryGap: false,
        // splitNumber: 5,
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
            margin: 8,
            color: '#234468',
            fontFamily: 'Verdana',
            fontWeight: 600,
            fontSize: 22,
            formatter: (value, index) => {
                // console.log(value);
                ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
                ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F']; // undef ♭
                ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F']; // undef ♯
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
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 0',
            stack: 'total',
            // barGap: 0, // no effect
            // barCategoryGap: 0,
            barCategoryGap: 1,
            // 
            // label: {
            //     show: true
            // },
            // // data: [1, 3, 2, 4, 1, 3, 5, 2, 3, 2, 4, 1],
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            // data: [
            //     1, 
            //     1, 
            //     1, 
            //     {
            //         value: 1,
            //         itemStyle: {
            //             color: '#ffff00'
            //         }
            //     },
            //     1, 
            //     1, 
            //     1, 
            //     1, 
            //     1, 
            //     {
            //         value: 1,
            //         itemStyle: {
            //             color: '#ffff00'
            //         }
            //     },
            //     1, 
            //     1,
            // ],
            data: fullCircleData[0],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 1',
            stack: 'total',
            // // data: [2, 1, 2, 3, 1, 2, 3, 5, 2, 1, 3, 2],
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[1],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 2',
            stack: 'total',
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[2],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 3',
            stack: 'total',
            // // data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            // // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            // data: [
            //     1, 
            //     1, 
            //     1, 
            //     1,
            //     {
            //         value: 1,
            //         itemStyle: {
            //             color: '#ffff00'
            //         }
            //     }, 
            //     1, 
            //     1, 
            //     1, 
            //     1, 
            //     1,
            //     1, 
            //     1,
            // ],
            data: fullCircleData[3],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 4',
            stack: 'total',
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[4],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 5',
            stack: 'total',
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[5],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 6',
            stack: 'total',
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[6],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 7',
            stack: 'total',
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[7],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 8',
            stack: 'total',
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            data: fullCircleData[8],
        },
    ]
};

console.log('INITIAL -> majorOption: ', majorOption);
graphCircleFifthsMajor.setOption(majorOption);


//////////////////
// MINOR CIRCLE //
//////////////////
let circleFifthsMinorId = document.getElementById('circle-of-fifths-minor');
const graphCircleFifthsMinor = echarts.init(circleFifthsMinorId, 'tech-blue');

const minorOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        },
    },
    legend: {
        show: false,
        data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3', 'Octave 4', 'Octave 5', 'Octave 6', 'Octave 7', 'Octave 8'],
    },
    grid: {
        // left: '3%',
        // right: '4%',
        // bottom: '3%',
        // containLabel: true,
    },
    polar: {
        // https://echarts.apache.org/en/option.html#polar
        // center = position of chart relative to center of container
        // center: ['50%', '55%'], // needed when legend.show = true
        center: ['50%', '50%'],
        // radius: '90%', 
        // radius: ['70%', '80%'], // too narrow and too large gap in center
        radius: ['25%', '40%'],
    },
    // yAxis: {
    radiusAxis: {
        type: 'value',
        show: false,
        axisTick: {
            // https://echarts.apache.org/en/option.html#radiusAxis.axisTick
            show: false,
        },
    },
    // xAxis: {
    // radiusAxis: {
    angleAxis: {
        type: 'category',
        // data: ['Am', 'Em', 'Bm', 'G♭m', 'D♭m', 'A♭m', 'E♭m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'],
        // data: ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'],\
        data: circleOfFifthsMinorOrderedNotes,
        clockwise: true,
        // startAngle: 90, // default
        startAngle: 105,
        // inverse: true,
        // z: 10,
    },
    series: [
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 0',
            stack: 'total',
            label: {
                show: true
            },
            data: [1, 3, 2, 4, 1, 3, 5, 2, 3, 2, 4, 1],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 1',
            stack: 'total',
            label: {
                show: true
            },
            data: [2, 1, 2, 3, 1, 2, 3, 5, 2, 1, 3, 2],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 2',
            stack: 'total',
            label: {
                show: true
            },
            data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 3',
            stack: 'total',
            label: {
                show: true
            },
            data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
    ]
};

// graphCircleFifthsMinor.setOption(minorOption);


//////////////////
// CHORD CENTER //
//////////////////

let circleFifthsChordsId = document.getElementById('circle-of-fifths-chords');
const graphCircleFifthsChords = echarts.init(circleFifthsChordsId, 'tech-blue');

// https://echarts.apache.org/examples/en/editor.html?c=pie-doughnut
const chordsOption = {
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {            // Use axis to trigger tooltip
    //         type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
    //     },
    // },
    // legend: {
    //     show: false,
    //     data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3', 'Octave 4', 'Octave 5', 'Octave 6', 'Octave 7', 'Octave 8'],
    // },
    grid: {
        // left: '3%',
        // right: '4%',
        // bottom: '3%',
        // containLabel: true,
    },
    series: [
        {
            // https://echarts.apache.org/en/option.html#series-pie.type
            type: 'pie',
            // name: 'Chord',
            // radius: [0, '20%'],
            // radius: ['35%', '40%'], // decent
            // radius: ['51%', '52%'],
            radius: ['51.5%', '52%'],
            // radius: ['60%', '85%'],
            center: ['50%', '50%'],
            // https://echarts.apache.org/en/option.html#series-pie.animationDuration
            animationDuration: 25, // default: 1000
            animationEasing: 'linear', // default: 'cubicOut'
            label: {
                show: true,
                position: 'center',
                //formatter: `{title|${totalFormatted}}\n\n{textMuted|${labelFormatter(config.interiorElement.label.text ? config.interiorElement.label.text : '', 30)}}`
                // // https://echarts.apache.org/en/option.html#series-pie.label.formatter
                // Model variation includes:
                //     {a}: series name.
                //     {b}: the name of a data item.
                //     {c}: the value of a data item.
                //     {d}: the percent.
                //     {@xxx}: the value of a dimension named 'xxx', for example, {@product} refers the value of 'product' dimension.
                //     {@[n]}: the value of a dimension at the index of n, for example, {@[3]} refers the value at dimensions[3].
                // formatter: '{b}: {d}'
                formatter: '{chordName|{b}}',
                rich: {
                    chordName: {
                        color: '#000',
                        // fontFamily: '"Open Sans", Verdana, sans-serif',
                        fontFamily: 'Verdana, sans-serif',
                        fontSize: 32,
                        fontWeight: 'bold',
                        lineHeight: 34
                    },
                }
            },
            data: [
                {
                    // // name: 'Chord',
                    // name: 'Gmaj7', // prev
                    name: '',
                    value: 1,
                    //
                    // // https://github.com/tonaljs/tonal/tree/master/packages/chord
                    // Tonal.Chord.getChord("maj7", "G4", "B4"); // =>
                    //     // {
                    //     //   empty: false,
                    //     //   name: "G major seventh over B",
                    //     //   symbol: "Gmaj7/B",
                    //     //   tonic: "G4",
                    //     //   root: "B4",
                    //     //   rootDegree: 2,
                    //     //   setNum: 2193,
                    //     //   type: "major seventh",
                    //     //   aliases: ["maj7", "Δ", "ma7", "M7", "Maj7"],
                    //     //   chroma: "100010010001",
                    //     //   intervals: ["3M", "5P", "7M", "8P"],
                    //     //   normalized: "100010010001",
                    //     //   notes: ["B4", "D5", "F#5", "G5"],
                    //     //   quality: "Major",
                    //     // }
                }
            ],
            // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            silent: true,
        },
        // {
        //     type: 'pie',
        //     center: piePosition,
        //     radius: donutRadius,
        //     label: {
        //         fontSize: 10,
        //         fontWeight: 'bold',
        //         lineHeight: 12,
        //         position: 'center',
        //         formatter: `{title|${totalFormatted}}\n\n{textMuted|${labelFormatter(config.interiorElement.label.text ? config.interiorElement.label.text : '', 30)}}`
        //     },
        //     silent: silent
        // }
        // label: {
        //     normal: {
        //         show: showLabel,
        //         formatter: (params: any) => {
        //             const valueFormatted = styleFormatter(config, params.value[2], 'labelBold');

        //             const percentFormatted = styleFormatter(config, params.percent / 100, 'labelDefault');
        //             const maxLength = 16;
        //             const wrappedLabelName = labelFormatter(params.name, maxLength);
        //             return `{textPercent|${percentFormatted}}\n{subTitle|${valueFormatted}}\n{textMuted|${wrappedLabelName}}`;
        //         },
        //         rich: {
        //             subTitle: {
        //                 color: '#000',
        //                 fontFamily: '"Open Sans", Verdana, sans-serif',
        //                 fontSize: 12,
        //                 fontWeight: 'bold',
        //                 lineHeight: 14
        //             },
        //             textPercent: {
        //                 fontFamily: '"Open Sans", Verdana, sans-serif',
        //                 fontSize: 10,
        //                 fontWeight: 'normal',
        //                 lineHeight: 12
        //             },
        //             textMuted: {
        //                 color: '#bbbcbc',
        //                 fontFamily: '"Open Sans", Verdana, sans-serif',
        //                 fontSize: 10,
        //                 fontWeight: 600,
        //                 lineHeight: 12
        //             }
        //         }
        //     }
        // },
    ]
};
console.log('INITIAL -> chordsOption: ', chordsOption);
graphCircleFifthsChords.setOption(chordsOption);

let allPlayedNotes = [];
let chordsPlayed = [];
let lastTime = 0;
let tempNotes = [];
function updateChordDisplay(noteData, time) {

    const timeDifference = time - lastTime;
    console.log({timeDifference});
    // if ((time - lastTime) < 0.5) {
    // if ((time - lastTime) < 0.7) {
    // if ((time - lastTime) < 0.4) {
    // if ((time - lastTime) < 0.5) {
    if ((time - lastTime) < 1.2) {
        // tempNotes.push(noteData.name); // sharps
        tempNotes.push(noteData.fullNote);  // flats
    } else {
        tempNotes = [];
    }
    console.log('tempNotes: ', tempNotes);

    // if (allPlayedNotes.length % 4 === 0) {
    if (tempNotes.length > 2 && tempNotes.length < 10) {
        // console.log(Tonal);
        // Tonal.ChordDetect.detect(allPlayedNotes);

        // console.log(Chord);
        // let currentChord = Tonal.Chord.detect(allPlayedNotes);
        let currentChord = Tonal.Chord.detect(tempNotes);
        // console.log({currentChord});

        if (currentChord.length) {
            let currentChordNoRoot = currentChord[0].slice(0, currentChord[0].length - 2);
            // console.log({currentChordNoRoot});

            let currentChordSplit = currentChord[0].split('/');
            console.log({currentChordSplit});

            // const currentChordInfo = Tonal.Chord.get(currentChordNoRoot);
            let currentChordInfo = Tonal.Chord.get(currentChordSplit[0]);
            let currentChordDisplayName = currentChordInfo.name;

            console.log({currentChordInfo});
            // console.log({currentChordDisplayName});
            
            if (currentChordDisplayName) {
                currentChordInfo = currentChordInfo;

                // allPlayedNotes = allPlayedNotes.slice(4);

                // chordsPlayed.push(currentChordInfo.symbol);
                chordsPlayed.push(currentChordDisplayName);
                console.log('chordsPlayed: ', chordsPlayed);

                // TODO: look into using Chord.extended (chords names that are a superset of the given one)
                // ex: Chord.extended("Cmaj7");
                // // https://github.com/tonaljs/tonal/tree/master/packages/chord-type
                // ChordType.get(name: string) => object
                // Given a chord type name, return an object with the following properties:
                // name: the chord type name
                // aliases: a list of alternative names
                // quality: Major | Minor | Augmented | Diminished | Unknown
                // num: the pcset number
                // chroma: the pcset chroma
                // length: the number of notes
                // intervals: the interval list
                // console.log(Tonal.ChordType.get(currentChordDisplayName)); // unknown
                // console.log(Tonal.ChordType.get(currentChordInfo.symbol)); // unknown
            }
            tempNotes = [];
        } else {
            tempNotes = [];
        }

        // console.log(Tonal.Chord.getChord(currentChord[0]));
        // console.log(Tonal.Chord.getChord("maj7", "G4", "B4"));

        // https://github.com/tonaljs/tonal/tree/master/packages/chord
        // ...
        // Tonal.Chord.getChord("maj7", "G4", "B4"); // =>
        // {
        //   empty: false,
        //   name: "G major seventh over B",
        //   symbol: "Gmaj7/B",
        //   tonic: "G4",
        //   root: "B4",
        //   rootDegree: 2,
        //   setNum: 2193,
        //   type: "major seventh",
        //   aliases: ["maj7", "Δ", "ma7", "M7", "Maj7"],
        //   chroma: "100010010001",
        //   intervals: ["3M", "5P", "7M", "8P"],
        //   normalized: "100010010001",
        //   notes: ["B4", "D5", "F#5", "G5"],
        //   quality: "Major",
        // }

        // Tonal.Chord.reduced("Cmaj7"); // => ["C5", "CM"]
    }

    lastTime = time;
}


////////////
// UPDATE //
////////////

// https://echarts.apache.org/examples/en/editor.html?c=bar-race
// https://echarts.apache.org/examples/en/editor.html?c=bar-race-country
function updateCircleData(noteData, time) {
    // console.log('updateCircleData -> noteData: ', noteData);
    // console.log('updateCircleData -> time: ', time);

    updateChordDisplay(noteData, time);

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

    graphCircleFifthsMajor.setOption(newMajorOption);

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

    // // //

    const newChordsOption = chordsOption;
    // newChordsOption.series[0].data[0].name = noteData.name; // "C3"
    // // newChordsOption.series[0].data[0].name = noteData.fullNote; // "C3"
    // // newChordsOption.series[0].data[0].value = 2;

    if (chordsPlayed.length > 0) {
        // console.log({chordsPlayed});
        // newChordsOption.series[0].data[0].name = chordsPlayed[0];
        // newChordsOption.series[0].data[0].name = chordsPlayed[chordsPlayed.length - 1];

        const formattedChordLabel = labelFormatter(chordsPlayed[0], 14);
        // console.log({formattedChordLabel});
        // newChordsOption.series[0].data[0].name = chordsPlayed[0];
        newChordsOption.series[0].data[0].name = formattedChordLabel;
        chordsPlayed.pop();
    }
    
    graphCircleFifthsChords.setOption(newChordsOption);

    // updateChordDisplay(noteData, time);
}

// axisLabelFormatter(label: string, maxLength: number = 10, lineBreakStyle: string = 'endline') {
function labelFormatter(label, maxLength, lineBreakStyle = 'endline') {
    if (label.length <= maxLength) {
        return label;
    }

    let lineBreakText = '\n';
    if (lineBreakStyle === 'html') {
        lineBreakText = '<br />';
    }

    let trunc;
    let useIndex = maxLength;
    // Find last space before maxLength
    for (let i = 0; i <= maxLength; i++) {
        if (label.charAt(i) === ' ') {
            useIndex = i;
        }
    }
    if (useIndex < maxLength) {
        trunc = _.truncate(label.substring(useIndex + 1), { 'length': maxLength, 'separator': ' ' });
        return `${label.substring(0, useIndex)}${lineBreakText}${trunc}`;
    } else {
        trunc = _.truncate(label.substring(maxLength), { 'length': maxLength, 'separator': ' ' });
        return `${label.substring(0, maxLength)}${lineBreakText}${trunc}`;
    }
}
