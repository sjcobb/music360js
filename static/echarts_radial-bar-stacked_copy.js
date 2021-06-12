////////////////////////////////////
// ECHARTS CIRCLE OF FIFTHS - PIE //
////////////////////////////////////
// http://localhost:8082/circle-of-fifths.html

// TODO:
// - use tonal inside pie chart label formatter to directly map Tone.js MIDI output to ECharts compatible dataset 
// - nested pie chart, outside major notes, inside minor notes
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

// https://github.com/tonaljs/tonal
// // import { Note, Interval, Scale } from "@tonaljs/tonal";
// // import { Note, Interval, Scale } from "tonal";
// import * as Tonal from "../node_modules/@tonaljs/tonal/browser/tonal.min.js";

// import { Note } from "../node_modules/@tonaljs/tonal/browser/tonal.min.js";
// import { Note } from "../node_modules/@tonaljs/note";

console.log(Tonal);
console.log(Tonal.Key.minorKey("Ab"));

import Recording from '../assets/recording/1.js';
console.log({Recording});

console.log('Recording.tracks[0].notes: ', Recording.tracks[0].notes);
const toneMidiNotes = Recording.tracks[0].notes;

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

// // //

let circleFifthsId = document.getElementById('circle-of-fifths-alt');
const graphCircleFifths = echarts.init(circleFifthsId, 'tech-blue');

// https://echarts.apache.org/en/tutorial.html#Data%20Transform
// https://echarts.apache.org/examples/en/editor.html?c=doc-example/data-transform-multiple-sort-bar

const option = {
    legend: {
        show: true,
    },
    tooltip: {},
    dataset: [
        {
            // dimensions: ['duration', 'durationTicks', 'midi', 'name', 'ticks', 'time', 'velocity'],
            source: toneMidiNotes,
        },
    ],
    angleAxis: {
        // https://echarts.apache.org/en/option.html#angleAxis
        type: 'category',
        // data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    radiusAxis: {
    },
    polar: {
    },
    series: [
        {
            type: 'bar', 
            stack: 'all',
            coordinateSystem: 'polar',
            name: 'A',
            encode: {
                // https://echarts.apache.org/en/option.html#series-bar.encode
                // radius: 'count',
                radius: 'octave',
                // angle: 'fullNote',
                angle: 'name',
                //
                // radius: 3,
                // angle: 2,
                // // itemName: 'name',
                // itemName: 'fullNote',
                value: 'count',
                // // value: 'midi',
                // tooltip: 'midi'
            },
            // emphasis: {
            //     focus: 'series'
            // }
        },
        // {
        //     type: 'bar', 
        //     stack: 'all',
        //     coordinateSystem: 'polar',
        //     name: 'B',
        //     encode: {
        //         // https://echarts.apache.org/en/option.html#series-bar.encode
        //         // radius: 'count',
        //         // angle: 'octave',

        //         radius: 'octave',
        //         angle: 'name',
        //     }
        // },
        // {
        //     type: 'bar', 
        //     stack: 'all',
        //     coordinateSystem: 'polar',
        //     name: 'B',
        //     encode: {
        //         // itemName: 'name',
        //         itemName: 'fullNote',
        //         value: 'count',
        //         // value: 'midi',
        //         tooltip: 'midi'
        //     }
        // },
        // {
        //     type: 'bar', 
        //     stack: 'all',
        //     coordinateSystem: 'polar',
        //     name: 'C',
        //     encode: {
        //         // itemName: 'name',
        //         itemName: 'fullNote',
        //         value: 'count',
        //         // value: 'midi',
        //         tooltip: 'midi'
        //     }
        // }
    ]
};

graphCircleFifths.setOption(option);


// // //


let circleFifthsBarId = document.getElementById('circle-of-fifths-alt2');
const graphCircleFifthsBar = echarts.init(circleFifthsBarId, 'tech-blue');

// https://echarts.apache.org/en/tutorial.html#Data%20Transform
// https://echarts.apache.org/examples/en/editor.html?c=doc-example/data-transform-multiple-sort-bar

//   Symbol       Unicode entity
// ♭ Flat	       &#x266d;
// ♮ Natural      &#x266e;
// ♯ Sharp	       &#x266f;
// 𝄫 Double flat  &#x1D12B;

const barOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        },
    },
    legend: {
        data: ['Octave 0', 'Octave 1', 'Octave 2', 'Octave 3'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    yAxis: {
        type: 'value'
    },
    // xAxis: {
    xAxis: {
        type: 'category',
        data: ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F'],
        inverse: true,
    },
    series: [
        {
            name: 'Octave 0',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            data: [1, 3, 2, 4, 1, 3, 5, 2, 3, 2, 4, 1],
        },
        {
            name: 'Octave 1',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            data: [2, 1, 2, 3, 1, 2, 3, 5, 2, 1, 3, 2],
        },
        {
            name: 'Octave 2',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        },
        {
            name: 'Octave 3',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
    ]
};

graphCircleFifthsBar.setOption(barOption);