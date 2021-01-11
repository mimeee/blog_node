const fs = require('fs');
/**
 * 创建目录
 * @param {string} path 目标文件地址
 */
function m(path) {
    !(fs.existsSync(path)) && fs.mkdirSync(path);
}

module.exports = m;
