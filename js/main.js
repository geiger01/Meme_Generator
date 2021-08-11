'use strict';

let gElCanvas;
let gCtx;

function onInit() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  renderMeme();
}

function resizeCanvas() {
  const elContainer = document.querySelector('.meme');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function renderMeme() {
  const meme = getMeme();
  const memeId = meme.selectedImgId;
  const memeTxt = meme.lines[meme.selectedLineIdx].txt;

  var img = new Image();
  img.src = `imgs/${memeId}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    renderTxt(memeTxt);
  };
}

function renderTxt(txt) {
  updateMemeTxt(txt);

  const meme = getMeme();
  const memeLineIdx = meme.selectedLineIdx;
  let newTxt = meme.lines[memeLineIdx].txt;

  gCtx.font = '50px IMPACT';
  gCtx.fillStyle = 'white';
  gCtx.fillText(newTxt, 20, gElCanvas.height - 480);
}
