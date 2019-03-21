//var c = document.createElement('canvas');
//$("canvas").remove();
//	$("body").prepend("<canvas id='c"+themeCount+"'></canvas>");
		canvas = document.getElementById("a");
var w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    ctx = canvas.getContext('2d'),


//  $("body").append(c);
    
    //parameters
    total = (w/8)|0,
    accelleration = .05,
    lineAlpha = .02,
    range = 25,
    
    //afterinitial calculations
    size = w/total,
    occupation = w/total,
    repaintColor = 'rgba(0, 0, 0, 1)'
    colors = [],
    dots = [],
    dotsVel = [];

//setting the colors' hue
//and y level for all dots
var portion = 360/total;
for(var i = 0; i < total; ++i){
  colors[i] = portion * i;
  
  dots[i] = h;
  dotsVel[i] = 10;
}

function anim(){
//	window.cancelAnimationFrame(ani);
  ani=window.requestAnimationFrame(anim);
  
  ctx.fillStyle = repaintColor;
  ctx.fillRect(0, 0, w, h);
  
  for(var i = 0; i < total; ++i){
    var currentY = dots[i] - 1;
    dots[i] += dotsVel[i] += accelleration;
    
    for(var j = i+1; j < i+range && j < total; ++j){
      if(Math.abs(dots[i] - dots[j]) <= range*size){
        ctx.strokeStyle = 'hsla(hue, 80%, 50%, alp)'.replace('hue', (colors[i] + colors[j] + 360)/2 - 180).replace('alp', lineAlpha);
        ctx.beginPath();
        ctx.moveTo(i * occupation, dots[i]);
        ctx.lineTo(j * occupation, dots[j]);
        ctx.stroke();
      }
    }
    
    if(dots[i] > h && Math.random() < .01){
      dots[i] = dotsVel[i] = 0;
    }
  }
}

anim();
//$(window).resize(animResize);