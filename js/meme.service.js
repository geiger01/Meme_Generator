'use strict';

var gImgs = [
  { id: 1, url: 'imgs/1.jpg', keywords: ['all', 'political'] },
  { id: 2, url: 'imgs/2.jpg', keywords: ['all', 'cute'] },
  { id: 3, url: 'imgs/3.jpg', keywords: ['all', 'cute'] },
  { id: 4, url: 'imgs/4.jpg', keywords: ['all', 'cute'] },
  { id: 5, url: 'imgs/5.jpg', keywords: ['all', 'cute'] },
  { id: 6, url: 'imgs/6.jpg', keywords: ['all', 'smile'] },
  { id: 7, url: 'imgs/7.jpg', keywords: ['all', 'cute', 'funny'] },
  { id: 8, url: 'imgs/8.jpg', keywords: ['all', 'smile', 'movies'] },
  { id: 9, url: 'imgs/9.jpg', keywords: ['all', 'cute'] },
  { id: 10, url: 'imgs/10.jpg', keywords: ['all', 'smile'] },
  { id: 11, url: 'imgs/11.jpg', keywords: ['all', 'funny'] },
  { id: 12, url: 'imgs/12.jpg', keywords: ['all', 'movies'] },
  { id: 13, url: 'imgs/13.jpg', keywords: ['all', 'movies'] },
  { id: 14, url: 'imgs/14.jpg', keywords: ['all', 'movies'] },
  { id: 15, url: 'imgs/15.jpg', keywords: ['all', 'movies'] },
  { id: 16, url: 'imgs/16.jpg', keywords: ['all', 'smile', 'movies'] },
  { id: 17, url: 'imgs/17.jpg', keywords: ['all', 'political'] },
  { id: 18, url: 'imgs/18.jpg', keywords: ['all', 'movies'] },
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
      isStroke: true,
    },
  ],
};

var gUserMemes = [];
loadUserMemes();

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
    var y = 450;
    var x = 50;
  } else if (gMeme.lines.length === 2) {
    var y = 250;
    var x = 50;
  } else {
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
    isStroke: true,
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

function toggleStroke() {
  let isStroke = gMeme.lines[gMeme.selectedLineIdx].isStroke;
  isStroke = !isStroke ? true : false;
  gMeme.lines[gMeme.selectedLineIdx].isStroke = isStroke;
}

function getTxt() {
  return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function moveText(posX, posY) {
  gMeme.lines[gMeme.selectedLineIdx].x = posX;
  gMeme.lines[gMeme.selectedLineIdx].y = posY;
}

function getImgsForDisplay(filter = 'all') {
  if (filter === 'all') return gImgs;
  return gImgs.filter((img) => {
    return img.keywords.some((keyword) => {
      return keyword.includes(filter.toLowerCase());
    });
  });
  // filter = filter.charAt(0).toUpperCase() + filter.slice(1);
  // if (!filter) filter = 'All';
  // var filteredImgs = [];
  // for (let i = 0; i < gImgs.length; i++) {
  //   for (let j = 0; j < gImgs.length; j++) {
  //     if (gImgs[i].keywords[j] === filter) {
  //       filteredImgs.push(gImgs[i]);
  //     }
  //   }
  // }
  // return filteredImgs;
}

function saveUserMeme(memeUrl) {
  const meme = { id: Math.random(), meme: memeUrl };
  gUserMemes.push(meme);
  saveToStorage('userMemes', gUserMemes);
}

function loadUserMemes() {
  var memes = loadFromStorage('userMemes', gUserMemes);

  if (!memes || memes.length === 0) {
    memes = [];
  }
  gUserMemes = memes;
  saveToStorage('userMemes', gUserMemes);

  return gUserMemes;
}

function addImg(img, id) {
  const newImg = { id, url: img };
  gMeme.selectedImgId = id;
  gImgs.push(newImg);
}

function getImgUrl() {
  return gImgs[gMeme.selectedImgId - 1].url;
}

function deleteSavedMeme(id) {
  const memeIdx = gUserMemes.findIndex((meme) => {
    return meme.id === id;
  });

  gUserMemes.splice(memeIdx, 1);
  saveToStorage('userMemes', gUserMemes);
}

function getSelectedTextLine(x, y) {
  const idx = gMeme.lines.findIndex((line) => {
    let txtWidth = gCtx.measureText(line.txt).width;
    let txtHeight = line.size;
    return (
      x >= line.x &&
      x <= txtWidth + line.x &&
      y <= line.y &&
      y >= line.y - txtHeight
    );
  });
  return idx;
}
