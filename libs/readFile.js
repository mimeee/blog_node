const fs = require('fs');

function readFile(path, options) {
    let o = {};
    if (options) {
      o = Object.assign(o, options);
    }
    return fs.readFileSync(path, o);
}

module.exports = readFile;