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
      color: 'red',
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
  if (gMeme.lines.length === 1) {
    var y = gElCanvas.height - 40;
    var x = 50;
  } else if (gMeme.lines.length === 2) {
    var y = gElCanvas.height - 250;
    var x = 50;
  }
  gMeme.lines.push({
    x: x,
    y: y,
    txt: txt,
    size: 40,
    align: 'left',
    color: 'red',
  });

  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
