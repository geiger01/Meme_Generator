'use strict';

let gElCanvas;
let gCtx;

let gIsMouseDown = false;
let gIsTouchDown = false;

function onInit() {
  gElCanvas = document.querySelector('.canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  renderMeme();
  renderImages();
  addMouseListeners();
  addTouchListeners();
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
    if (line.isStroke) {
      gCtx.lineWidth = 2;
      gCtx.strokeText(line.txt, line.x, line.y);
    } else return;
  });
}

function onUpdateMeme(id) {
  document.querySelector('.meme-gallery').hidden = true;
  document.querySelector('.meme-section').classList.remove('hide');
  updateMeme(id);
  renderMeme();
}

function renderImages(filterTxt = 'All') {
  const images = getImgsForDisplay(filterTxt);
  let strHTML = '';
  images.map((image, idx) => {
    return (strHTML += `
        <img
            onclick="onUpdateMeme(${images[idx].id})"
            class="img-item"
            src="imgs/${images[idx].id}.jpg"
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
  document.querySelector('.meme-text').value = getTxt();
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

function onToggleStroke() {
  toggleStroke();
  renderMeme();
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL('image/jpg');
  elLink.href = data;
  elLink.download = 'Picture';
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMouseMove);
  gElCanvas.addEventListener('mousedown', onMouseDown);
  gElCanvas.addEventListener('mouseup', onMouseUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onTouchMove);
  gElCanvas.addEventListener('touchstart', onTouchDown);
  gElCanvas.addEventListener('touchend', onTouchUp);
}

function onMouseDown(ev) {
  gIsMouseDown = true;
}

function onMouseUp(ev) {
  gIsMouseDown = false;
  document.querySelector('.meme').style.cursor = 'default';
}

function onMouseMove(ev) {
  if (gIsMouseDown) {
    document.querySelector('.meme').style.cursor = 'grabbing';
    let posX = ev.offsetX - getTextWidth() / 2;
    let posY = ev.offsetY;
    moveText(posX, posY);
    renderMeme();
  } else return;
}

function onTouchDown(ev) {
  ev.preventDefault();
  gIsTouchDown = true;
}

function onTouchUp(ev) {
  ev.preventDefault();
  gIsTouchDown = false;
}

function onTouchMove(ev) {
  ev.preventDefault();
  var { x, y, width, height } = ev.target.getBoundingClientRect();
  var offsetX = ((ev.touches[0].clientX - x) / width) * ev.target.offsetWidth;
  var offsetY = ((ev.touches[0].clientY - y) / height) * ev.target.offsetHeight;
  if (gIsTouchDown) {
    let posX = offsetX - getTextWidth() / 2;
    let posY = offsetY;
    moveText(posX, posY);
    renderMeme();
  } else return;
}

//measures text width
function getTextWidth() {
  const meme = getMeme();
  const text = gCtx.measureText(meme.lines[meme.selectedLineIdx].txt);
  let textWidth = text.width;

  return textWidth;
}

function onFilter(elFilterBtn) {
  let filterTxt = elFilterBtn.innerText;
  getImgsForDisplay(filterTxt);
  renderImages(filterTxt);
}
