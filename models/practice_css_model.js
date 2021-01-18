const db = require('./base_model')();
const writeLog = require('@root/libs/writeLog');

class practiceCssModel {
    add(p) {
        if (typeof p !== 'object' || p === null) {
            writeLog('mysql', `[practice_css] - insert fail; invalid parameter: typeof p === ${typeof p};`);
            return false;
        } else {
            if (!(p instanceof Array)) { p = [p]}
        }
        let sql = `INSERT INTO practice_css (created_at, last_modified, title, image_src, text) VALUES `;
        for (let i in p) {
            if (!(p[i].title) || !(p[i].image)) {
                writeLog('mysql', `[practice_css] - insert fail; invalid parameter; ${JSON.stringify(p)}`);
                return false;
            }
        }
        sql += p.map((o, i) => {
            let t = new Date().valueOf();
            return `(${t}, ${t}, "${o.title}", "${o.image}", "${o.text}")`
        }).join(',') + ';';
        
        return db.sql(sql);
    }

    delete(p) {
        if (typeof p.id !== 'number') {
            writeLog('mysql', `[practice_css] - delete fail; invalid parameter id;`);
            return false;
        } 
        let sql = `DELETE FROM practice_css WHERE id=${p.id};`;
        writeLog('mysqlDeleteRecord', `[practice_css] - ${sql}`);
        return db.sql(sql);
    }

    select(p) {
        let sql = `SELECT id, created_at, last_modified, title, image_src, text FROM practice_css`;
        if (p && (p.start || p.start == 0)) {
            sql += ` LIMIT ${p.start}` + (p.end ? `, ${p.end}` : ''); 
        }
        sql += ';';
        return db.sql(sql);
    }

    count() {
        let sql = `select count(id) as total FROM practice_css`;
        return db.sql(sql);
    }
}


module.exports = new practiceCssModel();