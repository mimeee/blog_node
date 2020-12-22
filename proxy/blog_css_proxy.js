const BlogCssModel = require('@root/models/index').BlogCssModel;

/**
 * 创建并保存一条css练习记录
 * @param {String} title css练习主题
 * @param {String} gif css效果展示gif图地址
 * @return {Promise}
 */
exports.newAndSave = function (title, gif) {
    if (gif.length === 0 || title.length ===0) {
      return new Promise(resolve => resolve([]));
    }
    return BlogCssModel.add({title, gif});
};


/**
 * 返回n条记录
 * @param {Number} start 从第几条记录开始
 * @param {Number} len  一共返回几条数据
 * @return {Promise}
 */
exports.getCssRecords = function (start, len) {
    start = Number(start) || 0;
    len = Number(len) || 10;
    return BlogCssModel.select({start, end: len});
};


/**
 * 返回n条记录
 * @param {Number} start 从第几条记录开始
 * @param {Number} len  一共返回几条数据
 * @return {Promise}
 */
exports.delCssRecord = function (id) {
    if (typeof id !== "number") return false;
    return BlogCssModel.delete({id: id});
};