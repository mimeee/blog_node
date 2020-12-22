require('module-alias/register')
const BlogCssModel = require('@root/models/index').BlogCssModel;
function a(start, len) {
    start = start || -1;
    len = len || 10;
    return BlogCssModel.select({start, end: start + len});
};

a();