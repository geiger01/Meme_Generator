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
  img.src = getImgUrl();
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
  document
    .querySelector('.save-btn')
    .addEventListener('click', copyToClipBoard); //creates popup
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

function onSearch(txt) {
  getImgsForDisplay(txt);
  renderImages(txt);
}

function onSaveMeme() {
  const memeUrl = gElCanvas.toDataURL('image/png', 'image/jpeg');
  saveUserMeme(memeUrl);
}

function renderUserMemes() {
  const userMemes = loadUserMemes();

  let strHTML = '';
  userMemes.map((meme) => {
    return (strHTML += `
    <div class="saved-meme-container">
    <img
    class="img-item"
    src="${meme.meme}"
    alt="meme"
    />
    <a onclick="onDeleteMeme(${meme.id})" class="delete-meme">Delete</a>
    </div>
    `);
  });

  document.querySelector('.photos').innerHTML = strHTML;
}

function onDeleteMeme(id) {
  deleteSavedMeme(id);
  renderUserMemes();
}

function copyToClipBoard() {
  document.querySelector('.copy-container').style.opacity = 1;

  setTimeout(() => {
    document.querySelector('.copy-container').style.opacity = 0;
  }, 1000);
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
  document.querySelector('.meme-gallery').hidden = true;
  document.querySelector('.meme-section').classList.remove('hide');

  const imgID = getImgs().length + 1;
  addImg(img.src, imgID);
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
