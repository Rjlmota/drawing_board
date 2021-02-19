var presses = [] 
var board;
var pen;
function setup() {
  createCanvas(3000, 3000);

  board = new Board(20)
  pen = new Pen();
  var pontos_controle = [[0,0], [0, 40],[40, 0], [40, 40]];

  poly = new Polygon(pontos_controle);
  board.drawings.push(poly);
}

function draw() {

  board.grid();

}

function mouseClicked(){
  board.drawings[0].rotate(30);
  //board.flood_fill(mouseX, mouseY, 'black', 'red');
}



