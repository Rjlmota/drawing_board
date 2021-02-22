//const { addButton } = require("../libraries/quicksettings");

var presses = [] 
var board;
var pen;
let currentMode;
var current_selection;


// var cube =  [
//   [0, 0, -5, 1],
//   [5, 0, -5, 1],
//   [5, 5, -5, 1],
//   [0, 5, -5, 1],
//   [0, 0, -10, 1],
//   [5, 0, -10, 1],
//   [5, 5, -10, 1],
//   [0, 5, -10, 1],
// ]

// var cube = [
//   [0, 1, 1, 0, 0, 1, 1, 0],
//   [0, 0, 1, 1, 0, 0, 1, 1],
//   [-1, -1, -1, -1, -2, -2, -2, -2],
//   [1, 1, 1, 1, 1, 1, 1, 1]
// ]
//let current_click = 0;
clicks = [];
function setup() {
  raio_do_circulo = createInput();
  raio_do_circulo.position(600, 65);
  raio_do_circulo.hide();

  precisao = createInput();
  precisao.position(600, 65);
  precisao.hide();

  current_selection;

  currentMode = 'None'
  start_menu();
  
  createCanvas(1000, 1000);

  board = new Board(20)
  pen = new Pen();
  var pontos_controle = [[0,0], [0, 10],[10, 0], [10, 10]];
  //var pontos_controle = [[500, 500], [500, 540],[540, 500], [540, 540]];
  //poly = new Polygon(pontos_controle);
  //board.drawings.push(poly);

  //board.grid();
  //cube = new Cube(1, 0);
  //print(cube.self_draw());
  //_ortho(cube.self_draw());

  
}

function draw() {
  board.grid();
}

function mouseClicked(){
  print(mouseIsInCanvas());

  //CASE LINE
  if(currentMode == 'line'){
    collect_clicks(2)
    
  }

  //CASE CIRCLE
  if(currentMode == 'circle'){
    if(collect_clicks(1)){
      // center = new Tile(clicks[0].x, clicks[0].y,'red', true);
      // center = new Drawing([center]);
      // print(center);
      // //board.tiles.push(new Tile(clicks[0].x, clicks[0].y, 20, 20, true, 'red'));
      // board.drawings.push(center);
      //board.update();
      //if(params){}
    }
  }

  //CASE CURVE
  if(currentMode == 'curve'){
    collect_clicks(100);
    //drawClicks();
  }

  if(currentMode == 'poli'){
    collect_clicks(100);
    //drawClicks();
  }
  
  if(currentMode == 'paint' && mouseIsInCanvas()){
    limparSelecao();
    board.flood_fill(mouseX, mouseY, 'black', 'red');
  }

  if(currentMode == 'select' && mouseIsInCanvas()){
    current_selection = board.find_drawing(mouseX, mouseY);
    currentMode = 'none';
  }

  if(currentMode == 'manipulation'){

  }

}
function collect_clicks(limit){
  //print(clicks);
  if(mouseIsInCanvas()){
    if(clicks.length < limit){
      if(clicks.length == 0){
        clicks.push([int(mouseX/20),int(mouseY/20)]);
        drawClicks();
      }
      if(clicks.length > 0 && clicks.length < limit){
        currentX = int(mouseX/20);
        currentY = int(mouseY/20);
        if(currentX != clicks[clicks.length-1][0] || currentY != clicks[clicks.length-1][1]){
          //print('executou2!')
          clicks.push([currentX,currentY]);
          drawClicks();
        }
      }
    }
  }
  if(clicks.length == limit){
    return true
  }else{
    return false;
  }
}

function start_menu(){
    
  
  button = createButton('RESET');
  button.position(800, 60);
  button.mouseClicked(clear_all);


  paint = createButton('PINTAR');
  paint.position(800, 100);
  paint.mouseClicked(setPaint);


  selec = createButton('SELECIONAR');
  selec.position(800, 140);
  selec.mouseClicked(setSelec);

  rotat = createButton('MANIPULAR');
  rotat.position(800, 180);
  rotat.mouseClicked(enableManipulation);



  sel = createSelect();
  sel.position(600, 30);
  sel.option('Selecione uma opção!');
  sel.option('Desenhar Linha!');
  sel.option('Desenhar Círculo')
  sel.option('Desenhar Curva');
  sel.option('Desenhar Poligono');
  sel.option('Projetar Cubo');
  sel.option("Ortho Cubo");

  //sel.selected('kiwi');
  sel.changed(mySelectEvent);
}

function clear_menu(){
  raio_do_circulo.hide();
  clear();
}

function clear_all(){
  clear();
  raio_do_circulo.hide();
  clicks=[]
  board.clearBoard();
  board.drawings = [];
  board.painting =  [];
  board.tiles=[];
}

function drawClicks(){
  print("DRAW CLICK");
  if(clicks.length > 0){
    click = new Tile(clicks[clicks.length-1][0], clicks[clicks.length-1][1],'gray', true);
    //click = new Drawing([click]);
    //print("recente click", click)
    board.tiles.push(click);
  

  
  }
}

