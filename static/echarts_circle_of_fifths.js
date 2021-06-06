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


// NOTES:
// - starting point: https://echarts.apache.org/examples/en/editor.html?c=pie-nest
// https://echarts.apache.org/en/option.html#series-pie.type
// https://echarts.apache.org/en/option.html#dataset.source
//   - Row based key-value format (object array), where the keys indicate dimension names.
// - https://echarts.apache.org/examples/en/editor.html?c=dataset-link

// https://github.com/tonaljs/tonal
// // import { Note, Interval, Scale } from "@tonaljs/tonal";
// import * as Tonal from "../node_modules/@tonaljs/tonal/browser/tonal.min.js";
// console.log(Tonal);

import Recording from '../assets/recording/1.js';
console.log({Recording});

console.log('Recording.tracks[0].notes: ', Recording.tracks[0].notes);
const toneMidiNotes = Recording.tracks[0].notes;

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

//
let circleFifthsId = document.getElementById('circle-of-fifths');
// var graphCircleFifths = echarts.init(circleFifthsId, 'vintage');
// var graphCircleFifths = echarts.init(circleFifthsId, 'dark-blue');
var graphCircleFifths = echarts.init(circleFifthsId, 'tech-blue');



const option = {
    dataset: {
        source: toneMidiNotes,
    },
    tooltip: {
        textStyle: {
            color: 'white',
        },
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // legend: {
    //     data: ['apple', 'grape', 'blueberry', 'raspberry', 'fig', 'lime', 'banana', 'watermelon', 'coconut', 'lemon']
    // },
    series: [
        {
            name: 'Major',
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
                length: 30,
            },
            label: {
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                // rich: {
                //     a: {
                //         color: '#6E7079',
                //         lineHeight: 22,
                //         align: 'center'
                //     },
                //     hr: {
                //         borderColor: '#8C8D8E',
                //         width: '100%',
                //         borderWidth: 1,
                //         height: 0
                //     },
                //     b: {
                //         color: '#4C5058',
                //         fontSize: 14,
                //         fontWeight: 'bold',
                //         lineHeight: 33
                //     },
                //     per: {
                //         color: '#fff',
                //         backgroundColor: '#4C5058',
                //         padding: [3, 4],
                //         borderRadius: 4
                //     }
                // }
            },
            encode: {
                itemName: 'name',
                value: 'midi',
                tooltip: 'midi'
                // itemName: 'product',
                // value: '2012',
                // tooltip: '2012'
            }
        },
        // {
        //     name: 'fruit',
        //     type: 'pie',
        //     selectedMode: 'single',
        //     radius: [0, '30%'],
        //     label: {
        //         position: 'inner',
        //         fontSize: 14,
        //     },
        //     labelLine: {
        //         show: false
        //     },
        //     data: [
        //         {value: 1548, name: 'blueberry'},
        //         {value: 775, name: 'cherry'},
        //         {value: 679, name: 'grape', selected: true}
        //     ]
        // },
        // {
        //     name: 'fruit',
        //     type: 'pie',
        //     radius: ['45%', '60%'],
        //     labelLine: {
        //         length: 30,
        //     },
        //     label: {
        //         formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        //         backgroundColor: '#F6F8FC',
        //         borderColor: '#8C8D8E',
        //         borderWidth: 1,
        //         borderRadius: 4,
                
        //         rich: {
        //             a: {
        //                 color: '#6E7079',
        //                 lineHeight: 22,
        //                 align: 'center'
        //             },
        //             hr: {
        //                 borderColor: '#8C8D8E',
        //                 width: '100%',
        //                 borderWidth: 1,
        //                 height: 0
        //             },
        //             b: {
        //                 color: '#4C5058',
        //                 fontSize: 14,
        //                 fontWeight: 'bold',
        //                 lineHeight: 33
        //             },
        //             per: {
        //                 color: '#fff',
        //                 backgroundColor: '#4C5058',
        //                 padding: [3, 4],
        //                 borderRadius: 4
        //             }
        //         }
        //     },
        //     data: [
        //         {value: 1048, name: 'banana'},
        //         {value: 335, name: 'apple'},
        //         {value: 310, name: 'raspberry'},
        //         {value: 251, name: 'watermelon'},
        //         {value: 234, name: 'fig'},
        //         {value: 147, name: 'coconut'},
        //         {value: 135, name: 'lime'},
        //         {value: 102, name: 'lemon'}
        //     ]
        // },
    ]
};

graphCircleFifths.setOption(option);
