/*
 *** ECHARTS CIRCLE OF FIFTHS - PIE *** 
 // http://localhost:8082/circle-of-fifths.html
*/

// import Recording from '../assets/recording/1.js'; // c major scale
// import Recording from '../assets/recording/1_beethoven.js'; 
// import Recording from '../assets/recording/1_c7-g7_chords.js'; 
import Recording from '../assets/recording/1_hmesh.js'; 

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

// // // 
// https://echarts.apache.org/examples/en/editor.html?c=bar-race
// https://echarts.apache.org/examples/en/editor.html?c=bar-race-country
function updateCircleData(noteData, time) {
    // console.log('updateCircleData -> noteData: ', noteData);
    // console.log('updateCircleData -> time: ', time);
    const newOption = majorOption;

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
            // console.log('newOption.series[noteData.octave].data[index]: ', newOption.series[noteData.octave].data[index]);
            newOption.series[noteData.octave].data[index].itemStyle.color = noteActiveColor;

            setTimeout(() => {
                newOption.series[noteData.octave].data[index].itemStyle.color = noteInactiveColor;
            }, millisecondsNoteDuration);
            // }, 250);
        }
    });

    // TODO: use time to set newOption.series[noteData.octave].data[index].itemStyle.color back to noteInactiveColor

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

/*
function updateChordDisplay() {
    if (Store.dashboard.allPlayedNotes.length % 4 === 0) {
        // console.log(Tonal);
        // Tonal.ChordDetect.detect(Store.dashboard.allPlayedNotes);

        // console.log(Chord);
        const currentChord = Chord.detect(Store.dashboard.allPlayedNotes);
        console.log({currentChord});

        if (currentChord.length) {
            const currentChordNoRoot = currentChord[0].slice(0, currentChord[0].length - 2);
            // console.log(currentChordNoRoot);

            const currentChordSplit = currentChord[0].split('/');
            // console.log({currentChordSplit});

            // const currentChordInfo = Chord.get(currentChordNoRoot);
            const currentChordInfo = Chord.get(currentChordSplit[0]);
            const currentChordDisplayName = currentChordInfo.name;
            console.log(currentChordDisplayName);
            
            if (currentChordDisplayName) {
                Store.dashboard.currentChordDisplayName = currentChordDisplayName;
                Store.dashboard.currentChordInfo = currentChordInfo;

                Store.dashboard.allPlayedNotes = Store.dashboard.allPlayedNotes.slice(4);

                Store.dashboard.chordsPlayed.push(currentChordInfo);
            }
        }

        // console.log(Chord.getChord(currentChord[0]));
        // console.log(Chord.getChord("maj7", "G4", "B4"));

        // https://github.com/tonaljs/tonal/tree/master/packages/chord
        // ...
        // Chord.getChord("maj7", "G4", "B4"); // =>
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

        // Chord.reduced("Cmaj7"); // => ["C5", "CM"]

    }
}

*/