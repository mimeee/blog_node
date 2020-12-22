var express = require('express');
var blogCssRouter = express.Router();

const newAndSave = require('@root/proxy/blog_css_proxy').newAndSave;
const getCssRecords = require('@root/proxy/blog_css_proxy').getCssRecords;
const delCssRecord = require('@root/proxy/blog_css_proxy').delCssRecord;

blogCssRouter.get('/css', async function(req, res) {
    res.send( await getCssRecords(req.query.start || 0, req.query.len || 10));
    res.end();
});
blogCssRouter.post('/css', async function(req, res) {
    res.send(await newAndSave('kk', '324'));
    res.end();
});
// blogCssRouter.put('/css', function() {
//     console.log('put');
// });
blogCssRouter.delete('/css', async function(req, res) {
    res.send(await delCssRecord(10));
    res.end();
});

module.exports = blogCssRouter;