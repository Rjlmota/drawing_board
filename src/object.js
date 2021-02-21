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

    rotate(degrees, origin){
        var x = origin[0];
        var y = origin[1];
        this.move([-x,-y]);
        print(this.points);
        this.points =  rotate_at_origin(this.points, degrees);
        this.move([x, y]);
        //this.points =  rotate_at_origin(this.points, degrees);
        //this.move([x, y]);
    }

    move(xy){
        this.points = move_object(this.points, xy);
    }
}

class Curve extends Drawing{
    constructor(points){
        super(this.points);
    }
}