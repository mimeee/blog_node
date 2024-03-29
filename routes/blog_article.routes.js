var express = require('express');
var BlogTagRouter = express.Router();
const formidable = require('formidable');
const path = require('path');
const readFile = require('@root/libs/readFile');
const md2html = require('@root/libs/md2html');

const newAndSave = require('@root/proxy/blog_article_proxy').newAndSave;
const getCount = require('@root/proxy/blog_article_proxy').getCount;
const getList = require('@root/proxy/blog_article_proxy').getList;
const getArticleById = require('@root/proxy/blog_article_proxy').getArticleById;
const updated = require('@root/proxy/blog_article_proxy').updated;
const deleteArticle = require('@root/proxy/blog_article_proxy').deleteArticle;

const PARAMS = require('@root/config/blog_article_config.js');
// const updated = require('@root/proxy/blog_article_proxy').updated;

const routePath = '/article';
const htmlPath = `${routePath}/html/:id`;

BlogTagRouter.post(routePath, async function (req, res) {
    const form = formidable({
        multiples: true
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        if (fields.title === undefined) {
            res.status(500).send('Params Error');
            return;
        }
        if (files.markdownFile === undefined) {
            res.status(500).send('File Error');
            return;
        }
        try {
            let result = await newAndSave({
                title: fields.title,
                tag: fields.tag || "",
                desc: fields.desc || "",
                markdownFile: {
                    path: files.markdownFile.path,
                    extname: path.extname(files.markdownFile.name).slice(1)
                }
            });
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


BlogTagRouter.get(`${routePath}`, async function(req, res) {
    let r = {};

    let start = Number(req.query.start) || 0;
    let len = Number(req.query.len) || 10;
    let tag = req.query.tag || "";
    let title = req.query.title || "";

    r.list = await getList(start * len, len, tag, title);
    r.total = await getCount();
    r.getArticlePath = "/blog" + htmlPath;
    res.send(r);
    res.end();
});

BlogTagRouter.get(`${routePath}/:id`, async function (req, res) {
    if (isNaN(req.params.id)) {
        res.status(500).send('Param Error');
    }
    res.json(JSON.parse(JSON.stringify(await getArticleById(Number(req.params.id))))[0]);
    res.end();
});

BlogTagRouter.get(htmlPath, async function (req, res) {
    if (isNaN(req.params.id)) {
        res.status(500).send('Param Error');
    }
    let item = JSON.parse(JSON.stringify(await getArticleById(Number(req.params.id))));
    let filePath = PARAMS.UPLOAD_FILE_PATH + '/' + item[0].file;
    let html = readFile(filePath);
    // let html = await md2html(filePath);
    res.setHeader('Content-Type','text/html');
    res.send(html.toString());
    res.end();
});

BlogTagRouter.put(`${routePath}/:id`, async function(req, res) {
    if (isNaN(req.params.id)) {
        res.status(500).send('Param Error');
    }
    const form = formidable({
        multiples: true
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json(err);
            return;
        }

        let o = {};
        if (files.markdownFile) {
            o.markdownFile = {
                path: files.markdownFile.path,
                extname: path.extname(files.markdownFile.name).slice(1)
            }
        }
        if (fields.title) {
            o.title = fields.title;
        }
        if (fields.tag) {
            o.tag = fields.tag;
        }
        if (fields.desc) {
            o.desc = fields.desc;
        }
        o.id = req.params.id;
        try {
            let r = await updated(o);
            res.send({errno: r ? 0 : 1, msg: r ? 'ok' : 'fail'});
        } catch(err) {
            res.status(500).send('Upload Error');
        }
    });
});

BlogTagRouter.delete(`${routePath}/:id`, async function(req, res) {
    let id = req.query.id;
    if (!id) {
        res.send({errno: 1, msg: 'fail'});
        res.end();
    }
    let r = await deleteArticle(Number(id));
    r = !(r.affectedRows === 0);
    res.send({errno: r ? 0 : 1, msg: r ? 'ok' : 'fail'});
    res.end();
});




module.exports = BlogTagRouter;