function setSelec(){
  currentMode = 'select';
}

function enableManipulation(){
  currentMode = 'mainpulation';
  raio_do_circulo.hide();
  angulo = createInput();
  angulo.position(600, 65);
  textSize(15);
  fill('black')
  text("Angulo", 560, 80);



  rotate_button = createButton("Rotate");
  rotate_button.position(600, 100);
  rotate_button.mouseClicked(rotateObject);


  move_button = createButton("Move it");
  move_button.position(600, 130);
  move_button.mouseClicked(move_poly);

}

function rotateObject(){
  print("Trying to rotate")
  //print(current_selection[0].points[0])
  current_selection[0].rotate(int(angulo.value()), current_selection[0].points[0]);
  //board.update();
  board.clearBoard();
  clear();
}

function move_poly(){
  print("ONDE TUDO COMEÇA", current_selection[0])
  current_selection[0].move([10,10]);
  //print(current_selection[0])
  //board.drawings.push(current_selection[0]);
  //clear_all();
  board.update();
  print(board.drawings)
  board.clearBoard();
  clear();
}

function limparSelecao(){
  for (var i = 0; i< board.tiles.length; i++){
    if(board.tiles[i].color == 'gray'){
      board.tiles.splice(i, 1);
    }
  }
}


function mySelectEvent() {
  let item = sel.value();
  //print(item);
  //background(200);
  if(item == 'Desenhar Linha!'){
      clear_menu();
      textSize(22);
      text('Clique em dois quadrados na tela, o programa desenhará uma linha entre eles', 510, 300, 400, 400);
      currentMode = 'line';
      clicks = [];

      button = createButton('Desenhar');
      button.position(540, 150);
  
      button.mousePressed(desenhar_linha);

}
  if(item == 'Desenhar Círculo'){
    clear_menu();
    clicks = [];
    currentMode = 'circle';
    raio_do_circulo = createInput();
    raio_do_circulo.position(600, 65);

    text('Raio:', 545, 80);
    //askRadius.position(540, 45);

    text('h3', 'Clique no quadro para selecionar o centro!', 540, 300);
    //askClick.position(540, 100);

    button = createButton('Desenhar');
    button.position(540, 150);

    button.mousePressed(desenhar_circulo);
  }

  if(item == 'Desenhar Curva'){
    clear_menu();
    textSize(13);
    text('Clique em N quadrados na tela, o programa desenhará uma curva entre eles', 510, 300, 400, 400);
    currentMode = 'curve';
    clicks=[];

    precisao.show();
    text('Precisao:', 540, 80)


    button = createButton('Desenhar');
    button.position(540, 150);

    button.mousePressed(desenhar_curva);
  }

  if(item == 'Desenhar Poligono'){
    clear_menu();
    textSize(22);
    text('Clique em N quadrados na tela, o programa desenhará retas entre eles', 510, 300, 400, 400);
    currentMode = 'poli';
    clicks=[];

    button = createButton('Desenhar');
    button.position(540, 150);

    button.mousePressed(desenhar_poli);

  }

  if(item == 'Projetar Cubo'){
    clear_menu();
    var cubo = new Cube(16, 5);
    resultado = _perspec(cubo.base());
    points = []
    for(var i = 0; i< resultado[0].length; i++){
      points.push(_round([resultado[0][i], resultado[1][i]]))
    }
    cubo.points = points;
    board.drawings.push(cubo)
  }

  if(item == 'Ortho Cubo'){
    clear_menu();
    var cubo = new Cube(16, 5);
    resultado = _orth(cubo.base());
    points = []
    for(var i = 0; i< resultado[0].length; i++){
      points.push(_round([resultado[0][i], resultado[1][i]]))
    }
    cubo.points = points;
    board.drawings.push(cubo)
  }

}

function desenhar_curva(){
    clear();
    //clicks =[[0, 0], [15, 15], [0, 15]];
    curve = pen.draw_curve(clicks, int(precisao.value()));
    curve = new Drawing(curve);
    print("CURVE", curve)
    board.drawings.push(curve);
}

function desenhar_linha(){
  var line = pen.drawLine(clicks[0][0], clicks[0][1], clicks[1][0], clicks[1][1]);
  line = new Line(line);
  board.drawings.push(line);
}

function desenhar_poli(){
  clear();
  //poli = pen.draw_polilinha(clicks);
  print("CLIIICKS", clicks)
  poli = new Polygon(clicks)
  print(poli);
  board.drawings.push(poli)
}

function desenhar_circulo(){
  board.clearBoard();
  clear();

  pen.new_radius(int(raio_do_circulo.value()));
  print(pen.radius)

  pen.centro_x = clicks[0][0];
  pen.centro_y = clicks[0][1];

  circle = new Drawing(pen.drawCircle());
  board.drawings.push(circle);
}

function mouseIsInCanvas(){
  return mouseX > 0 &&
  mouseX < 500 &&
  mouseY > 0 &&
  mouseY < 500;
}

function setPaint(){
  currentMode = 'paint';
}

