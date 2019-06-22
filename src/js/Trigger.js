import globals from './globals.js';

export default class Trigger {
    constructor() {
        // super();
    }
    
    triggerNote(obj) {
        globalMusicActive = true; //remove?

        let triggerObj = getNoteMapping(obj);
        let combinedNote = triggerObj.note + triggerObj.octave;

        drumIndex = 0;

        // TODO: is if else performance causing sound bug?
        if (triggerObj.type === 'drum') {
            if (triggerObj.variation === 'hihat') {
                playerHiHat.start();
            } else if (triggerObj.variation === 'hihat-open') {
                playerHiHatOpen.start();
            } else if (triggerObj.variation === 'snare') {
                toneSnare.triggerAttackRelease();
            } else if (triggerObj.variation === 'kick') {
                playerKick.start();
                // toneKick.triggerAttackRelease("C2"); //deep
            } else if (triggerObj.variation === 'crash') {
                playerCrash.start();
                // toneCrash.triggerAttackRelease("C4"); //laser
            } else if (triggerObj.variation === 'ride') {
                playerRide.start();
            } else if (triggerObj.variation === 'tom-high') {
                playerTomHigh.start();
                // flameFirst.addFire(globals.ticks);
            } else {
                console.log('UNDEF variation - triggerNote() -> triggerObj (drum): ', triggerObj);
                playerHiHat.start();
            }
            drumIndex++;
        } else if (triggerObj.type === 'chord') {
            // console.log('triggerObj -> chord: ', triggerObj.chord);
            polySynth.triggerAttackRelease(triggerObj.chord, '4n');
        } else {
            bounceSynth.triggerAttackRelease(combinedNote, "8n");
            // console.log('triggerNote -> ballDesc: ', triggerObj.ballDesc, ', note: ', combinedNote);
        }

        globalMusicActive = false; //remove?

        if (globalConfigColorAnimate === true && triggerObj.color) {
            if (triggerObj.type !== 'drum') {
                globalActiveInstrColor = triggerObj.color;
            }
        }

        // switch (obj.userData.opts.ballDesc) {
        //     case ('A'):
        //         bounceSynth.triggerAttackRelease("A3", "8n");
        //         console.log('triggerNote -> poolBalls.ballA');
        //         break;
        //     default:
        //         // debugger;
        //         bounceSynth.toMaster();
        //         bounceSynth.triggerAttackRelease("A2", "8n");
        //         console.log('default case');
        // }
        // //bounceSynth.triggerRelease();
        // //Tone.Transport.stop();

    }

}