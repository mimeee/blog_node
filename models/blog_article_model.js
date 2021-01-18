const db = require('./base_model')();
const writeLog = require('@root/libs/writeLog');

class BlogArticleModel {
    add(p) {
        if (typeof p !== 'object' || p === null) {
            writeLog('mysql', `[blog_article] - table insert fail; invalid parameter: typeof p === ${typeof p};`);
            return false;
        } else {
            if (!(p instanceof Array)) { p = [p]}
        }
        let sql = `INSERT INTO blog_article (title, tag, file, created_at, last_modified) VALUES `;
        for (let i in p) {
            if ((!p[i].title) || (!p[i].file)) {
                writeLog('mysql', `[blog_article] - table insert fail; invalid parameter; ${JSON.stringify(p)}`);
                return false;
            }
        }
        sql += p.map((o, i) => {
            let t = new Date().valueOf();
            return `("${o.title}", "${o.tag}", "${o.file}", ${t}, ${t})`
        }).join(',') + ';';
        return db.sql(sql);
    }

    delete(p) {
        if (typeof p.id !== 'number') {
            writeLog('mysql', `[blog_article] - delete fail; invalid parameter id;`);
            return false;
        } 
        let sql = `DELETE FROM blog_article WHERE id=${p.id};`;
        writeLog('mysqlDeleteRecord', `[blog_article] - ${sql}`);
        return db.sql(sql);
    }

    select(p) {
        let sql = `SELECT id,title,tag,file,created_at,last_modified FROM blog_article`;
        if (p && (p.start || p.start == 0)) {
            sql += ` LIMIT ${p.start}` + (p.end ? `, ${p.end}` : ''); 
        }
        sql += ';';
        return db.sql(sql);
    }

    where(condition) {
        if (!condition) return [];
        let sql = `SELECT id,title,tag,file,created_at,last_modified FROM blog_article where ${condition};`;
        return db.sql(sql);
    }

    count() {
        let sql = `select count(id) as total FROM blog_article`;
        return db.sql(sql);
    }

    updated({title, tag, file, id}) {
        if (!id) {
            writeLog('mysql', `[blog_article] - title or id is invaild`);
            return false;
        }
        let sql = "UPDATE blog_article SET ";
        let arr = [];
        title ? arr.push(`title="${title}"`) : "";
        tag ? arr.push(`tag="${tag}"`) : "";
        file ? arr.push(`file="${file}"`) : "";
        if (arr.length === 0) return [];
        arr.push(`last_modified="${new Date().valueOf()}"`)
        sql += arr.join(',');
        sql += ` WHERE id=${id};`;
        return db.sql(sql);
    }
}


module.exports = new BlogArticleModel();