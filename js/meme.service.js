'use strict';

var gImgs = [
  { id: 1, url: 'imgs/1.jpg', keywords: ['political'] },
  { id: 2, url: 'imgs/2.jpg', keywords: ['political'] },
  { id: 3, url: 'imgs/3.jpg', keywords: ['political'] },
  { id: 4, url: 'imgs/4.jpg', keywords: ['political'] },
  { id: 5, url: 'imgs/5.jpg', keywords: ['political'] },
  { id: 6, url: 'imgs/6.jpg', keywords: ['political'] },
  { id: 7, url: 'imgs/7.jpg', keywords: ['political'] },
  { id: 8, url: 'imgs/8.jpg', keywords: ['political'] },
  { id: 9, url: 'imgs/9.jpg', keywords: ['political'] },
  { id: 10, url: 'imgs/10.jpg', keywords: ['political'] },
  { id: 11, url: 'imgs/11.jpg', keywords: ['political'] },
  { id: 12, url: 'imgs/12.jpg', keywords: ['political'] },
  { id: 13, url: 'imgs/13.jpg', keywords: ['political'] },
  { id: 14, url: 'imgs/14.jpg', keywords: ['political'] },
  { id: 15, url: 'imgs/15.jpg', keywords: ['political'] },
  { id: 16, url: 'imgs/16.jpg', keywords: ['political'] },
  { id: 17, url: 'imgs/17.jpg', keywords: ['political'] },
  { id: 18, url: 'imgs/18.jpg', keywords: ['political'] },
];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      x: 50,
      y: 45,
      txt: '',
      size: 40,
      align: 'left',
      color: 'white',
      font: 'IMPACT',
    },
  ],
};

function getMeme() {
  return gMeme;
}
function getImgs() {
  return gImgs;
}

function updateMemeTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function updateMeme(id) {
  gMeme.selectedImgId = id;
}

function changeFontSize(isPlus) {
  if (isPlus) {
    gMeme.lines[gMeme.selectedLineIdx].size += 10;
  } else {
    gMeme.lines[gMeme.selectedLineIdx].size -= 10;
  }
}

function addLine(txt) {
  if (gMeme.lines.length === 3) return;
  if (gMeme.lines.length === 1) {
    var y = 450;
    var x = 50;
  } else if (gMeme.lines.length === 2) {
    var y = 250;
    var x = 50;
  }

  gMeme.lines.push({
    x: x,
    y: y,
    txt: txt,
    size: 40,
    align: 'left',
    color: 'white',
    font: 'IMPACT',
  });

  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changeLine() {
  gMeme.selectedLineIdx--;
  if (gMeme.selectedLineIdx === -1) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  }
}

function deleteLine() {
  if (gMeme.selectedLineIdx > 0) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
  } else if (!gMeme.selectedLineIdx) {
    gMeme.selectedLineIdx = 0;
    gMeme.lines[0].txt = '';
  } else {
    return;
  }
}

function alignTextPos(pos) {
  gMeme.lines[gMeme.selectedLineIdx].align = pos;

  if (pos === 'left') {
    gMeme.lines[gMeme.selectedLineIdx].x = 50;
  }

  if (pos === 'center') {
    gMeme.lines[gMeme.selectedLineIdx].x = 190;
  }
  if (pos === 'right') {
    gMeme.lines[gMeme.selectedLineIdx].x = 300;
  }
}

function changeFontStyle(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changeTxtColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}
