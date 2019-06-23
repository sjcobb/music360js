import globals from './globals.js';

/*
 *** AUDIO ***
 */

export default class Audio {
    
    constructor() {

    }

    /*
    //-----TONE------//

    Tone.Transport.bpm.value = 200;
    // Tone.Transport.bpm.rampTo(120, 10);
    Tone.Transport.timeSignature = 12; // https://tonejs.github.io/docs/r13/Transport#timesignature
    Tone.Transport.setLoopPoints(0, "13m"); //starts over at beginning
    Tone.Transport.loop = true; //TODO: *** clear all addBody objects if Transport loop true

    //-----INSTRUMENT ASSETS------//

    var polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster();
    polySynth.volume.value = -4;
    polySynth.set("detune", +1200); // octave = 12 semitones of 100 cents each

    const bounceSynth = new Tone.Synth();
    bounceSynth.volume.value = 2;
    bounceSynth.toMaster();

    var toneSnare = new Tone.NoiseSynth({
        "volume": -5.0,
        "envelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0
        },
        "filterEnvelope": {
            "attack": 0.001,
            "decay": 0.1,
            "sustain": 0
        }
    }).toMaster();

    // const player808HiHat = new Tone.Player(`${sampleBaseUrl}/808-hihat-vh.mp3`).toMaster();
    const playerHiHatOpen = new Tone.Player("assets/sounds/drum-kits/dubstep/hihat-open.mp3").toMaster();
    const playerHiHat = new Tone.Player("assets/sounds/drum-kits/dubstep/hihat-closed.mp3").toMaster();
    // playerHiHat.volume.value = 1.5;

    // const playerKick = new Tone.Player("assets/sounds/drum-kits/analog/kick.mp3").toMaster(); //aka dubstep - 808?
    // const playerKick = new Tone.Player("assets/sounds/drum-kits/dubstep/kick.mp3").toMaster(); //aka analog - PREV
    // const playerKick = new Tone.Player("assets/sounds/drum-kits/electronic/kick.mp3").toMaster(); //guitar pluck
    // const playerKick = new Tone.Player("assets/sounds/drum-kits/hiphop/kick.mp3").toMaster(); //boring
    // const playerKick = new Tone.Player("assets/sounds/drum-kits/percussion/kick.mp3").toMaster(); //normal
    // const playerKick = new Tone.Player("assets/sounds/drum-kits/808/808-kick-vh.mp3").toMaster(); // high
    // const playerKick = new Tone.Player("assets/sounds/drum-kits/808/808-kick-vm.mp3").toMaster(); // medium
    const playerKick = new Tone.Player("assets/sounds/drum-kits/808/808-kick-vl.mp3").toMaster(); // low

    const playerCrash = new Tone.Player("assets/sounds/drum-kits/hiphop/clap.mp3").toMaster(); //hand clap echo
    // const playerCrash = new Tone.Player("assets/sounds/drum-kits/percussion/clap.mp3").toMaster(); //stick click

    // const playerRide = new Tone.Player("assets/sounds/drum-kits/dubstep/ride.wav").toMaster(); //drum stick click
    const playerRide = new Tone.Player("assets/sounds/drum-kits/hiphop/ride.mp3").toMaster(); //cool click pop
    // const playerRide = new Tone.Player("assets/sounds/drum-kits/electronic/ride.mp3").toMaster(); //high tick metal
    // const playerRide = new Tone.Player("assets/sounds/drum-kits/percussion/ride.mp3").toMaster(); //weird low squeak 
    // const playerRide = new Tone.Player("assets/sounds/drum-kits/analog/ride.mp3").toMaster(); // drum stick click

    const playerTomHigh = new Tone.Player("assets/sounds/drum-kits/electronic/tom-high.mp3").toMaster();
    const playerTomMid = new Tone.Player("assets/sounds/drum-kits/electronic/tom-mid.mp3").toMaster();
    const playerTomLow = new Tone.Player("assets/sounds/drum-kits/electronic/tom-low.mp3").toMaster();


    //-----INSTRUMENT PARTS------//
    var allDrumsPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, [
        ["0:0:0", globals.instr.kickPrimary],
        ["0:6:0", globals.instr.kickPrimary],
        ["0:7:0", globals.instr.kickPrimary],

        ["0:10:0", globals.instr.snarePrimary],

        ["0:4:0", globals.instr.crashPrimary],

        ["0:4:0", globals.instr.tomHigh],
    ]);
    allDrumsPart.loop = true;
    // allDrumsPart.start("0:0:0");
    allDrumsPart.start("2:0:0");

    var secondVerseDrumsPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, [
        ["0:0:0", globals.instr.ridePrimary],
        ["0:2:0", globals.instr.ridePrimary],
        ["0:4:0", globals.instr.ridePrimary],
        ["0:6:0", globals.instr.ridePrimary],
    ]);
    secondVerseDrumsPart.loop = 4;
    secondVerseDrumsPart.start("7:0:0");

    var introPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, [
        ["0:0:0", globals.instr.hiHatClosed],
        ["0:2:0", globals.instr.hiHatClosed],
        ["0:2:3", globals.instr.hiHatClosed],
        ["0:2:6", globals.instr.hiHatClosed],
        ["0:2:9", globals.instr.hiHatClosed],

        ["0:6:0", globals.instr.hiHatClosed],
        ["0:6:3", globals.instr.hiHatClosed],
        ["0:6:6", globals.instr.hiHatClosed],
        ["0:6:9", globals.instr.hiHatClosed],
        ["0:10:0", globals.instr.hiHatOpen],
    ]);
    introPart.loop = 6;
    introPart.start("0:0:0");

    var groovePart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, [
        ["0:0:0", globals.instr.hiHatClosed],
        ["0:2:0", globals.instr.hiHatClosed],
        ["0:3:0", globals.instr.hiHatClosed],
        ["0:4:0", globals.instr.hiHatOpen],

        ["0:8:0", globals.instr.snarePrimary],

        ["0:6:0", globals.instr.kickPrimary],
    ]);
    groovePart.loop = 2;
    // groovePart.start("0:0:0");

    //-----KEYBOARED PARTS------//

    var introPianoPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, [
        ["0:0:0", globals.instr.sphereChordC],
        ["0:4:0", globals.instr.sphereChordF],
        ["0:8:0", globals.instr.sphereChordG],
        ["0:9:0", globals.instr.sphereChordG],
    ]);
    introPianoPart.loop = 2;
    // introPianoPart.start("6:0:0");

    const boleroFireChords = [
        ["0:0:0", globals.instr.sphereChordF],
        ["0:1:0", globals.instr.sphereChordD],
        ["0:3:0", globals.instr.sphereChordF],
        ["0:4:0", globals.instr.sphereChordD],
        ["0:6:0", globals.instr.sphereChordA3],
        ["0:7:0", globals.instr.sphereChordF],
        ["0:9:0", globals.instr.sphereChordA3],
        ["0:10:0", globals.instr.sphereChordF],
    ];

    const pianoChordsFirstPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
        // addFire(globalTicks); //old
        // flameFirst.addFire(globalTicks);
        // flameActive = false;
    }, boleroFireChords);

    const pianoChordsSecondPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, boleroFireChords);

    pianoChordsFirstPart.loop = 2;
    // pianoChordsFirstPart.start("1:0:0");
    // pianoChordsFirstPart.start("4:0:0");
    pianoChordsFirstPart.start(globals.triggerAnimationTime);

    pianoChordsSecondPart.loop = 2;
    // pianoChordsSecondPart.start("6:0:0");
    pianoChordsSecondPart.start("9:0:0");

    var pianoChordsFinalPart = new Tone.Part(function(time, instr) {
        addBody(true, time * globalMultiplierPosX, instr);
    }, [
        ["0:0:0", globals.instr.sphereChordE],
        ["0:2:0", globals.instr.sphereChordG],
        ["0:4:0", globals.instr.sphereChordA3],
        ["0:5:0", globals.instr.sphereChordA3],
        ["0:6:0", globals.instr.sphereChordB3],
    ]);
    pianoChordsFinalPart.loop = 2;
    // pianoChordsFinalPart.start("0:0:0");
    pianoChordsFinalPart.start("6:0:0"); //PREV
    // pianoChordsFinalPart.start("7:0:0");

    // //
    // introPianoPart.add("4m", instrMappedC); //did not hear
    // introPianoPart.add("1m", "C#+11");

    */
}