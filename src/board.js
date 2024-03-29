function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class Board{
    constructor(tile_size){
        this.tiles = []
        this.tile_size = tile_size
        this.drawings = []
        this.coloring = [];
    } 
    grid() {
        for (var x = -width; x <= width/2; x += this.tile_size) {
           line(x, -width, x, height/2);
        //for (var x = 0; x < width; x += this.tile_size) {
          line(x, 0, x, height/2);
            for (var y = -height; y <= height/2; y += this.tile_size) {
            line(-height, y, width/2, y);
        //for (var y = 0; y < height; y += this.tile_size) {
         //   line(0, y, width, y);
          }
        }

    //this.clearBoard();
    //print(this.drawings);
    for (var i = 0; i < this.drawings.length; i++){
        var drawing_coods = this.drawings[i].self_draw()
        //print("aa", drawing_coods)
        //this.tiles.push(this.drawings[i].self_draw());
        for(var j = 0; j < drawing_coods.length; j++){
            //print("A", new Tile(drawing_coods[j].x, drawing_coods[j].y))
            this.tiles.push(new Tile(drawing_coods[j].x, drawing_coods[j].y,'red', true));//, color='red'));

        }
    }

        for(var j = 0; j < this.coloring.length; j++){
            this.tiles.push(this.coloring[j]);

        }
    
    //print(this.tiles)
    for (let i = 0; i< this.tiles.length;i++){
        let tile = this.tiles[i]
        tile.render()
    }
   }

   read_pixel(x, y){
    x = x - (x%20);//int(x/20);
    y = y - (y%20);///int(y/20);
    //print("READPIXEL", x, y);
    for (var i = 0; i < this.tiles.length; i++){
        //print("TILES/XY", (x, y), (this.tiles[i].x, this.tiles[i].y));
        if (this.tiles[i].x ==x){
            if(this.tiles[i].y == y){
                return this.tiles[i]
                }
            }
        }

        for (var i = 0; i < this.coloring.length; i++){
            //print("TILES/XY", (x, y), (this.tiles[i].x, this.tiles[i].y));
            if (this.coloring[i].x ==x){
                if(this.coloring[i].y == y){
                    return this.coloring[i]
                    }
                }
            }
    }

    flood_fill(x, y, _color, edge_color){
        var current = this.read_pixel(x, y);
        if(current == null){
            current = new Tile(int(x/20), int(y/20), true, 'null');
            this.coloring.push(current);
            this.tiles.push(current);
        }

        //print("CURRENT", current, current.color, edge_color, _color);
            if(current.color != edge_color && current.color != _color ){
                //print("changing color")
                current.color = _color;
                //redraw();
                this.flood_fill(x+20, y, _color, edge_color);
                this.flood_fill(x, y+20, _color, edge_color);
                this.flood_fill(x-20, y, _color, edge_color);
                this.flood_fill(x, y-20, _color, edge_color);
            }
    }    

   clearBoard(){
       this.tiles = []
   }

   update(){
       this.grid();
   }

   draw_this(tiles){
       this.drawings.push(tiles);
   }

   find_drawing(x, y){
       x = int(x/20);
       y = int(y/20);

       print("searching for", x, y);
       for(var i = 0; i< this.drawings.length; i++){
           for (var j = 0; j < this.drawings[i].points.length; j++){
               if(x == this.drawings[i].points[j][0] && y== this.drawings[i].points[j][1]){
                   print("FOUND:", this.drawings[i])
                   return [this.drawings[i], [x, y]];
               }
           }
       }
   }
}


class Tile {
    constructor (x, y, color, on, size=20){
        this.x = x*size;
        this.y = y*size;
        this.size = size;
        this.on = on;
        this.color=color;
    }


    render(){
        if(this.on){
        //await sleep(2000);
            //translate(10, 10);
            //translate(500, 500);

            fill(this.color);
            //print(this.color)
            rect(this.x,this.y, this.size, this.size);            
         }
    }
}
