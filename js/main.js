'use strict';

const gElCanvas = document.querySelector('.canvas');
const gCtx = gElCanvas.getContext('2d');

const gCanvasCont = document.querySelector('.meme');

function onInit() {
  resizeCanvas();
  addListeners();
}

function resizeCanvas() {
  gElCanvas.width = 476;
  gElCanvas.height = 546;
}
