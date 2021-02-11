class Pen{
    constructor(){
        this.circle_e = -5;
        this.circle_x = 0;
        this.circle_y = 5;
        this.centro_x = 20;
        this.centro_y = 20;
        this.tiles = [];
    }

    drawLine(x0, y0, x1, y1){
        //from https://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;

        var tiles = []


        while(true) {
            tiles.push({x: x0, y: y0}); // Do what you need to for this

            if ((x0 === x1) && (y0 === y1)) break;
            var e2 = 2*err;
            if (e2 > -dy) { err -= dy; x0  += sx; }
            if (e2 < dx) { err += dx; y0  += sy; }
        }
         return tiles
    }

    drawCircle(){
        //let {x, y, circle_e, circle_x, circle_y} = this;
        var x = this.circle_x;
        var y = this.circle_y;
        var circle_e = this.circle_e;
        //print("ANTEA", x, y); 
        this._drawCircle(x, y)
        while(x <= y){
            circle_e += 2*x + 1;
            x++;
            
            if(circle_e >= 0){
                circle_e+=2-2*y
                y--
            }
            print(x, y)
            this._drawCircle(x, y)
            print("coordenadas: ", x, y);
            //this.tiles.push({x, y});
        }
        print("EI:", this.tiles);
        return this.tiles
    }

    _drawCircle(x,y, centro_x, cemtro_y, tiles){
        //translate(100,100)
        // x = x+20;
        // y = y+20;
       //x = abs(centro_x - x);
        //y = abs(centro_y - y);
        this.tiles.push({x: x + this.centro_x, y: y + this.centro_y});
        this.tiles.push({x: -x + this.centro_x,y: y + this.centro_y});
        this.tiles.push({x: x + this.centro_x, y: -y + this.centro_y});
        this.tiles.push({x: -x + this.centro_x, y: -y + this.centro_y});
        this.tiles.push({x: y + this.centro_x, y: x + this.centro_y});
        this.tiles.push({x: -y + this.centro_x, y: x + this.centro_y});
        this.tiles.push({x: y + this.centro_x, y: -x + this.centro_y});
        this.tiles.push({x: -y + this.centro_x, y: -x + this.centro_y});  
    }

    draw_curve(points){
        let pontos_final = []
        for(var i = 0; i<50; i++){
            fill('blue');
            let pontos = bezier_point(points, i/50);
            pontos_final.push({x: pontos[0], y:pontos[1]});
        }
        return pontos_final;
    }

    draw_polilinha(points){
        var final_points = [];
        for(var i = 0; i < points.length; i++){
            var next = i+1;
            if(i == points.length -1){
                next = 0;
            }

            let line = this.drawLine(points[i][0], points[i][1], points[next][0], points[next][1]);
            final_points = final_points.concat(line);//push({x: line[0], y: line[1]});
        }
        return final_points;
    }
}

function bezier_point(points, t){
  var pts = new Array(points.length);
  pts = copy_by_value(points);
    for(var r = 1; r< points.length; r++){
     for(var i = 0; i<points.length-r; i++){
       pts[i] = add(product(pts[i], (1-t)), product(pts[i+1], t));
   }
  }
  print(pts[0])
  return _round(pts[0]);
}


function _round(arr, n){
  out = [];
  for(var i=0;i<arr.length; i++){
    out.push(round(arr[i]));
  }
  return out;
}

function add(arr, arr2){
  out = [];
  for(var i=0;i<arr.length; i++){
    out.push(arr[i] + arr2[i]);
  }
  return out;
}

function copy_by_value(arr){
  var ar2 = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    ar2[i] = []; // empty object to hold properties added below
    for (var prop in arr[i]) {
        ar2[i][prop] = arr[i][prop]; // copy properties from arObj to ar2
    }
  }
  return ar2;


function bezier_point(points, t){
  var pts = new Array(points.length);
  pts = copy_by_value(points);
  //print("EIIII", pts[2])
  
  //pts = points.slice()
  // for(var i = 0; i < points.length; i++){
  //   pts[i] = points[i];
  //}
    for(var r = 1; r< points.length; r++){
     for(var i = 0; i<points.length-r; i++){
       pts[i] = add(product(pts[i], (1-t)), product(pts[i+1], t));
        //pts[i] = (1-t)*pts[i] + t*pts[i+1];
   }
  }
  print(pts[0])
  return _round(pts[0]);
}


}

function product(arr, n){
    for(var i=0;i<arr.length; i++){
      arr[i] = arr[i]*n;
    }
    return arr;
  }


