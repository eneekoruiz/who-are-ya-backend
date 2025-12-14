const match = require('./match');

module.exports = function parse(text, pattern) {
    const result = match(text, pattern);
    if (!result) return null;

    return {
        before: text.slice(0, result.index),
        match: text.slice(result.index, result.index + result.length),
        after: text.slice(result.index + result.length)
    };
};
