'use strict';

let gElCanvas;
let gCtx;

function onInit() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  renderMeme();
  renderImages();
}

function resizeCanvas() {
  const elContainer = document.querySelector('.meme');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function renderMeme(txt) {
  const meme = getMeme();
  const memeId = meme.selectedImgId;
  const memeTxt = meme.lines[meme.selectedLineIdx].txt;

  var img = new Image();
  img.src = `imgs/${memeId}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    renderTxt(txt);
  };
}

function renderTxt(txt) {
  const meme = getMeme();
  const memeLineIdx = meme.selectedLineIdx;
  const lines = meme.lines;

  let newTxt = meme.lines[memeLineIdx].txt;

  if (!txt) txt = newTxt;
  updateMemeTxt(txt);

  lines.forEach((line) => {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, line.x, line.y);
  });
}

function onUpdateMeme(id) {
  document.querySelector('.meme-gallery').hidden = true;
  document.querySelector('.meme-section').classList.remove('hide');
  updateMeme(id);
  renderMeme();
}

function renderImages() {
  const images = getImgs();
  let strHTML = '';
  images.map((image, idx) => {
    return (strHTML += `
        <img
            onclick="onUpdateMeme(${images[idx].id})"
            class="img-item"
            src="imgs/${idx + 1}.jpg"
            alt=""
          />
    `);
  });

  document.querySelector('.photos').innerHTML = strHTML;
}

function onFontChange(isPlus) {
  changeFontSize(isPlus);
  renderMeme();
}

function onAddLine() {
  let txt = (document.querySelector('.meme-text').value = '');
  addLine(txt);
  renderMeme();
}

function onChangeLine() {
  changeLine();
  renderMeme();
}

function onDeleteLine() {
  deleteLine();
  renderMeme();
}

function onTextAlign(pos) {
  alignTextPos(pos);
  renderMeme();
}

function onChangeFont(font) {
  changeFontStyle(font);
  renderMeme();
}

function onChangeTxtColor(color) {
  changeTxtColor(color);
  renderMeme();
}
