const BlogArticleModel = require('@root/models/index').BlogArticleModel;
const mkdir = require('@root/libs/mkdir');
const getDate = require('@root/libs/getDate');
const randomString = require('@root/libs/randomString');

const moveFile = require('@root/libs/moveFile');
const PARAMS = require('@root/config/blog_article_config.js');

/**
 * 创建并保存一条记录
 * @param {String} title 文件标题
 * @param {Number} tag 文件类型
 * @param {String} markdownFile 上传文件的信息
 * @return {Promise}
 */
exports.newAndSave = async function ({title, tag, markdownFile}) {
    if (title.length === 0) {
      return new Promise(resolve => resolve([]));
    }
    let oFile = parsePath(PARAMS.UPLOAD_FILE_PATH, markdownFile.extname);
    let result = await BlogArticleModel.add({title, tag, file: oFile.relativePath});
    try {
        await moveFile(markdownFile.path, oFile.absolutePath);
        return result;
    }catch(err){
        BlogArticleModel.delete({id: result.insertId})
        throw err;
    }
};

/**
 * 更新一条记录
 * @param {String} title 文件标题
 * @param {Number} tag 文件类型
 * @param {String} markdownFile 上传文件的信息
 * @return {Promise}
 */
exports.updated = async function ({title, tag, markdownFile, id}) {
    if (title.length === 0) {
      return new Promise(resolve => resolve([]));
    }
    let o = {};
    let oFile;
    if (markdownFile) {
        oFile = parsePath(PARAMS.UPLOAD_FILE_PATH, markdownFile.extname);
        o.file = oFile.relativePath;
    }
    if (title) {
        o.title = title;
    }
    if (tag) {
        o.tag = tag;
    }
    if (Object.keys(o).length === 0) {
        return false;
    }
    o.id = id;
    let result = await BlogArticleModel.updated(o);
    try {
        if (markdownFile) {
            await moveFile(markdownFile.path, oFile.absolutePath);
        }
        return result.affectedRows === 1;
    }catch(err){
        BlogArticleModel.delete({id: result.insertId})
        throw err;
    }
};

/**
 * 返回n条记录
 * @param {Number} start 从第几条记录开始
 * @param {Number} len  一共返回几条数据
 * @return {Promise}
 */
exports.getList = function (start, len) {
    start = Number(start) || 0;
    len = Number(len) || 10;
    return BlogArticleModel.select({start, end: len});
};

/**
 * 获取总共条数
 * @return {Promise}
 */
exports.getCount = async function () {
    return JSON.parse(JSON.stringify(await BlogArticleModel.count()))[0].total;
};

/**
 * 删除记录
 * @param {Number} id 
 * @return {Promise}
 */
exports.deleteArticle = function (id) {
    if (typeof id !== "number") return false;
    return BlogArticleModel.delete({id: id});
};

/**
 * 删除记录
 * @param {Number} id 
 * @return {Promise}
 */
exports.getArticleById = function (id) {
    if (typeof id !== "number") return false;
    return BlogArticleModel.where(`id=${id}`);
};


function parsePath(rootDir, extname) {
    let date = getDate("yy-MM-dd");
    let r = randomString(16);
	rootDir = rootDir + '/' + date;
	mkdir(rootDir);
    return {
        absolutePath: rootDir + '/' + r + '.' + extname,
        relativePath: '/' + date + '/' + r + '.' + extname
    };
}