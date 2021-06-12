// https://pianolit.com/tools/circle-of-fifths
(function() {
  let $labels = $('#mode-panels'),
  	  $circle = $('#circle'),
	  $letters = $('g#letters > g'),
	  $mode = $('input[name="mode"]'),
	  $next,
      enabled = true,
      rotation = 0;

  init = function() {

  	showDescription();

    $('#wheel-controls button').on('click', function() {
		let $button = $(this);
		$button.siblings('div').find('div').fadeOut();
    	if (enabled) {
    		disable();
	    	let direction = $button.attr('direction') == 'left' ? -30 : 30;
	    	rotation += direction;
	    	applyCss(rotation);
	    	hideLabels();
		    highlightKey($button.attr('direction'));
		}
    });
  };

  highlightKeyboard = function() {
  	let mode = $('.mode-tabs .active').attr('data-name');
  	let $keysArray = $('.keyboard-key');
  	let scale = JSON.parse($('g.key').attr('key-'+mode+'-scale'));
  	let count = 1;
  	let index;

  	$('.keyboard .dot').hide();
  	
  	$keysArray.each(function() {
  		let $key = $(this);
  		let keyNames = JSON.parse($key.attr('data-names'));

  		if (keyNames.includes(scale[0])) {
  			index = $('.keyboard-key').index(this);
  			return false;
  		}
  	});

  	$keysArray.splice(0, index);

  	$keysArray.each(function() {
  		let $key = $(this);
  		let keyNames = JSON.parse($key.attr('data-names'));

  		if (count > 12)
  			return false;

  		let found = scale.filter(function(n) {
  			return keyNames.indexOf(n) !== -1;
  		});

  		if (found.length)
  			$key.find(' > .dot').fadeIn();

		count++;
  	});
  }

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		highlightKeyboard();
	});

  applyCss = function(degrees) {
    $circle.css({
    	'-webkit-transform': "rotate(" + degrees + "deg)",
    	'-moz-transform': "rotate(" + degrees + "deg)",
    	'-ms-transform': "rotate(" + degrees + "deg)",
    	'-o-transform': "rotate(" + degrees + "deg)",
    	'transform': "rotate(" + degrees + "deg)"
    });
  }

  disable = function() {
    enabled = false;
  };

  enable = function() {
    enabled = true;
  };

  hideLabels = function() {
  	$labels.css('opacity', 0);
  };

  highlightKey = function(direction) {
  	$next = $($('g.key').first().attr('control-'+direction));

  	$('g').removeClass('key');
    setTimeout( function() {
    	$next.addClass('key');
    	showDescription();
		highlightKeyboard();
	  	enable();
    }, 400);
  };

  showDescription = function() {
  	let $key = $('g.key');
  	let $majorSignature = $('#mode-major .key-signature');
  	let $minorSignature = $('#mode-minor .key-signature');
  	let $enharmonicSignature = $('#mode-enharmonic .key-signature');

  	let id = $key.attr('id');
  	let enharmonicId = $key.attr('enharmonic-id');
  	let neighbors = JSON.parse($key.attr('key-neighbors'));
  	let enharmonicNeighbors = JSON.parse($key.attr('key-enharmonic-neighbors'));

  	let majorRoman = JSON.parse($key.attr('key-major-roman'));
  	let majorTonic = JSON.parse($key.attr('key-major-tonic'));
  	let majorDom = JSON.parse($key.attr('key-major-dominant'));
  	let majorSub = JSON.parse($key.attr('key-major-subdominant'));

  	let enharmonicRoman = JSON.parse($key.attr('key-enharmonic-roman'));
  	let enharmonicTonic = JSON.parse($key.attr('key-enharmonic-tonic'));
  	let enharmonicDom = JSON.parse($key.attr('key-enharmonic-dominant'));
  	let enharmonicSub = JSON.parse($key.attr('key-enharmonic-subdominant'));

  	let minorRoman = JSON.parse($key.attr('key-minor-roman'));
  	let minorTonic = JSON.parse($key.attr('key-minor-tonic'));
  	let minorDom = JSON.parse($key.attr('key-minor-dominant'));
  	let minorSub = JSON.parse($key.attr('key-minor-subdominant'));

  	$majorSignature.attr('src', $majorSignature.attr('data-folder') + '/key-loading.svg').attr('src', $majorSignature.attr('data-folder') + '/' + id + '.svg');
  	$minorSignature.attr('src', $minorSignature.attr('data-folder') + '/key-loading.svg').attr('src', $minorSignature.attr('data-folder') + '/' + id + '.svg');
  	$enharmonicSignature.attr('src', $enharmonicSignature.attr('data-folder') + '/key-loading.svg').attr('src', $enharmonicSignature.attr('data-folder') + '/' + enharmonicId + '.svg');

	$('#mode-major .key-name').text($key.attr('key-major'));
	$('#mode-major .key-relative').text($key.attr('key-minor'));

	$('#mode-minor .key-name').text($key.attr('key-minor'));
	$('#mode-minor .key-relative').text($key.attr('key-major'));

	$('#mode-enharmonic .key-name').text($key.attr('key-enharmonic-major'));
	$('#mode-enharmonic .key-relative').text($key.attr('key-enharmonic-minor'));

	$('.key-neighbors').html('');
	neighbors.forEach(function(neighbor) {
		$('.key-neighbors').append('<span><strong>'+neighbor+'</strong></span>');
	});

	$('.key-enharmonic-neighbors').html('');
	enharmonicNeighbors.forEach(function(neighbor) {
		$('.key-enharmonic-neighbors').append('<span><strong>'+neighbor+'</strong></span>');
	});

	//////////////////////////
	// ENHARMONIC FUNCTIONS //
	//////////////////////////
	$('#mode-enharmonic .key-tonic').html('');
	enharmonicTonic.forEach(function(tonic) {
		$('#mode-enharmonic .key-tonic').append('<div>'+tonic+'</div>');
	});

	$('#mode-enharmonic .key-dominant').html('');
	enharmonicDom.forEach(function(dominant) {
		$('#mode-enharmonic .key-dominant').append('<div>'+dominant+'</div>');
	});

	$('#mode-enharmonic .key-subdominant').html('');
	enharmonicSub.forEach(function(subdominant) {
		$('#mode-enharmonic .key-subdominant').append('<div>'+subdominant+'</div>');
	});

	$('.key-enharmonic-roman').html('');
	for (key in enharmonicRoman) {
		$('.key-enharmonic-roman').append(`
			<div class="mr-2 mb-2 bg-light px-2 py-1">
				<span class="roman-numeral">`+key+`</span> `+enharmonicRoman[key]+`</div>
			</div>`);
	}

	/////////////////////
	// MAJOR FUNCTIONS //
	/////////////////////
	$('#mode-major .key-tonic').html('');
	majorTonic.forEach(function(tonic) {
		$('#mode-major .key-tonic').append('<div>'+tonic+'</div>');
	});

	$('#mode-major .key-dominant').html('');
	majorDom.forEach(function(dominant) {
		$('#mode-major .key-dominant').append('<div>'+dominant+'</div>');
	});

	$('#mode-major .key-subdominant').html('');
	majorSub.forEach(function(subdominant) {
		$('#mode-major .key-subdominant').append('<div>'+subdominant+'</div>');
	});

	$('.key-major-roman').html('');
	for (key in majorRoman) {
		$('.key-major-roman').append(`
			<div class="mr-2 mb-2 bg-light px-2 py-1">
				<span class="roman-numeral">`+key+`</span> `+majorRoman[key]+`</div>
			</div>`);
	}
	/////////////////////
	// MINOR FUNCTIONS //
	/////////////////////
	$('#mode-minor .key-tonic').html('');
	minorTonic.forEach(function(tonic) {
		$('#mode-minor .key-tonic').append('<div>'+tonic+'</div>');
	});

	$('#mode-minor .key-dominant').html('');
	minorDom.forEach(function(dominant) {
		$('#mode-minor .key-dominant').append('<div>'+dominant+'</div>');
	});

	$('#mode-minor .key-subdominant').html('');
	minorSub.forEach(function(subdominant) {
		$('#mode-minor .key-subdominant').append('<div>'+subdominant+'</div>');
	});

	$('.key-minor-roman').html('');
	for (key in minorRoman) {
		$('.key-minor-roman').append(`
			<div class="mr-2 mb-2 bg-light px-2 py-1">
				<span class="roman-numeral">`+key+`</span> `+minorRoman[key]+`</div>
			</div>`);
	}

	$labels.css('opacity', 1);
  };

  init();

}).call(this);