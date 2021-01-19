const fs = require('fs');
const marked = require('marked');
const hljs = require('highlight.js');

/**
 * 将md转化成html
 * @param {string} filePath 文件路径
 * @return {Promise}
 */
function run(filePath) {
    return new Promise((resolve, reject) => {
        const cs = fs.createReadStream(filePath);
        let data = '';
        cs.on("data", chunk => {
            data += chunk;
        })
        cs.on("end", () => {
            resolve(m(data));
        })
        cs.on("error", (error) => {
            reject(error);
        })
    })
}

/**
 * 
 * @param {binary} fileStream 读取文件的二进制流
 * @param {Object} option 相关参数配置，文档：https://marked.js.org/;
 */
function m (fileStream, option) {
    option = Object.assign({
        renderer: new marked.Renderer(),
        highlight: function (code, language) {
            hljs.configure({
                tabReplace: '    ', // 4 spaces
                classPrefix: 'mm-' // don't append class prefix
                // … other options aren't changed
            });
            return hljs.highlightAuto(code).value
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    }, option || {});
    marked.setOptions(option);

    let html = marked(fileStream);
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link href="http://mimee.top/libs/markdown.min.css" rel="stylesheet">
</head>
<body class="markdown-body">
  ${html}
</body>
</html>
    `;
}



module.exports = run;