const db = require('./base_model')();
const writeLog = require('@root/libs/writeLog');

class BlogArticleTagModel {
    add(p) {
        if (typeof p !== 'object' || p === null) {
            writeLog('mysql', `blog_article_tag table insert fail; invalid parameter: typeof p === ${typeof p};`);
            return false;
        } else {
            if (!(p instanceof Array)) { p = [p]}
        }
        let sql = `INSERT INTO blog_article_tag (title) VALUES `;
        for (let i in p) {
            if (!p[i].title) {
                writeLog('mysql', `blog_article_tag table insert fail; invalid parameter; ${JSON.stringify(p)}`);
                return false;
            }
        }
        sql += p.map((o, i) => {
            let t = new Date().valueOf();
            return `("${o.title}")`
        }).join(',') + ';';
        
        return db.sql(sql);
    }

    select() {
        let sql = `SELECT id, title FROM blog_article_tag`;
        return db.sql(sql);
    }

    updated({title, id}) {
        if (!title || !id) {
            writeLog('mysql', `title or id is invaild`);
            return false;
        }
        let sql = `UPDATE blog_article_tag SET title="${title}" WHERE id=${id};`;
        return db.sql(sql);
    }

    count() {
        let sql = `select count(id) as total FROM blog_article_tag`;
        return db.sql(sql);
    }
}


module.exports = new BlogArticleTagModel();