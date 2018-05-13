```js
/**
 * Tracks repeated characters with a O(n) runtime and O(2n) = O(n) space complexity
 * Uses an object to track position of characters within a given set and breaks out of
 * the O(n) runtime if the currently tracked set cannot be any longer.
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
    let charMap = {};
    let charCount = 0;
    let cutIndex = -1;
    let maxSize = 0
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (charMap.hasOwnProperty(char) && charMap[char] >= cutIndex) {
            maxSize = Math.max(maxSize, charCount);
            charCount -= charMap[char] - Math.max(cutIndex, 0) + 1;
            cutIndex = charMap[char] + 1;
        }
        
        charCount++;
        charMap[char] = i;
        
        if (s.length - i + charCount < maxSize) {
            break;
        }
    }
    
    return Math.max(maxSize, charCount);
};
