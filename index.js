const createInitialRandomDepthMapArray = (windowWidth, windowHeight) => { 
  const depthMap = Array.from({ length: windowHeight }, () =>
    Array.from({ length: windowWidth }, () => Math.floor(Math.random() * 255))
  );
  return depthMap;
};
function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(0);
}