// 52 ms runtime
const lengthOfLastWord = function(s) {
    if (!s || !s.length) return 0;
    let isInWord = false;
    let skip = 0;
    
    for (let i = 0; i <= s.length; i++) {
        if (isInWord && (s.length - i <= 0 || s[s.length - i - 1] === ' ')) {
            return i - skip;
        }
        
        if (!isInWord && s[s.length - i - 1] !== ' ') {
            isInWord = true;
        } else if (!isInWord) {
            skip++;
        }
    }
    
    return 0;
};
