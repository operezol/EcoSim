let widthUnit = 0;
let heightUnit = 0;
let canvasWidth = 0;
let canvasHeight = 0;
const canvasDivision = 100;
const smoothDepthLevel = 1;
const smoothDepthRadius = 1;
const rainLevel = 100;
const boardMap = [];

function populateBoardMap() {
  for (let i = 0; i < canvasDivision; i++) {
    const row = [];
    for (let j = 0; j < canvasDivision; j++) {
      row.push({ depth: Math.floor(Math.random() * 256), waterLevel: 0 });
    }
    boardMap.push(row);
  }
}

function smoothMap() {
  for (let i = 0; i < boardMap.length; i++) {
    for (let j = 0; j < boardMap[i].length; j++) {
      const value = boardMap[i][j].depth;
      const surroundingValues = getSurroundingValues(i, j);
      const smoothedValue = calculateSmoothedValue(surroundingValues);
      boardMap[i][j].depth = smoothedValue;
    }
  }
}

function getSurroundingValues(i, j) {
  const surroundingValues = [];
  for (let x = i - smoothDepthRadius; x <= i + smoothDepthRadius; x++) {
    for (let y = j - smoothDepthRadius; y <= j + smoothDepthRadius; y++) {
      if (x >= 0 && x < boardMap.length && y >= 0 && y < boardMap[x].length) {
        surroundingValues.push(boardMap[x][y].depth);
      }
    }
  }
  return surroundingValues;
}

function calculateSmoothedValue(surroundingValues) {
  let sum = 0;
  for (let value of surroundingValues) {
    sum += value;
  }
  return Math.round(sum / surroundingValues.length);
}

const rain = () => {
  for (let i = 0; i < rainLevel; i++) {
    const firstNum = Math.floor(Math.random() * canvasDivision);
    const secondNum = Math.floor(Math.random() * canvasDivision);
    boardMap[firstNum][secondNum].waterLevel += 1;
  }
};

const renderMap = () => {
  for (let i = 0; i < boardMap.length; i++) {
    for (let j = 0; j < boardMap[i].length; j++) {
      if (boardMap[i][j].waterLevel > 0) {
        fill(
          boardMap[i][j].depth + boardMap[i][j].waterLevel,
          boardMap[i][j].depth + boardMap[i][j].waterLevel,
          255
        );
      } else {
        fill(boardMap[i][j].depth);
      }
      noStroke();
      rect(j * widthUnit, i * heightUnit, widthUnit, heightUnit);
    }
  }
};

function setup() {
  if (windowWidth > windowHeight) {
    windowWidth = windowHeight;
  } else {
    windowHeight = windowWidth;
  }
  widthUnit = Math.floor(windowWidth / canvasDivision);
  canvasWidth = widthUnit * canvasDivision;
  heightUnit = Math.floor(windowHeight / canvasDivision);
  canvasHeight = heightUnit * canvasDivision;
  createCanvas(canvasWidth, canvasHeight);
  populateBoardMap();
  for (let index = 0; index < smoothDepthLevel; index++) {
    smoothMap();
  }
}

function draw() {
  background(0);
  rain();
  renderMap();
}
