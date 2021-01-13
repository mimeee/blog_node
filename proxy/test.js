require('module-alias/register')
const practiceCssModel = require('@root/models/index').practiceCssModel;
function a(start, len) {
    start = start || -1;
    len = len || 10;
    return practiceCssModel.select({start, end: start + len});
};

a();