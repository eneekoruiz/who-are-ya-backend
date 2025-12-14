module.exports = function match(text, pattern) {
    const index = text.toLowerCase().indexOf(pattern.toLowerCase());
    if (index === -1) return null;
    return {
        index: index,
        length: pattern.length
    };
};
