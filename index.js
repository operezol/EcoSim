let depthMap = [];
let widthUnit = 0;
let heightUnit = 0;
let canvasWidth = 0;
let canvasHeight = 0;
const smoothLevel = 5;

function populateDepthMap() {
  for (let i = 0; i < 100; i++) {
    const row = [];
    for (let j = 0; j < 100; j++) {
      row.push(Math.floor(Math.random() * 256));
    }
    depthMap.push(row);
  }

}  

function smoothMap() {
  for (let i = 0; i < depthMap.length; i++) {
    for (let j = 0; j < depthMap[i].length; j++) {
      const value = depthMap[i][j];
      if (value < 255) {
        const surroundingValues = getSurroundingValues(i, j);
        const smoothedValue = calculateSmoothedValue(surroundingValues);
        depthMap[i][j] = smoothedValue;
      }
    }
  }

}

function getSurroundingValues(i, j) {
  const surroundingValues = [];
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (x >= 0 && x < depthMap.length && y >= 0 && y < depthMap[x].length) {
        surroundingValues.push(depthMap[x][y]);
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

const renderMap = () => {
  for (let i = 0; i < depthMap.length; i++) {
    for (let j = 0; j < depthMap[i].length; j++) {
      fill(depthMap[i][j]);
      noStroke();
      rect(j * widthUnit, i * heightUnit, widthUnit, heightUnit);
    }
  }
};

function setup() {
  widthUnit = Math.floor(windowWidth / 100);
  canvasWidth = widthUnit * 100;
  heightUnit = Math.floor(windowHeight / 100);
  canvasHeight = heightUnit * 100;
  createCanvas(canvasWidth, canvasHeight);
  populateDepthMap();
  for (let index = 0; index < smoothLevel; index++) {
    smoothMap();
  }
}

function draw() {
  background(0);
  renderMap();
}
