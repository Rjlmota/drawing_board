class Pen{
    constructor(){
        this.radius = 5;
        this.circle_e = -this.radius;
        this.circle_x = 0;
        this.circle_y = this.radius;
        this.centro_x = 20;
        this.centro_y = 20;
        this.tiles = [];
    }

    draw_cube(size, start){
        return [
            [start, start + size, start + size, start, start, start + size, start + size, start],
            [start, start, start + size, start + size, start, start, start + size, start + size],
            [-size, -size, -size, -size, -2*size, -2*size, -2*size, -2*size],
            [1, 1, 1, 1, 1, 1, 1, 1]
          ]
    }

    new_radius(radius){
        this.radius = radius;
        this.circle_e = -this.radius;
        this.circle_y = this.radius;
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
            //print(x, y)
            this._drawCircle(x, y)
            //this.tiles.push({x, y});
        }
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

    draw_curve(points, precision){
        print('PONTOS', points);

        let pontos_final = []
        for(var i = 0; i<precision; i++){
            fill('blue');
            let pontos = bezier_point(points, i/precision);
            pontos_final.push({x: pontos[0], y:pontos[1]});
        }
        return pontos_final;
    }

    draw_polilinha(points){
        //points = to_array(points);
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


    connect_cube(points){
        //points = to_array(points);
        var final_points = [];
        for(var i = 0; i < points.length/2; i++){
            var next = i+1;
            if(i == points.length/2 -1){
                next = 0;
            }
            let line = this.drawLine(points[i][0], points[i][1], points[next][0], points[next][1]);
            final_points = final_points.concat(line);//push({x: line[0], y: line[1]});
        }

        for(var i = 4; i < points.length; i++){
            var next = i+1;
            if(i == points.length -1){
                next = 4;
            }
            let line = this.drawLine(points[i][0], points[i][1], points[next][0], points[next][1]);
            final_points = final_points.concat(line);//push({x: line[0], y: line[1]});
        }


        for (var i = 0; i< points.length/2; i++){
            let line = this.drawLine(points[i][0], points[i][1], points[i+4][0], points[i+4][1]);
            final_points = final_points.concat(line);
        }
    
        return final_points;
    }

}

function bezier_point(points, t){
  var pts = new Array(points.length);
  //points = to_array(points);
  pts = copy_by_value(points);
    for(var r = 1; r< points.length; r++){
     for(var i = 0; i<points.length-r; i++){
       pts[i] = add(product(pts[i], (1-t)), product(pts[i+1], t));
   }
  }
  //print(pts[0])
  return _round(pts[0]);
}
