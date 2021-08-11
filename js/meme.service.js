'use strict';

var gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['political'] }];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: '',
      size: 20,
      align: 'left',
      color: 'red',
    },
  ],
};

function getMeme() {
  return gMeme;
}

function updateMemeTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}
