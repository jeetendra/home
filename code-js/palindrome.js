import assert from 'assert';

function palindrome(str) {
  // remove all non-alphanumeric characters
  str = str.replace(/[\W_]/g, '').toLowerCase();
  // compare the string with its reverse
//   return str === str.split('').reverse().join('');

  for(let i = 0; i < str.length / 2; i++) {
    if(str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

assert.strictEqual(palindrome("abba"), true, "abba is a palindrome");
console.log(palindrome("abba"));

assert.strictEqual(palindrome("abca"), false, "abca is not a palindrome");
console.log(palindrome("abca"));

assert.strictEqual(palindrome("abcba"), true, "abcba is a palindrome");
console.log(palindrome("abcba"));