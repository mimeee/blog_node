var express = require('express');
var blogCssRouter = express.Router();
const formidable = require('formidable');
const fs = require('fs');

const newAndSave = require('@root/proxy/blog_css_proxy').newAndSave;
const getCssRecords = require('@root/proxy/blog_css_proxy').getCssRecords;
const delCssRecord = require('@root/proxy/blog_css_proxy').delCssRecord;
const getCount = require('@root/proxy/blog_css_proxy').getCount;
const PARAMS = require('@root/config/config.json');

const PICTURE_HOST = "https://i.loli.net";

blogCssRouter.get('/css', async function (req, res) {
    let r = {};
    let start = Number(req.query.start) || 0;
    let len = Number(req.query.len) || 10;
    r.list = await getCssRecords(start * len, len);
    r.total = await getCount();
    r.htmlHost = "/blog/html/";
    r.pictureHost = PICTURE_HOST;
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
        if (fields.title === undefined || fields.image === undefined) {
            res.status(500).send('Params Error');
            return;
        }
        
        if (files.imageFile === undefined || files.htmlFile === undefined) {
            res.status(500).send('File Error');
            return;
        }
        
        try {
            let result = await newAndSave({
                title: fields.title, 
                image: fields.image.replace(PICTURE_HOST, ""),
                text: fields.text || "",
            }, {imageSrc: files.imageFile.path, htmlSrc: files.htmlFile.path});
            res.json({
                id: result.insertId
            });
            res.end();
        } catch(err) {
            console.log(err);
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

    let result = await delCssRecord(Number(req.body.id));
    res.json({
        code: result.affectedRows === 1 ? 0 : 1,
        msg: result.affectedRows === 1 ? 'success' : 'fail'
    });
    res.end();
});

blogCssRouter.get('/image/:id', async function (req, res) {
    const src = __dirname + '/../' + PARAMS.uploadSrc + '/cssBlog/' + req.params.id + '.gif';
    const cs = fs.createReadStream(src);
    res.setHeader('Content-Type','image/gif')
    cs.on("data", chunk => {
        res.write(chunk);
    })
    cs.on("end", () => {
        res.status(200);
        res.end();
    })
    cs.on("error", () => {
        res.status(500).send('Error');
    })
});
blogCssRouter.get('/html/:id', async function (req, res) {
    const src = __dirname + '/../' + PARAMS.uploadSrc + '/cssBlog/' + req.params.id + '.html';
    const cs = fs.createReadStream(src);
    res.setHeader('Content-Type','text/html')
    cs.on("data", chunk => {
        res.write(chunk);
    })
    cs.on("end", () => {
        res.status(200);
        res.end();
    })
    cs.on("error", () => {
        res.status(500).send('Error');
    })
});



module.exports = blogCssRouter;