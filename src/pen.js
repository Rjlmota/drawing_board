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
        print("ANTEA", x, y); 
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

}