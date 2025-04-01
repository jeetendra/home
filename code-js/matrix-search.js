const matrix = [
    [2, 6, 7, 11],
    [3, 8, 10, 12],
    [4, 9, 11, 13],
    [5, 15, 16, 18]
]

function search(n) {
    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === n) {
            return true;
        } else if (matrix[row][col] > n) {
            col--;
        } else {
            row++;
        }
    }
    return false;
}