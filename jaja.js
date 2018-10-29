var image = document.querySelector('img');
var imageCanvas = document.createElement('canvas');
var imageCanvasContext = imageCanvas.getContext('2d');
var lineCanvas = document.createElement('canvas');
var lineCanvasContext = lineCanvas.getContext('2d');
var pointLifetime = 1000;
var points = [];

if (image.complete) {
  start();
} else {
  image.onload = start;
}
function start() {
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', resizeCanvases);
  document.body.appendChild(imageCanvas);
  resizeCanvases();
  tick();
}
function onMouseMove(event) {
  points.push({
    time: Date.now(),
    x: event.clientX,
    y: event.clientY
  });
}
function resizeCanvases() {
  imageCanvas.width = lineCanvas.width = window.innerWidth;
  imageCanvas.height = lineCanvas.height = window.innerHeight;
}
function tick() {
  points = points.filter(function(point) {
    var age = Date.now() - point.time;
    return age < pointLifetime;
  });

  drawLineCanvas();
  drawImageCanvas();
  requestAnimationFrame(tick);
}
function drawLineCanvas() {
  var minimumLineWidth = 25;
  var maximumLineWidth = 100;
  var lineWidthRange = maximumLineWidth - minimumLineWidth;
  var maximumSpeed = 50;

  lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
  lineCanvasContext.lineCap = 'round';
  lineCanvasContext.shadowBlur = 30;
  lineCanvasContext.shadowColor = '#000';
  
  for (var i = 1; i < points.length; i++) {
    var point = points[i];
    var previousPoint = points[i - 1];
    var distance = getDistanceBetween(point, previousPoint);
    var speed = Math.max(0, Math.min(maximumSpeed, distance));
    var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
    lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;
    var age = Date.now() - point.time;
    var opacity = (pointLifetime - age) / pointLifetime;
    lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
    
    lineCanvasContext.beginPath();
    lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
    lineCanvasContext.lineTo(point.x, point.y);
    lineCanvasContext.stroke();
  }
}
function getDistanceBetween(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
function drawImageCanvas() {  var width = imageCanvas.width;
  var height = imageCanvas.width / image.naturalWidth * image.naturalHeight;
  
  if (height < imageCanvas.height) {
    width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
    height = imageCanvas.height;
  }

  imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  imageCanvasContext.globalCompositeOperation = 'source-over';
  imageCanvasContext.drawImage(image, 0, 0, width, height);
  imageCanvasContext.globalCompositeOperation = 'destination-in';
  imageCanvasContext.drawImage(lineCanvas, 0, 0);
}

(function ($) {
  $(document).ready(function(){
    
  


  $(".bg-text").hide();
  


  
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.bg-text').fadeIn();
      } else {
        $('.bg-text').fadeOut();
      }
    });

  
  });
window.onscroll = function() {myFunction()};


var navbar = document.getElementById("navu");

var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


});
  }(jQuery));
