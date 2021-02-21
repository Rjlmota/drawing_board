var presses = [] 
var board;
var pen;
function setup() {

  translate(500, 500);
  
  createCanvas(3000, 3000);

  board = new Board(20)
  pen = new Pen();
  var pontos_controle = [[0,0], [0, 10],[10, 0], [10, 10]];
  //var pontos_controle = [[500, 500], [500, 540],[540, 500], [540, 540]];
  poly = new Polygon(pontos_controle);
  board.drawings.push(poly);
}

function draw() {
  translate(500, 500);
  board.grid();

}

function mouseClicked(){
  board.drawings[0].rotate(30, board.drawings[0].points[2]);
  //board.flood_fill(mouseX, mouseY, 'black', 'red');
  //board.drawings[0].move(board.drawings[0].points[2]);

}



