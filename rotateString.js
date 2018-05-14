/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
const rotateString = function(needle, haystack, startAt=0) {
    if (needle === haystack) return true;
    if (needle.length !== haystack.length) return false
   
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
