/*
 *** ECHARTS CIRCLE OF FIFTHS - PIE *** 
 // http://localhost:8082/circle-of-fifths.html
*/

import Recording from '../assets/recording/1.js';
console.log({Recording});
console.log('Recording.tracks[0].notes: ', Recording.tracks[0].notes);
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

console.log(Tonal);
console.log(Tonal.Key.minorKey("Ab"));

let counter = 1;
// const filteredNotes = toneMidiNotes.filter((note) => {
const filteredNotes = toneMidiNotes.map((note) => {
    // console.log(note);
    // note.name.slice(1, 0);

    // note.octave = note.name.substr(0, 1);
    // note.octave = note.name.substr(1, 1);
    // https://github.com/tonaljs/tonal/tree/master/packages/note
    
    note.fullNote = Tonal.Note.fromMidi(note.midi);
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
console.log({filteredNotes});

console.log(Tonal.Key.minorKey("Ab"));

const exampleMidiNote = {
    duration: 0.11458333333333348,
    durationTicks: 220,
    midi: 35,
    name: "B1",
    ticks: 7295,
    time: 3.7994791666666665,
    velocity: 0.4409448818897638,
};
console.log('exampleMidiNote: ', exampleMidiNote);

////////////
// AUDIO //
///////////
console.log({Tone});

Tone.Transport.bpm.value = 120;

const synth = new Tone.Synth().toDestination();
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();

// synth.triggerAttackRelease("C4", "8n");

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
    synthA.triggerAttackRelease(datum.fullNote, "8n", time, datum.velocity);
    updateCircleData(datum, time);
}, toneMidiNotes);
recordingPart.start(0);

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


const circleOfFifthsMajorOrderedNotes = ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F'];
const circleOfFifthsMinorOrderedNotes = ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'];
const noteInactiveColor =  '#99badd'; // carolina blue
const noteActiveColor =  '#ffff00'; // yellow

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
console.log({fullCircleData});

// const circleOfFifthsMajorData = generateCircleNotes(circleOfFifthsMajorOrderedNotes);
// console.log({circleOfFifthsMajorData});

const majorOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        },
    },
    legend: {
        type: 'plain',
        // type: 'scroll',
        data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3', 'Octave 4', 'Octave 5', 'Octave 6', 'Octave 7', 'Octave 8'],
    },
    grid: {
        // top: 90,
        // // left: '3%',
        // // right: '4%',
        // // bottom: '3%',
        // // containLabel: true,
    },
    polar: {
        // https://echarts.apache.org/en/option.html#polar
        center: ['50%', '55%%'], // position of chart relative to center of container
        // center: ['50%', '50%'], 
        // radius: '90%', 
        // radius: ['70%', '80%'], // too narrow and too large gap in center
        radius: ['60%', '85%'],
    },
    // yAxis: {
    // angleAxis: {
    radiusAxis: {
        // https://echarts.apache.org/en/option.html#radiusAxis
        type: 'value',
        // boundaryGap: [0, 0], // no effect
        axisTick: {
            // https://echarts.apache.org/en/option.html#radiusAxis.axisTick
            show: false,
        }
    },
    // xAxis: {
    // radiusAxis: {
    angleAxis: {
        // https://echarts.apache.org/en/option.html#angleAxis
        type: 'category',
        data: circleOfFifthsMajorOrderedNotes,
        clockwise: true,
        // startAngle: 90, // default
        startAngle: 105,
        // inverse: true,
        // z: 10,
        // boundaryGap: [0, 0], // no effect
        // boundaryGap: false,
    },
    series: [
        {
            type: 'bar',
            coordinateSystem: 'polar',
            name: 'Octave 0',
            stack: 'total',
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
        center: ['50%', '55%'], // position of chart relative to center of container
        // center: ['50%', '50%'],
        // radius: '90%', 
        // radius: ['70%', '80%'], // too narrow and too large gap in center
        radius: ['25%', '40%'],
    },
    // yAxis: {
    // angleAxis: {
    radiusAxis: {
        type: 'value',
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

graphCircleFifthsMinor.setOption(minorOption);

// // // 
// https://echarts.apache.org/examples/en/editor.html?c=bar-race
// https://echarts.apache.org/examples/en/editor.html?c=bar-race-country
function updateCircleData(noteData, time) {
    console.log('updateCircleData -> noteData: ', noteData);
    // console.log('updateCircleData -> time: ', time);

    const currentOctavePlayed = majorOption.series[noteData.octave];
    // console.log({currentOctavePlayed});
    
    const newOption = majorOption;
    console.log({newOption});

    currentOctavePlayed.data.forEach((octaveData, index) => {
        if (octaveData.info.midi === noteData.midi) {
            newOption.series[noteData.octave].data[index].itemStyle.color = noteActiveColor;
        }
    });

    graphCircleFifthsMajor.setOption(newOption);

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

}