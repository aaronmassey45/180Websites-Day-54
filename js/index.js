//The sweeps, tutorial by TheCodingTrain.com

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid, cols, rows;
let w = 40;
let totalMines = 18;

function setup() {
  createCanvas(601, 401);
  cols = floor(width/w);
  rows = floor(height/w);
  grid = make2DArray(cols,rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  //Pick mine spots
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i,j])
    }
  }

  for (let n=0; n<totalMines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    options.splice(index,1);
    grid[i][j].mine = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countNeighbors();
    }
  }
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  if (mouseButton == "right") {
    $('body').on('contextmenu', 'canvas', function(e){ return false; });
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].flag();
        }
      }
    }
  } else {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].isFlagged) {
          grid[i][j].reveal();

          if(grid[i][j].mine) {
            gameOver();
          }
        }
      }
    }
  }
}

function draw() {
  background(255);
  let totalRevealed=[];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
