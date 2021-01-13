const practiceCssModel = require('@root/models/index').practiceCssModel;
const mkdir = require('@root/libs/mkdir');
const moveFile = require('@root/libs/moveFile');
const PARAMS = require('@root/config/practice_css_config.js')

/**
 * 创建并保存一条css练习记录
 * @param {String} title css练习主题
 * @param {String} name css效果展示name图地址
 * @param {String} text css备注
 * @param {String} imageSrc 上传图片临时地址
 * @param {String} htmlSrc 上传html文件临时地址
 * @return {Promise}
 */
exports.newAndSave = async function ({title, image, text}, {imageSrc, htmlSrc}) {
    if (image.length === 0 || title.length ===0) {
      return new Promise(resolve => resolve([]));
    }
    let result = await practiceCssModel.add({title, image, text});
    try {
        let rootDir = PARAMS.UPLOAD_FILE_PATH;
        await moveFile(imageSrc, rootDir + parseImagePath(image, rootDir));
        await moveFile(htmlSrc, rootDir + result.insertId + '.html');
        return result;
    }catch(err){
        practiceCssModel.delete({id: result.insertId})
        throw err;
    }
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
    return practiceCssModel.select({start, end: len});
};

/**
 * 获取总共条数
 * @return {Promise}
 */
exports.getCount = async function () {
    return JSON.parse(JSON.stringify(await practiceCssModel.count()))[0].total;
};


/**
 * 删除记录
 * @param {Number} id 
 * @return {Promise}
 */
exports.delCssRecord = function (id) {
    if (typeof id !== "number") return false;
    return practiceCssModel.delete({id: id});
};


function parseImagePath(path, rootDir) {
    let dir = path.slice(1).split('/');
    let o = {
      imageName: dir.pop(),
      imageDir: dir.join('-')
    };
    let d = rootDir + o.imageDir;
    mkdir(d);
    return o.imageDir + '/' + o.imageName;
}