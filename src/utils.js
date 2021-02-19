function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

function round_matrix(matrix){
    for (var i = 0; i <matrix.length; i++){
        for (var j = 0; j<matrix[0].length; j++){
            matrix[i][j] = Math.round(matrix[i][j]);
        }
    }
    return matrix;
}

function rotate_at_origin(object, angle){
    sin = Math.sin(toRadians(angle));
    cos = Math.cos(toRadians(angle));

    print(sin);
    print(cos);

    object.push([1, 1, 1, 1]);

    let matrix=[[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]]

    a =  multiply(object, matrix);
    a = round_matrix(a);
    print("ARREDONDADA", a);
    return round_matrix(a);
}

//https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
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
  }

  
function product(arr, n){
  for(var i=0;i<arr.length; i++){
    arr[i] = arr[i]*n;
  }
  return arr;
}

