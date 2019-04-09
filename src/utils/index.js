/**
 * Create new object with keys and values picked from obj.
 * @param {Object} obj 
 * @param {Array.<String>} keys
 * @returns {Object}
 */
const pick = (obj, keys) => keys.reduce((acc, key) => {
    if (typeof obj !== 'object') {
        return {};
    }

    if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
    }
    return acc;
}, {});

export {
    pick,
}
