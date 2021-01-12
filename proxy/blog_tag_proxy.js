const BlogTagModel = require('@root/models/index').BlogTagModel;

/**
 * 创建并保存一条记录
 * @param {String} title 标签名
 * @return {Promise}
 */
exports.newAndSave = async function (title) {
    if (!title) {
      return new Promise(resolve => resolve([]));
    }
    return await BlogTagModel.add({title});
};

/**
 * 根据id更新一条信息
 * @param {String} id 
 * @param {String} title 标签名
 * @return {Promise}
 */
exports.updated = async function ({title, id}) {
    if (!title || !id) {
      return new Promise(resolve => resolve([]));
    }
    let r = await BlogTagModel.updated({title, id})
    return r.affectedRows === 1;
};

/**
 * 返回全部记录
 * @return {Promise}
 */
exports.getTags = function () {
    return BlogTagModel.select();
};

/**
 * 获取总共条数
 * @return {Promise}
 */
exports.getCount = async function () {
    return JSON.parse(JSON.stringify(await BlogTagModel.count()))[0].total;
};

