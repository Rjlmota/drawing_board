var presses = [] 
var board;
var pen;
function setup() {
  createCanvas(1000, 1000);
  board = new Board(20)
  pen = new Pen();
  print(pen.x)
  // board.tiles.push(new Tile(0, 0, on = true));

  // board.tiles.push(new Tile(1, 1, on = true));
  // board.tiles.push(new Tile(1, 2, on = true));
}

function draw() {
  //board.grid();
  //background(220);
  board.grid();
  //fill('red')
  //rect(20, 20, 20, 20);
  //board.recta();
  //displayMousePosition();
}

function mouseClicked(){

  //let tiles_co = (pen.drawLine(1,1,100,50));
  let tiles_co = (pen.drawCircle());

  print(tiles_co)
  for (let i = 0; i < tiles_co.length; i++){
    board.tiles.push(new Tile(tiles_co[i].x, tiles_co[i].y, on=true))
  }
  //turn_red(mouseX, mouseY);
    // var x= mouseX; 
    // var y =  mouseY;
    // presses.push([x, y])
    // //print(presses)
}



