
$(".visualizeJs").css({
	"border":"2px solid black"
}).each(function () {	
	$(this).append("<audio src='" + $(this).attr("src") + "' controls></audio>");
	parent = $(this);
	audio = $(this).find("audio").css({
		"width":"100%"
	});
	
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
		player = audio[0],
		audioSrc = audioCtx.createMediaElementSource(player),
		analyser = audioCtx.createAnalyser();
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);

	var pianoArrayLength = 30,
		pianoArray = new Uint8Array(pianoArrayLength),
		colorArray = new Uint8Array(3);	

	for (var i = 0; i < pianoArrayLength; i++) {
		parent.append("<div class='pianoTile'></div>");
	}

	pianoTile = $(".pianoTile").css({
		"width": parent.width()/pianoArrayLength - 2,
		"background": "black",
		"float": "left",
		"border": "1px solid white"
	});

	function draw() {
		analyser.getByteFrequencyData(colorArray);
		analyser.getByteFrequencyData(pianoArray);
		
		pianoTile.each(function(index) {
			$(this).css("height", pianoArray[index] + 1);
		}); 

		parent.css("background", "rgb(" + colorArray.join(",") + ")");
	}

	setInterval(draw, 1000/30);
});