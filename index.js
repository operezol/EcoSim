let iterations = 0;
let widthUnit = 0;
let heightUnit = 0;
let canvasWidth = 0;
let canvasHeight = 0;
const canvasDivision = 100;
const smoothDepthLevel = 1;
const smoothDepthRadius = 2;
const rainLevel = 100000;
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

function getSurroundingCoordinates(i, j) {
  const surroundingCoordinates = [];
  for (let x = i - smoothDepthRadius; x <= i + smoothDepthRadius; x++) {
    for (let y = j - smoothDepthRadius; y <= j + smoothDepthRadius; y++) {
      if (x >= 0 && x < boardMap.length && y >= 0 && y < boardMap[x].length) {
        surroundingCoordinates.push({ x: x, y: y });
      }
    }
  }
  return surroundingCoordinates;
}

function calculateSmoothedDepth(surroundingCoordinates) {
  let sum = 0;
  for (let coordinates of surroundingCoordinates) {
    sum += boardMap[coordinates.x][coordinates.y].depth;
  }
  return Math.round(sum / surroundingCoordinates.length);
}

function smoothMapDepths() {
  for (let i = 0; i < boardMap.length; i++) {
    for (let j = 0; j < boardMap[i].length; j++) {
      const surroundingCoordinates = getSurroundingCoordinates(i, j);
      const smoothedDepth = calculateSmoothedDepth(surroundingCoordinates);
      boardMap[i][j].depth = smoothedDepth;
    }
  }
}

const rain = () => {
  for (let i = 0; i < rainLevel; i++) {
    const firstNum = Math.floor(Math.random() * canvasDivision);
    const secondNum = Math.floor(Math.random() * canvasDivision);
    boardMap[firstNum][secondNum].waterLevel += 1;
  }
};

const waterFlow = () => {
  for (let row = 0; row < boardMap.length; row++) {
    for (let col = 0; col < boardMap[row].length; col++) {
      const surroundingCoordinates = getSurroundingCoordinates(row, col);
      let waterSum = surroundingCoordinates.reduce(
        (sum, coords) => sum + boardMap[coords.x][coords.y].waterLevel,
        0
      );

      if (waterSum > 0) {
        const surroundingPoints = surroundingCoordinates.map((coords) => ({
          x: coords.x,
          y: coords.y,
          depth: boardMap[coords.x][coords.y].depth,
          waterLevel: 0,
        }));

        surroundingPoints.sort((a, b) => a.depth - b.depth);

        let totalWaterCapacity = 0;
        let i = 1;

        while (i < surroundingPoints.length && totalWaterCapacity <= waterSum) {
          const higherDepth = surroundingPoints[i].depth;
          const prevLevel =
            surroundingPoints[i - 1].depth +
            surroundingPoints[i - 1].waterLevel;
          const capacityDiff = higherDepth - prevLevel;
          totalWaterCapacity += capacityDiff;

          if (totalWaterCapacity <= waterSum) {
            surroundingPoints[i - 1].waterLevel += capacityDiff;
            waterSum -= capacityDiff;
          } else {
            const equallyDividedWater = totalWaterCapacity / i;
            surroundingPoints[i - 1].waterLevel += equallyDividedWater;
            waterSum -= equallyDividedWater;
          }

          i++;
        }

        surroundingPoints.forEach((point) => {
          boardMap[point.x][point.y].waterLevel = point.waterLevel;
        });
      }
    }
  }
};

const renderMap = () => {
  for (let i = 0; i < boardMap.length; i++) {
    for (let j = 0; j < boardMap[i].length; j++) {
      if (boardMap[i][j].waterLevel > 0) {
        fill(
          Math.floor(boardMap[i][j].depth + boardMap[i][j].waterLevel),
          Math.floor(boardMap[i][j].depth + boardMap[i][j].waterLevel),
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
    smoothMapDepths();
  }
}

function draw() {
  iterations++;
  console.log(iterations);
  background(0);
  rain();
  waterFlow();
  renderMap();
}
