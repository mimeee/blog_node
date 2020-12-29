var express = require('express');
var blogCssRouter = express.Router();
const formidable = require('formidable');

const newAndSave = require('@root/proxy/blog_css_proxy').newAndSave;
const getCssRecords = require('@root/proxy/blog_css_proxy').getCssRecords;
const delCssRecord = require('@root/proxy/blog_css_proxy').delCssRecord;
const PARAMS = require('@root/config/config.json');

blogCssRouter.get('/css', async function (req, res) {
    let r = {};
    r.list = await getCssRecords(req.query.start || 0, req.query.len || 10);
    r.htmlHost = PARAMS.host + ':2000';
    r.pictureHost = PARAMS.host + ':2001';
    res.send(r);
    res.end();
});
blogCssRouter.post('/css', async function (req, res) {
    const form = formidable({
        multiples: true
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        if (fields.title === undefined || fields.name === undefined) {
            res.status(500).send('Params Error');
            return;
        }
        if (files.file === undefined) {
            res.status(500).send('File Error');
            return;
        }
        
        try {
            let result = await newAndSave(fields.title, fields.name, files.file);
            res.json({
                id: result.insertId
            });
            res.end();
        } catch(err) {
            res.status(500).send('Upload Error');
        }
    });
});
// blogCssRouter.put('/css', function() {
//     console.log('put');
// });
blogCssRouter.delete('/css', async function (req, res) {
    if (req.body.id === undefined) {
        res.status(500).send('Params Error');
        return;
    }

    let result = await delCssRecord(req.body.id);
    res.json({
        code: result.affectedRows === 1 ? 0 : 1,
        msg: result.affectedRows === 1 ? 'success' : 'fail'
    });
    res.end();
});

module.exports = blogCssRouter;