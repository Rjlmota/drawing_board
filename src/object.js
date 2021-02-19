class Drawing{
 constructor(points){
     this.points = points;
     this.pen = new Pen();
 }
}

class Polygon extends Drawing{
    constructor(points){
        super(points);
    }

    self_draw(){
       return this.pen.draw_polilinha(this.points);
    }

    rotate(degrees){
        this.points =  rotate_at_origin(this.points, degrees);
    }
}

class Curve extends Drawing{
    constructor(points){
        super(this.points);
    }
}