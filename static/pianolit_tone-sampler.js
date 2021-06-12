// https://pianolit.com/tools/circle-of-fifths
var piano = new Tone.Sampler({
	"A0" : "A0.[mp3|ogg]",
	"C1" : "C1.[mp3|ogg]",
	"D#1" : "Ds1.[mp3|ogg]",
	"F#1" : "Fs1.[mp3|ogg]",
	"A1" : "A1.[mp3|ogg]",
	"C2" : "C2.[mp3|ogg]",
	"D#2" : "Ds2.[mp3|ogg]",
	"F#2" : "Fs2.[mp3|ogg]",
	"A2" : "A2.[mp3|ogg]",
	"C3" : "C3.[mp3|ogg]",
	"D#3" : "Ds3.[mp3|ogg]",
	"F#3" : "Fs3.[mp3|ogg]",
	"A3" : "A3.[mp3|ogg]",
	"C4" : "C4.[mp3|ogg]",
	"D#4" : "Ds4.[mp3|ogg]",
	"F#4" : "Fs4.[mp3|ogg]",
	"A4" : "A4.[mp3|ogg]",
	"C5" : "C5.[mp3|ogg]",
	"D#5" : "Ds5.[mp3|ogg]",
	"F#5" : "Fs5.[mp3|ogg]",
	"A5" : "A5.[mp3|ogg]",
	"C6" : "C6.[mp3|ogg]",
	"D#6" : "Ds6.[mp3|ogg]",
	"F#6" : "Fs6.[mp3|ogg]",
	"A6" : "A6.[mp3|ogg]",
	"C7" : "C7.[mp3|ogg]",
	"D#7" : "Ds7.[mp3|ogg]",
	"F#7" : "Fs7.[mp3|ogg]",
	"A7" : "A7.[mp3|ogg]",
	"C8" : "C8.[mp3|ogg]"
}, {
	"release" : 1,
	"baseUrl" : "https://tonejs.github.io/audio/salamander/"
}).toMaster();

var $keyDown;
var notPlaying = true; 

$(document).ready(function() {

$(document).on('mousedown touchstart', '.keyboard-key', function(e) {
	let $key = getKey(e);
	press($key, 300);
}).on('mouseup touchend', function(e) {
	let $key = getKey(e);
	release();
}).on('mousemove', function(e) {
	if ($keyDown) {
		let $key = getKey(e);
		if ($keyDown.get(0) != $key.get(0))
			release();
	}
});

highlight = function($key) {
	$key.find('> .dot').fadeIn('fast');
};

hideDots = function(delay = 0) {
	setTimeout(function() {
		$('.dot').fadeOut('fast');
	}, delay);
}

press = function($key, duration = null, strict = true, color = null) {
	if (! $keyDown || ! strict) {
		let note = $key.attr('data-name').toUpperCase();
		let octave = $key.attr('data-octave');

		play(note, octave, duration);

		if ($key.hasClass('keyboard-white-key')) {
			let bgcolor = color ? color : 'rgba(0,0,0,0.05)';
			$key.css('background', bgcolor).removeClass('shadow-sm');
		} else {
			$key.removeClass('bg-dark');
			if (color)
				$key.css('background', color);
		}

		if (duration && ! strict) {
			setTimeout(function() {
				release();
			}, duration);
		}
	}

	$keyDown = $key;
}

release = function() {
	$keyDown = null;
	$('.keyboard-white-key').css('background', 'transparent').addClass('shadow-sm');
	$('.keyboard-black-key').css('background', '#171a1c').addClass('bg-dark');
}

play = function(note, octave, duration) {
	if (notPlaying) {
		piano.triggerAttackRelease(note + octave, "8n");
		notPlaying = false;
		setTimeout(function() {
			notPlaying = true;
		}, duration);
	}
}

getKey = function(e) {
	let $key = $(e.target);

	if ($key.hasClass('dot'))
		$key = $key.parent();

	return $key;
}

findKey = function(note, startAt = null, container = 'body') {
    let result = null;
    let $keys = $(container).find('.keyboard-white-key');

    $keys.slice(startAt, $keys.length).each(function(key) {
    	let $whiteKey = $(this);
    	let $blackKey = $(this).find('.keyboard-black-key');

        let whiteNotes = JSON.parse($whiteKey.attr('data-names'));
        if (whiteNotes.includes(note)) {
            result = $whiteKey;
            return false;
        }

        if ($blackKey.length) {
	        let blackNotes = JSON.parse($blackKey.attr('data-names'));
	        if (blackNotes.includes(note)) {
	            result = $blackKey;
	            return false;
	        }
	    }
    });

    return result;
}
});