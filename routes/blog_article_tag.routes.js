var express = require('express');
var BlogTagRouter = express.Router();
const fs = require('fs');

const newAndSave = require('@root/proxy/blog_article_tag_proxy').newAndSave;
const updated = require('@root/proxy/blog_article_tag_proxy').updated;
const getTags = require('@root/proxy/blog_article_tag_proxy').getTags;
const getCount = require('@root/proxy/blog_article_tag_proxy').getCount;
const PARAMS = require('@root/config/config.json');

const PICTURE_HOST = "https://i.loli.net";
const path = '/blog/article/tags';
BlogTagRouter.get(path, async function (req, res) {
    let r = {};
    r.list = await getTags();
    r.total = await getCount();
    res.send(r);
    res.end();
});
BlogTagRouter.post(path, async function (req, res) {
    if (!req.body.title) {
        res.status(500).send('Params Error');
        return;
    }
    let r = await newAndSave(req.body.title)
    res.json({
        id: r.insertId
    });
    res.end();
});

BlogTagRouter.put(path, async function(req, res) {
    if ((!req.body.title) || (!req.body.id)) {
        res.status(500).send('Params Error');
        return;
    }
    let r = await updated({title: req.body.title, id: req.body.id});
    res.send({errno: r ? 0 : 1, msg: r ? 'ok' : 'fail'});
    res.end();
});




module.exports = BlogTagRouter;