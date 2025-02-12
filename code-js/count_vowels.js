import assert from 'assert';

function countVowels(str) {
    let count = 0;
    str = str.toLowerCase();
    for (let char of str) {
        if ('aeiou'.includes(char)) {
            count++;
        }
    }
    return count;
}


assert.strictEqual(countVowels("hello"), 2, "hello has 2 vowels");