// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Randomness Modifiers
const LINE_WIDTH = 5;
const INCREMENTS = 10;
const STEP_TIMEOUT = 0;

var context = (function initializeCanvas() {
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  var pixelRatio = window.devicePixelRatio || 1;
  canvas.width = CANVAS_WIDTH * pixelRatio;
  canvas.height = CANVAS_HEIGHT * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);  
  ctx.lineCap = 'square';
  ctx.lineWidth = LINE_WIDTH;
  ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = '#000';  // Set background to black
  ctx.fill();
  ctx.strokeStyle = '#FFF'; // Set line color to white
  return ctx;
}());

const drawLine = function(ctx, x, y, deltaX, deltaY) {
  // Diagonal Lines in Random Directions
  let directions = [
    { dx: deltaX, dy: deltaY },    // ↘
    { dx: -deltaX, dy: deltaY },   // ↙
    { dx: deltaX, dy: -deltaY },   // ↗
    { dx: -deltaX, dy: -deltaY }   // ↖
  ];

  let direction = directions[Math.floor(Math.random() * directions.length)];
  
  ctx.moveTo(x, y);
  ctx.lineTo(x + direction.dx, y + direction.dy);
  
  ctx.stroke(); 
};

const drawPicture = function(ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize) {  
  setTimeout(drawSpan, STEP_TIMEOUT, ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize);
};

const drawSpan = function(ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize) {
  drawLine(ctx, xProgress, yProgress, stepSize, stepSize);
  
  if (yProgress >= canvasHeight) {
    saveCanvasAsJPG(); // Save the canvas as a JPG after drawing
    return;
  }
  if (xProgress >= canvasWidth) {
    yProgress += stepSize;
    xProgress = 0;
  } else {
    xProgress += stepSize;
  }
  setTimeout(drawSpan, STEP_TIMEOUT, ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize);  
};

drawPicture(context, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_HEIGHT/INCREMENTS);

//SAVE ARTWORK AS A JPEG IMAGE
// const saveCanvasAsJPG = function() {
//   var canvas = document.querySelector('#canvas');
//   var link = document.createElement('a');
//   link.download = 'grid-lines.jpg';
//   link.href = canvas.toDataURL('image/jpeg');
//   link.click();
// };