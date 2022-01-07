const MAX_DEPTH = 20;
const SCALING_FACTOR = 4;
let boxCountingResults;
let countedCells;

function getFractalDimension(x, y) {
  let mean_x = mean(x);
  let mean_y = mean(y);
  let b = covariance(x, y) / variance(x);
  let a = mean_y - b * mean_x;
  return -b / a;
}

function boxCounting() {
  let width = canvasResult.width;
  let height = canvasResult.height;

  let canvas = canvasResult.getContext("2d").getImageData(0, 0, width, height);
  let canvasMatrix = rgbaToBw(canvas.data, width);

  boxCountingResults = [1];
  countedCells = [];
  for (let i = 0; i < MAX_DEPTH; i++) {
    boxCountingResults.push(0);
    countedCells.push([]);
  }

  let x = [];
  let y = [];

  _boxCounting(canvasMatrix, 0, 0, width, height, 0, 0);

  for (let i = 0; i < MAX_DEPTH; i++) {
    if (boxCountingResults[i] == 0
      || isNaN(boxCountingResults[i])
      || (i > 0 && boxCountingResults[i] < boxCountingResults[i - 1])) {
      break;
    }
    x.push(Math.log(boxCountingResults[i]));
    y.push(Math.log(Math.pow(SCALING_FACTOR, i + 1)));
  }
  maxDisplayDepth = x.length+1;

  return getFractalDimension(x, y);
}

function _boxCounting(matrix, iX, iY, fX, fY, depth) {
  if (depth > MAX_DEPTH) {
    return 0;
  }

  let hasW = false;
  let hasB = false;

  for (let i = iY; i < fY; i++) {
    for (let j = iX; j < fX; j++) {
      hasW |= matrix[i][j];
      hasB |= !matrix[i][j];
      if (hasW && hasB) { break; }
    }
    if (hasW && hasB) { break; }
  }

  if (hasW && hasB) {
    let counter = 0
    let mX = (fX + iX) / 2;
    let mY = (fY + iY) / 2;

    counter += _boxCounting(matrix, iX, iY, Math.floor(mX), Math.floor(mY), depth + 1); // Primer cuarto
    counter += _boxCounting(matrix, Math.ceil(mX), iY, fX, Math.floor(mY), depth + 1); // Segundo cuarto
    counter += _boxCounting(matrix, iX, Math.ceil(mY), Math.floor(mX), fY, depth + 1); // Tercer cuarto
    counter += _boxCounting(matrix, Math.ceil(mX), Math.ceil(mY), fX, fY, depth + 1); // Cuarto cuarto
    boxCountingResults[depth] += counter;
    countedCells[depth].push(new Cell(iX, iY, fX, fY));

    return 1;
  }
  
  return 0
}

