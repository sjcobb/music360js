# TODO

## Chord Detector
- [ ] Giant rectangle cube following balls that tells you name of chord - G7 Dominant
- [ ] Use tonal lib: Chord.detect(["D", "F#", "A", "C"]); // => ["D7"]
- [ ] Chord.name for display name, .symbol for shortname
- [ ] Push notes into nextNotesArr while length less than or equal to 4 call Chord.detect, if - no chord returned drop single ball, if True, then drop Rect with note names
- [ ] Only push notes, when played quickly ticks
- [ ] Call from addBody with setTimeout for balls so there is time to calc chord

## XR - Augmented Piano Portal

- [ ] use frame animation from earthquake branch to overlay on wall in AR mode
- [ ] balls should shoot out of portal after wall bursts open
- [ ] move camera around (handheld) to show tracked scene with balls falling on piano keys
- [ ] ...
