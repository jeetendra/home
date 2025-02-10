

function sumRange(start, end) {
    if (start > end) return 0;  // end is inclusive.
    return start + sumRange(start + 1, end);
}

console.log(sumRange(1, 5));

console.log(sumRange(3, 5));