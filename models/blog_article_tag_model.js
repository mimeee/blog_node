const db = require('./base_model')();
const writeLog = require('@root/libs/writeLog');

class BlogArticleTagModel {
    add(p) {
        if (typeof p !== 'object' || p === null) {
            writeLog('mysql', `[blog_article_tag] - insert fail; invalid parameter: typeof p === ${typeof p};`);
            return false;
        } else {
            if (!(p instanceof Array)) { p = [p]}
        }
        let sql = `INSERT INTO blog_article_tag (name) VALUES `;
        for (let i in p) {
            if (!p[i].title) {
                writeLog('mysql', `[blog_article_tag] - insert fail; invalid parameter; ${JSON.stringify(p)}`);
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
        let sql = `SELECT id, name FROM blog_article_tag`;
        return db.sql(sql);
    }

    where(name) {
        let sql = `SELECT id, name FROM blog_article_tag WHERE name="${name}"`;
        return db.sql(sql);
    }

    updated({title, id}) {
        if (!title || !id) {
            writeLog('mysql', `[blog_article_tag] - name or id is invaild`);
            return false;
        }
        let sql = `UPDATE blog_article_tag SET name="${title}" WHERE id=${id};`;
        return db.sql(sql);
    }

    delete(p) {
        if (typeof p.id !== 'number') {
            writeLog('mysql', `[blog_article_tag] - delete fail; invalid parameter id;`);
            return false;
        } 
        let sql = `DELETE FROM blog_article_tag WHERE id=${p.id};`;
        writeLog('mysqlDeleteRecord', `[blog_article_tag] - ${sql}`);
        return db.sql(sql);
    }

    count() {
        let sql = `select count(id) as total FROM blog_article_tag`;
        return db.sql(sql);
    }
}

module.exports = new BlogArticleTagModel();