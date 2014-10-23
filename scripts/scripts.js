/** Start Google Chrome Canary with open -a Google\ Chrome\ Canary --args --enable-media-stream  OR enable the flag in about:flags **/

var App = {	

	drawToCanvas : function() {
		var video = App.video,
			ctx = App.ctx,
			canvas = App.canvas,
			i;

			ctx.drawImage(video, 0, 0, 520,426);

			App.pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
			var comp = ccv.detect_objects({ "canvas" : (App.canvas),
											"cascade" : cascade,
											"interval" : 5,
											"min_neighbors" : 1 });
			
//			ctx.strokeStyle='#00cc00';
//			ctx.lineWidth=2;
//			ctx.rect(0,0,200,100);
//			ctx.stroke();

			// Draw glasses on everyone!
			for (i = 0; i < comp.length; i++) {
//				ctx.strokeStyle='#00cc00';
//				ctx.lineWidth=2;
//				ctx.rect(comp[i].x,comp[i].y,comp[i].width,comp[i].height);
//				ctx.stroke();
				ctx.drawImage(App.glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
			}	
					
	},

	start : function() {
		if(App.playing) { clearInterval(App.playing); }
		App.playing = setInterval(function() {
			console.log("in start");
			App.drawToCanvas();
		},50);
		
	}
};

App.init = function() {
	// Prep the document
	App.video = document.querySelector('video');
	
	App.glasses = new Image();
	App.glasses.src = "i/rect.png";

	App.canvas = document.getElementById("output");
	App.ctx = this.canvas.getContext("2d");


	// Finally Check if we can run this puppy and go!
	if (navigator.getUserMedia) {
		navigator.getUserMedia('video', App.successCallback, App.errorCallback);
	}
};


document.addEventListener("DOMContentLoaded", function() {
	console.log('ready!');
	App.init();
}, false);


/*! Navigator Getusermedia - v0.1.0 - 3/9/2012
* https://github.com/rwldrn/navigator.getusermedia
* Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>; Licensed MIT */
(function(a,b){a.unprefix||(a.URL||(a.URL=a.webkitURL||a.msURL||a.oURL),b.getUserMedia||(b.getUserMedia=b.webkitGetUserMedia||b.mozGetUserMedia||b.msGetUserMedia));var c=!0,d=b.getUserMedia;try{b.getUserMedia({video:!0,audio:!0},function(){})}catch(e){c=!1}b.getUserMedia=function(e,f,g){var h,i,j=Object.keys(e),k={video:1,audio:1};if(!c)i=j.filter(function(a){return this[a]&&k[a]},e).join(",");else{i={};for(h in e)i[h]=e[h]&&k[h]}d.call(b,i,function(b){var c;b.label&&b.readyState===1&&(c=a.URL.createObjectURL(b)),f(b,c)},g||function(){})}})(typeof window=="object"&&window||this,this.navigator||{})