let depthToDisplay = 0;
let maxDisplayDepth;

function loadDirectly() {
    activateImage('js_image--result');
    canvasResult.getContext('2d').drawImage(window.appData.img, 0, 0);
}

function drawCountedCells() {
    let width = canvasResult.clientWidth;
    let height = canvasResult.clientHeight;

    let canvas = document.querySelector('#image-hit-box');
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';

    for (let i = 0; i < countedCells[depthToDisplay].length; i++) {
        let celda = countedCells[depthToDisplay][i];
        ctx.fillRect(celda.x, celda.y, celda.width, celda.height);
    }

    let style = '';
    style += 'width:' + width.toString() + 'px;';
    style += 'height:' + height.toString() + 'px;';
    canvas.style = style;

    depthToDisplay = (depthToDisplay+1)%maxDisplayDepth;
    document.getElementById('depth').innerHTML = depthToDisplay.toString();
}

function clearCanvas() {
    let canvas = document.querySelector('#image-hit-box');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
