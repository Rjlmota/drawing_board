class Drawing{
 constructor(points){
     this.points = points;
     this.pen = new Pen();
 }

 self_draw(){
     return this.points;
 }
}

class Line extends Drawing{
    constructor(points){
        super(points);
    }

    self_draw(){
        return this.points;
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
        print("rotating", degrees, origin)
        var x = origin[0];
        var y = origin[1];
        this.move([-x,-y]);
        //print(this.points);
        print("BEFORE:", this.points)
        this.points =  rotate_at_origin(this.points, degrees);
        print("AFTER:", this.points)
        this.move([x, y]);
        //this.points =  rotate_at_origin(this.points, degrees);
        //this.move([x, y]);
    }

    move(xy){
        let points_copy = copy_by_value(this.points)
        let xy_copy = copy_by_value(xy);
        this.points = move_object(points_copy, xy);
        print("depois")
        print(this.points);
    }
}



class Cube extends Drawing{
    constructor(size, start){
        super([]);
        this.size = size;
        this.start = start;
    }
    base(){
        return this.pen.draw_cube(this.size, this.start);
     }

    self_draw(){
        return this.pen.connect_cube(this.points);
    }

}

class Curve extends Drawing{
    constructor(points){
        super(this.points);
    }
}