// code from https://levelup.gitconnected.com/html5-canvas-drawing-application-on-github-pages-beginner-friendly-tutorial-5d50b99adb6a
window.addEventListener("load", () => {
	const clearButton = document.querySelector('#clear');
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext('2d');

	const img = new Image();
	img.src = "assets/images/reinePic.jpg";

	img.onload = () => {
		const [img_scaled_width, img_scaled_height] = drawImageToScale(img, ctx);
		canvas.width = img_scaled_width;
		canvas.height = img_scaled_height;
		window.addEventListener('resize', drawImageToScale(img,ctx));

	}

	// eventListeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove", draw)

	// variables
	let painting = false;

	function startPosition(e){
		painting = true;
		draw(e);
	}

	function finishedPosition(){
		painting = false;
		ctx.beginPath();
	}

	function draw(e){
		if (!painting)
			return;
        var color = document.getElementById("hex").value;
        ctx.strokeStyle = color;
		ctx.lineWidth = 3;
		ctx.lineCap = 'round';
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
        
	}
  
	clearButton.addEventListener('click', () => clearCanvas(img, ctx, canvas.width, canvas.height));
});

function drawImageToScale(img, ctx){
	const img_width = 650;
	const scaleFactor = img_width / img.width;
	const img_height = img.height * scaleFactor;
	ctx.drawImage(img, 0, 0,img_width,img_height);
	return [img_width,img_height];
}


function clearCanvas(img,ctx,img_scaled_width,img_scaled_height){
	ctx.clearRect(0,0, img_scaled_width, img_scaled_height);
	drawImageToScale(img, ctx);
}

function saveimg(){
    localStorage.setItem(canvasName, canvas.toDataURL());
}

function uploadimg(){
    var dataURL = localStorage.getItem(canvasName);
    var img = new Image;
    img.src = dataURL;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
}