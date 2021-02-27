// import InstrumentMappings from './InstrumentMappings.js';
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

export default {
    dashboardData: {
        chart: {},
        chordsPlayed: [],
        // lastNote: 'C4',
        lastNote: '',
        lastNoteLength: 0,
        // playedNotes: ['C4', 'D4', 'C5'],
        allPlayedNotes: [],
        allPlayedOctaves: [],
        recentPlayedNotes: [],
        noteCountsObj: {
            // TODO: final data structure chosen for bar3D, clean up others
            A3: {note: "A", octave: 3, count: 0},
            A4: {note: "A", octave: 4, count: 0},
            A5: {note: "A", octave: 5, count: 0},
            A6: {note: "A", octave: 6, count: 0},
            C6: {note: "C", octave: 6, count: 0},
        },
        noteCountsArr: [
            // {note: 'C', octave: 6, count: 0},
        ],
        instrData: [],
        // https://echarts.apache.org/en/option.html#dataset.source
        dataset: {
            source: [
                ['Note', '0:0:0', '1:0:0', '2:0:0', '3:0:0'],
                ['C4', 1, 0, 0, 1],
                ['D4', 0, 1, 1, 1],
            ]
        },
        midiConvertData: {
            source: [
                {
                    "duration": 0.6,
                    "durationTicks": 960,
                    "midi": 60,
                    "name": "C4",
                    "ticks": 0,
                    "time": 0,
                    "velocity": 0.5433070866141733
                },
                {
                    "duration": 1.2,
                    "durationTicks": 1920,
                    "midi": 48,
                    "name": "C3",
                    "ticks": 0,
                    "time": 0,
                    "velocity": 0.5118110236220472
                },
                {
                    "duration": 0.6,
                    "durationTicks": 960,
                    "midi": 60,
                    "name": "C4",
                    "ticks": 960,
                    "time": 0.6,
                    "velocity": 0.5984251968503937
                },
            ]
        }
    },
    // TODO: rename SceneConfig, SceneData, etc.
    view: {
        // activeInstrColor: '#343434', // gray
        activeInstrColor: '#000000',
        // ai: {
        //     enabled: false,
        // },
        autoScroll: true,
        autoStartTime: 0,
        bpm: 120,
        drumCircle: true,
        cameraPositionBehind: true,
        cameraAutoStart: true,
        posBehindX: -95, 
        posBehindY: 4,
        posBehindZ: 0,
        skybox: false,
        songAutoStart: true,
        showDashboard: true,
        showLogoSprite: false,
        showStats: true,
        // showStaff: {
        //     bass: true,
        //     treble: true,
        // },
        // stage: {
        //     size: 'lg',
        // },
    }
};
