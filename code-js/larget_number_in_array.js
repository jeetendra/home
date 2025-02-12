import assert from 'assert';

function largestNumberInArray(arr) {
    // let max = arr[0];
    // for (let i = 1; i < arr.length; i++) {
    //     if (arr[i] > max) {
    //     max = arr[i];
    //     }
    // }
    // return max;

    // return Math.max(...arr);

    return arr.reduce((max, val) => val > max ? val : max);
}

assert.strictEqual(largestNumberInArray([1, 2, 3, 4, 5]), 5, "5 is the largest number in the array");
console.log(largestNumberInArray([1, 2, 3, 4, 5]));