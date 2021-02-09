function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class Board{
    constructor(tile_size){
        this.tiles = []
        this.tile_size = tile_size
    } 
    grid() {
        for (var x = 0; x < width; x += this.tile_size) {
          line(x, 0, x, height);
          for (var y = 0; y < height; y += this.tile_size) {
            line(0, y, width, y);
          }
        }


    for (let i = 0; i< this.tiles.length;i++){
        let tile = this.tiles[i]
        tile.render()
    }
   }

   clearBoard(){
       this.tiles = []
   }
}

class Tile {
    constructor (x, y, on= false, size=20){
        this.x = x*20;
        this.y = y*20;
        this.size = size;
        this.on = on;
    }


    async render(){
        if(this.on){
        //await sleep(2000);
            //translate(10, 10);
            fill('red');
            rect(this.x,this.y, this.size, this.size);            
         }
    }
}
