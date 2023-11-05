import p5 from 'p5';    
var quadtree = require('quadtree');

function setup() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    p5(canvas, window.innerWidth, window.innerHeight);
    var ctx = canvas.getContext("2d");
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }