//instantiate cell object
function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.isFlagged = false;
  this.neighborCount = 0;
  this.revealed = false;
}

Cell.prototype.countNeighbors = function () {
  if (this.mine) {
    this.neighborCount = -1;
    return;
  }
  let total = 0;

  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        let neighbor = grid[i][j];
        if (neighbor.mine) {total++}
      }
    }
  }
  this.neighborCount = total;
}

//shows grid cell
Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.isFlagged) {
    fill(0);
    rect(this.x, this.y, this.w, this.w);
  }
  if (this.revealed) {
    if (this.mine) {
      fill(127);
      ellipse(this.x+this.w*0.5, this.y+this.w*0.5, this.w*0.5)
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        fill(0);
        textSize(20);
        text(this.neighborCount, this.x+this.w*0.3, this.y+this.w - 12);
      }
    }
  }
}

//Checks if grid cell has been pressed
Cell.prototype.contains = function (x,y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

//reveals grid cell
Cell.prototype.reveal = function () {
  this.revealed = true;
  if (this.neighborCount === 0) {
    this.floodFill();
  }
}

//flags grid cell
Cell.prototype.flag = function () {
  this.isFlagged = !this.isFlagged;
}

//fills in grid if you click a cell with no neighboring mines
Cell.prototype.floodFill = function () {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = this.i + xoff;
      let j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        let neighbor = grid[i][j];
        if (!neighbor.mine && !neighbor.revealed) {
          neighbor.reveal()
        }
      }
    }
  }
};
