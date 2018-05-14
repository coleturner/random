/**
 52ms runtime - an overoptimized version that attempts to optimize at which point it begins seeking.
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */

const rotateString = function(A, B) {
    if (A === B) return true;
    if (A.length !== B.length) return false;
    
    let baseChars = Math.floor(Math.log(A.length));
    while(baseChars > 0) {
        const index = B.indexOf(A.substring(0, baseChars));
        
        if (~index) {
            return rotateStringAt(A, B, index);
        }
        
        baseChars--;
    }
    
    return rotateStringAt(A, B);
}

const rotateStringAt = function(A, B, startAt = 0) {
    
    const haystack = B.split('');
    const needle = A.split('');
    
    let seeking = -1;
    
    const iterationIndexes = [];
    let iteration = -1;
    
    for (let i = startAt; i < haystack.length; i++) {
        // If we're seeing and seeing a direct match, continue
        if (seeking !== -1) {
            if (needle[seeking] === haystack[i]) {
                if (seeking < needle.length -1) {
                    seeking++;
                } else {
                    break;
                }
            } else {
                
                // Found a mismatch, try an alternative path
                if (iterationIndexes.length && iteration < iterationIndexes.length) {
                    i = iterationIndexes[iteration];
                    seeking = 1;
                    iteration++;
                    continue;
                }

                // Else we know there's nothing left
                return false;
            }
        } else {
            const matchesCurrentIndex = needle[0] === haystack[i];
            const matchesSequential = matchesCurrentIndex && (i <= haystack.length - 2 && needle[1] === haystack[i + 1]);
            const matchesFragment = matchesCurrentIndex && (i === haystack.length - 1 && needle[1] === haystack[0]);

            if(matchesSequential || matchesFragment) {
                if (seeking !== -1 && i > iterationIndexes[iterationIndexes.length -1]) {
                    iterationIndexes.push(i);
                } else {
                    // We've found a precursory match
                    seeking = 1;
                }
            }
        }
        
        if (i >= haystack.length - 1) {
            if (seeking !== -1) {
                i = -1;
            } else {
                return false;
            }
        }
    }
    
    return seeking !== -1;
};
