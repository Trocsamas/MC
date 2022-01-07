class Cell {
    constructor(iX, iY, fX, fY) {
        let wr = canvasResult.clientWidth / canvasResult.width;
        let hr = canvasResult.clientHeight / canvasResult.height;
        this.x = iX * wr;
        this.y = iY * hr;
        this.width = (fX - iX) * wr;
        this.height = (fY - iY) * hr;
    }
}

function sum(ns) {
    let n = 0;
    for (let i = 0; i < ns?.length; i++) {
        n += ns[i];
    }
    return n;
}

function variance(ns) {
    let n = 0;
    for (let i = 0; i < ns.length; i++) {
        n += Math.pow(ns[i], 2);
    }

    return (n / ns.length) - Math.pow(mean(ns), 2);
}

function covariance(ns, ms) {
    let n = 0;
    for (let i = 0; i < ns.length; i++) {
        n += ns[i] * ms[i];
    }
    return (n / ns.length) - mean(ns) * mean(ms);
}

function mean(ns) {
    return sum(ns) / ns.length;
}

function rgbaToBw(data, width) {
    let bwList = [];
    let bwMatrix = [];

    for (let i = 0; i < data.length; i += 4) {
        bwList.push(data[i] + data[i + 1] + data[i + 2] < 255 ? 1 : 0);
    }

    for (let i = 0; i < bwList.length; i += width) {
        bwMatrix.push(bwList.slice(i, i + width));
    }

    return bwMatrix;
}