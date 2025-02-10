// Given a string, find the length of the longest substring without repeating characters.

// Example 1:   Input: "abcabcbb"   Output: 3

// Example 2:   Input: "bbbbb"   Output: 1

// function lengthOfLongestSubstring(s) {
//     let start = 0;
//     let end = 0;
//     let maxLength = 0;

//     for (let i = 0; i < s.length; i++) {
//         let char = s[i];
//         let index = s.indexOf(char, start);
//         if (index < i) {
//             start = index + 1;
//         }
//         maxLength = Math.max(maxLength, i - start + 1);
//     }
//
//     return maxLength;
// }

function lengthOfLongestSubstring(s) {
  let longest = 0;
  let start = 0;
  let seen = {};

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (seen[char] >= start) {
      start = seen[char] + 1;
    }
    seen[char] = i;
    longest = Math.max(longest, i - start + 1);
  }

  return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
