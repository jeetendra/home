const matrix = [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 1, 0]
]

function rotateMatrixCw(matrix) {
    let rotatedMatrix = matrix[0].map((_, index) => matrix.map(row => row[index]));
    return rotatedMatrix.map(row => row.reverse());
}


function rotateMatrixAcw(matrix) {
    let rotatedMatrix = matrix[0].map((_, index) => matrix.map(row => row[index])).reverse();
    return rotatedMatrix;
}

console.log("Original Matrix:");
console.table(matrix);  
console.log("Rotated Matrix Clockwise:");
console.table(rotateMatrixCw(matrix));
console.log("Rotated Matrix Anti-Clockwise:");
console.table(rotateMatrixAcw(matrix));