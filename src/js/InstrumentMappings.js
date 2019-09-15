/*
 *** MAPPING METHODS ***
 */
/*jshint esversion: 6 */

//-----INIT INSTRUMENT MAPPING------//
//TODO: instrumentMapping obj should be part of getInstrumentMapping() so default params can be set for optional configs, ex: movement = 'physics'

export default class InstrumentMappings {

    constructor() {
        // super();
    }

    getInstrumentMappingTemplate(movement = 'physics') {
        //const instrumentMapping = {
        return {
            flameCenter: {
                type: 'animation',
                triggerOn: 2,
                timesTriggered: 0,
                originalPosition: { x: 0, y: 0, z: -5 }
            },
            //TODO: originalPosition and offsetMultiplier should have an effect on where ball (or other shapes) are dropped
            hiHatClosed: {
                ballDesc: 'H',
                color: '#ff0000', //red
                keyInput: '1',
                note: 'B', // N/A
                octave: 2, // N/A
                movement: movement, //default: 'physics', or 'static'
                type: 'drum',
                variation: 'hihat',
                originalPosition: { x: 0, y: 0, z: -3 }
            },
            hiHatOpen: {
                ballDesc: 'H+',
                color: '#990000', //dkred
                keyInput: '2',
                note: 'B',
                octave: 2,
                // movement: 'static',
                type: 'drum',
                variation: 'hihat-open',
                originalPosition: { x: 0, y: 0, z: -3 }
            },
            snarePrimary: {
                ballDesc: 'S',
                color: '#FFFF00', //yellow
                keyInput: '3',
                note: 'A',
                octave: 2,
                type: 'drum',
                variation: 'snare',
                originalPosition: { x: -3, y: 1.5, z: 1 }
                // originalPosition: { x: 0, y: 0, z: (globalStaffLineInitDrumZ + 5) }
            },
            kickPrimary: {
                // ballDesc: 'K', // beat-v1
                ballDesc: 'B',
                color: '#003366', //midnight blue
                keyInput: '4',
                note: 'C',
                octave: 2,
                type: 'drum',
                variation: 'kick',
                originalPosition: { x: 0, y: 0, z: 5 }
            },
            crashPrimary: {
                ballDesc: 'Cr',
                // color: '#FFA500', //orange
                color: '#8B008B', //darkmagenta
                keyInput: '5',
                note: 'C',
                octave: 2,
                type: 'drum',
                variation: 'crash', //aka clap
                originalPosition: { x: 0, y: 0, z: -4 }
            },
            ridePrimary: {
                ballDesc: 'R',
                color: '#FFD700', //gold
                // color: '#800080', //purple
                keyInput: '6',
                note: 'C',
                octave: 2,
                type: 'drum',
                variation: 'ride',
                originalPosition: { x: 0, y: 0, z: -2 }
            },
            tomHigh: {
                ballDesc: 'T',
                // color: '#800080', //purple
                color: '#006400', //dkgreen
                keyInput: '7',
                note: 'C',
                octave: 2,
                type: 'drum',
                variation: 'tom-high',
                originalPosition: { x: 0, y: 0, z: 0 }
            },
            sphereChordG1: {
                ballDesc: 'G',
                color: '#4B0AA1', //V - dkblue
                keyInput: '\\',
                note: 'G',
                chord: ['G1', 'B1', 'D1'],
                octave: 1,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 15 }
            },
            sphereChordA: {
                ballDesc: 'A',
                color: '#C6018B', //VI - pink (or: #BB0181)
                keyInput: 'Z',
                note: 'A',
                chord: ['A1', 'C2', 'E2'],
                // chord: ['A2', 'C3', 'E3'], // a minor 
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 14 } //low
            },
            sphereChordB: {
                ballDesc: 'B',
                color: '#FF872B', //VII - orange
                keyInput: 'X',
                note: 'B',
                chord: ['B1', 'D2', 'F2'],
                // chord: ['B2', 'D3', 'F3'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 13 } //low
            },
            sphereChordC: {
                ballDesc: 'C',
                color: '#0018F9', //I - blue
                keyInput: 'C',
                note: 'C',
                chord: ['C2', 'E2', 'A2'],
                octave: 3,
                type: 'chord',
                // originalPosition: { x: 0, y: 0, z: 5 }
                originalPosition: { x: 0, y: 0, z: 12 } //low
            },
            sphereChordD: {
                ballDesc: 'D',
                color: '#680896', //II - purple
                keyInput: 'V',
                note: 'D',
                chord: ['D2', 'F2', 'A2'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 11 }
            },
            sphereChordE: {
                ballDesc: 'E',
                color: '#FF001F', //III - redorange
                keyInput: 'B',
                note: 'E',
                chord: ['E2', 'G2', 'B2'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 10 }
            },
            sphereChordF: {
                ballDesc: 'F',
                color: '#006CFA', //IV - medblue
                keyInput: 'N',
                note: 'F',
                chord: ['F2', 'A2', 'C3'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 9 }
                // originalPosition: { x: 0, y: 0, z: 2 } //high
            },
            sphereChordG: {
                ballDesc: 'G',
                color: '#4B0AA1', //V - dkblue
                keyInput: 'M',
                note: 'G',
                chord: ['G2', 'B2', 'D3'],
                octave: 3,
                type: 'chord',
                // originalPosition: { x: 0, y: 0, z: 1 } //high G
                originalPosition: { x: 0, y: 0, z: 8 } //low G
            },
            sphereChordA3: {
                ballDesc: 'A',
                color: '#C6018B', //VI - pink
                keyInput: 'G',
                note: 'D',
                chord: ['A2', 'C3', 'E3'],
                // chord: ['A3', 'C4', 'E4'], // a minor 
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 7 }
            },
            sphereChordB3: {
                ballDesc: 'B',
                color: '#FF872B', //VII - orange
                keyInput: 'H',
                note: 'D',
                chord: ['B2', 'D3', 'F3'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 6 }
            },
            sphereChordC3: {
                ballDesc: 'C',
                color: '#0018F9', //I - blue
                keyInput: 'J',
                note: 'D',
                chord: ['D3', 'F3', 'A3'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 5 }
            },
            sphereChordD3: {
                ballDesc: 'D',
                color: '#680896', //II - purple
                keyInput: 'K',
                note: 'D',
                chord: ['D3', 'F3', 'A3'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 4 }
            },
            sphereChordE3: {
                ballDesc: 'E',
                color: '#FF001F', //III - redorange
                keyInput: 'L',
                note: 'E',
                chord: ['E3', 'G3', 'B3'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 3 }
            },
            sphereChordF3: {
                ballDesc: 'F',
                color: '#006CFA', //IV - medblue
                keyInput: '[',
                note: 'F',
                chord: ['F3', 'A3', 'C4'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 2 }
            },
            sphereChordG3: {
                ballDesc: 'G',
                color: '#4B0AA1', //V - dkblue
                keyInput: ']',
                note: 'G',
                chord: ['G3', 'B3', 'D4'],
                octave: 3,
                type: 'chord',
                originalPosition: { x: 0, y: 0, z: 1 }
            },
            sphereA3: {
                ballDesc: 'A',
                color: '#C6018B', //VI - pink (or: #BB0181)
                keyInput: 'k',
                note: 'A',
                octave: 2,
                originalPosition: { x: 0, y: 0, z: 14 }
            },
            sphereB3: {
                ballDesc: 'B',
                color: '#FF872B', //VII - orange
                keyInput: 'k',
                note: 'B',
                octave: 2,
                originalPosition: { x: 0, y: 0, z: 13 }
            },
            sphereC3: {
                ballDesc: 'C',
                color: '#0018F9', //I - blue
                keyInput: 't',
                note: 'C',
                octave: 3,
                originalPosition: { x: 0, y: 0, z: 12 }
            },
            sphereD3: {
                ballDesc: 'D',
                color: '#680896', //II - purple
                keyInput: 'y',
                note: 'D',
                octave: 3,
                originalPosition: { x: 0, y: 0, z: 11 }
            },
            sphereE3: {
                ballDesc: 'E',
                color: '#FF001F', //III - redorange
                keyInput: 'u',
                note: 'E',
                octave: 3,
                originalPosition: { x: 0, y: 0, z: 10 }
            },
            sphereF3: {
                // ballDesc: 'F3', //TODO: do not use ballDesc for note map since there can be duplicates
                ballDesc: 'F', //TODO: do not use ballDesc for note map since there can be duplicates
                color: '#006CFA', //IV - medblue
                // color: '#7AD630', //green
                keyInput: 'i',
                note: 'F',
                octave: 3,
                originalPosition: { x: 0, y: 0, z: 9 }
            },
            sphereG3: {
                // ballDesc: 'G3',
                ballDesc: 'G',
                color: '#4B0AA1', //V - dkblue (or: #5B0898)
                // color: '#00FFE9', //blue
                keyInput: 'o',
                note: 'G',
                octave: 3,
                originalPosition: { x: 0, y: 0, z: 8 }
            },
            sphereA: {
                ballDesc: 'A',
                color: '#C6018B', //VI - pink (or: #BB0181)
                // color: '#3018F9', //indigo
                keyInput: 'z',
                note: 'A',
                octave: 3,
                movement: movement, //default: 'physics'
                originalPosition: { x: 0, y: 0, z: 7 }
            },
            sphereB: {
                ballDesc: 'B',
                color: '#FF872B', //VII - orange
                keyInput: 'x',
                note: 'B',
                octave: 3,
                originalPosition: { x: 0, y: 0, z: 6 }
            },
            sphereC: {
                ballDesc: 'C',
                color: '#0018F9', //I - blue
                // color: '#FF001F', //red
                keyInput: 'c',
                note: 'C',
                octave: 4,
                originalPosition: { x: 0, y: 0, z: 5 }
            },
            sphereD: {
                ballDesc: 'D',
                color: '#680896', //II - purple
                // color: '#E17A24', //orange
                keyInput: 'v',
                note: 'D',
                octave: 4,
                originalPosition: { x: 0, y: 0, z: 4 }
            },
            sphereE: {
                ballDesc: 'E',
                color: '#FF001F', //III
                // color: '#E17A24', //yellow
                keyInput: 'b',
                note: 'E',
                // octave: 5,
                octave: 4,
                originalPosition: { x: 0, y: 0, z: 3 }
            },
            sphereF: {
                ballDesc: 'F',
                color: '#006CFA', //IV - medblue
                // color: '#7AD630', //green
                keyInput: 'n',
                note: 'F',
                octave: 4,
                originalPosition: { x: 0, y: 0, z: 2 }
            },
            sphereG: {
                ballDesc: 'G',
                color: '#4B0AA1', //V - dkblue (or: #5B0898)
                // color: '#00FFE9', //blue
                keyInput: 'm',
                note: 'G',
                octave: 4,
                originalPosition: { x: 0, y: 0, z: 1 }
            },
            //TODO: remove ball<letter> mappings below
            // ballA: {
            //     ballDesc: 'A',
            //     color: '#3018F9', //indigo
            //     keyInput: 'q',
            //     note: 'A',
            //     octave: 3,
            //     movement: 'static', //default = 'physics'
            //     type: 'sphere', //TODO: make sphere vs cube type configurable
            //     variation: 'striped',
            //     // originalPosition: { x: -3, y: 1.5, z: 0 }, //top row: z=-2.5, y=3
            //     // offsetMultiplier: { x: 12, y: 1, z: 1 },
            //     // assetPath: `${this.assetsPath}images/carparts000${i}.png`,
            //     // hidden: false, //config can be saved but inactive
            // },
            // ballB: {
            //     ballDesc: 'B',
            //     color: '#FF0FF9', //violet
            //     keyInput: 'w',
            //     note: 'B',
            //     octave: 3,
            //     movement: 'static',
            //     type: 'sphere',
            //     variation: 'striped',
            // },
            // ballC: {
            //     ballDesc: 'C',
            //     color: '#FF001F', //red
            //     keyInput: 'e',
            //     note: 'C',
            //     octave: 4,
            //     movement: 'static',
            //     type: 'sphere',
            //     variation: 'striped',
            // },
            // ballD: {
            //     ballDesc: 'D',
            //     color: '#E17A24', //orange
            //     keyInput: 'r',
            //     note: 'D',
            //     octave: 4,
            //     movement: 'static',
            //     type: 'sphere',
            //     variation: 'striped',
            // },
            // ballE: {
            //     ballDesc: 'E',
            //     color: '#E17A24', //yellow
            //     keyInput: 't',
            //     note: 'E',
            //     octave: 4,
            //     movement: 'static',
            //     type: 'sphere',
            //     variation: 'striped',
            // },
            // ballF: {
            //     ballDesc: 'F',
            //     color: '#7AD630', //green
            //     keyInput: 'y',
            //     note: 'F',
            //     octave: 4,
            //     movement: 'static',
            //     type: 'sphere',
            //     variation: 'striped',
            // },
            // ballG: {
            //     ballDesc: 'G',
            //     color: '#00FFE9', //blue
            //     keyInput: 'u',
            //     note: 'G',
            //     octave: 4,
            //     movement: 'static',
            //     type: 'sphere',
            //     variation: 'striped',
            // },
        };
    }
    
    getInstrumentMapping(index, obj) {
        // return (obj.userData.opts.moveControl ? false : true);
        // return (value * this.notationConstants[providedUnits].digits);
        const instrumentMapping = this.getInstrumentMappingTemplate();
        return instrumentMapping[obj] ? instrumentMapping[obj] : globalLetterNumArr[index];
    }
    
    getKeyboardMapping(input) {
        const instrumentMapping = this.getInstrumentMappingTemplate();
        for (var key in instrumentMapping) {
            if (instrumentMapping.hasOwnProperty(key)) {
                if (input === instrumentMapping[key].keyInput) {
                    const instrumentMappedObj = instrumentMapping[key];
                    instrumentMappedObj.objName = key;
                    return instrumentMappedObj;
                }
            }
        }
    }
    
    getNoteMapping(obj) {
        const instrumentMapping = this.getInstrumentMappingTemplate();
        for (var key in instrumentMapping) {
            if (instrumentMapping.hasOwnProperty(key)) {
                // if (obj.userData.opts.ballDesc === instrumentMapping[key].ballDesc) { //keyInput is preferable to ballDesc since there should not be duplicates 
                if (obj.userData.opts.keyInput === instrumentMapping[key].keyInput) {
                    //TODO: are both getNoteMapping and getKeyboardMapping needed?
                    const instrumentMappedObj = instrumentMapping[key];
                    return instrumentMappedObj;
                }
    
            }
        }
    }

    getInstrByNote(inputNote = 'C4') {
        const instrumentMapping = this.getInstrumentMappingTemplate();
        for (var key in instrumentMapping) {
            if (instrumentMapping.hasOwnProperty(key)) {

                // const instrNote = obj.userData.opts.note + obj.userData.opts.octave;
                const instrNote = inputNote;
                // console.log({instrNote});
                const currNote = instrumentMapping[key].note + instrumentMapping[key].octave;
                // console.log({currNote});
                
                // if (instrNote === inputNote) {
                if (instrNote === currNote) {
                    //TODO: are both getNoteMapping and getKeyboardMapping needed?
                    const instrumentMappedObj = instrumentMapping[key];
                    // console.log({instrumentMappedObj});
                    return instrumentMappedObj;
                }
    
            }
        }
    }
}

