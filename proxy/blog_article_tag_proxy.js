const BlogArticleTagModel = require('@root/models/index').BlogArticleTagModel;
const BlogArticleModel = require("@root/models/blog_article_model");

/**
 * 创建并保存一条记录
 * @param {String} title 标签名
 * @return {Promise}
 */
exports.newAndSave = async function (title) {
    if (!title) {
      return new Promise(resolve => resolve([]));
    }
    let r = await BlogArticleTagModel.where(title);
    if (r.length === 0) {
      return await BlogArticleTagModel.add({title});
    } else {
      return new Promise(resolve => resolve([]));
    }
};

/**
 * 根据id删除一条记录
 * @param {number} id 
 */
exports.delete = async function (id) {
  if (!Number(id)) {
    return new Promise(resolve => resolve([]));
  }
  let r = await BlogArticleModel.where({tagId: Number(id)});
  if (r.length === 0) {
    return await BlogArticleTagModel.delete({id: Number(id)});
  } else {
    return new Promise(resolve => resolve({affectedRows: 0}));
  }
}

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
    let r = await BlogArticleTagModel.updated({title, id})
    return r.affectedRows === 1;
};

/**
 * 返回全部记录
 * @return {Promise}
 */
exports.getTags = function () {
    return BlogArticleTagModel.select();
};

/**
 * 获取总共条数
 * @return {Promise}
 */
exports.getCount = async function () {
    return JSON.parse(JSON.stringify(await BlogArticleTagModel.count()))[0].total;
};

