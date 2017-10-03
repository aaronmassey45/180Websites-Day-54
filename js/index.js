let drops = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 500; i++) {
    drops[i] = new Drop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(210, 184, 135);
  for (let i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}
