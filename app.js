//Most code from https://enlight.nyc/projects/web-paint
var canvas = document.getElementById("draw");

var ctx = canvas.getContext("2d");
resize();

// resize canvas when window is resized
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// initialize position as 0,0
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function draw(e) {
  if (e.buttons !== 1) return; // if mouse is not clicked, do not go further

  var color = document.getElementById("hex").value;
  var width = document.getElementById("thickness").value;

  ctx.beginPath(); // begin the drawing path

  ctx.lineWidth = width; // width of line
  ctx.lineCap = "round"; // rounded end cap
  ctx.strokeStyle = color; // hex color of line

  ctx.moveTo(pos.x, pos.y - 80); // from position
  setPosition(e);
  ctx.lineTo(pos.x, pos.y-80); // to position

  ctx.stroke(); // draw it!
}


// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);

// add event listeners to trigger on different mouse events
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

//code from https://wanago.io/2019/06/24/creating-a-simple-drawing-app-using-canvas-saving-and-loading-images/
window.onload = () => {
    const canvas = document.getElementById('draw');
    const context = canvas.getContext('2d');
   
    const saveButton = document.getElementById('save');
    saveButton.addEventListener('click', () => save(canvas));
  };

  function save(canvas) {
    const data = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'image.png';
    anchor.click();
  }