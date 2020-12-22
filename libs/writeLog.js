const writeFile = require('@zhangxunying/jslib/writeFile');
const getDate = require('./getDate');


module.exports = function(filename, error) {
    writeFile(`${__dirname}/../logs/${filename}/${getDate('yy-MM-dd')}`,  `${getDate()}\n${error}\n\n`, {flag: 'a'});
}