const writeLog = require('@root/libs/writeLog');

const mysql = require('mysql');
const DB_CONFIG = require('@root/config/db_config.json');

class DB {
    constructor() {
        this.db = null;
        this.timer = null;
    }

    connect() {
        this.db = mysql.createConnection(DB_CONFIG);
    }

    end() {
        this.db.end();
    }

    sql(sql) {
        return new Promise( (resolve, reject) => {
            let that = this;
            if (that.timer == null) {
                that.delayEndDB();
            }
            that.connect();
            that.db.query(sql,function (err, result) {
                clearTimeout(that.timer);
                that.delayEndDB();
                if(err){
                    writeLog('mysql', `[sql] - [${sql}]\n[DB ERROR] - ${err.message}\n\n`)
                    reject(`[DB ERROR] - ${err.message}`);
                }
                resolve(result);
            });
        })
        
    }

    delayEndDB() {
        this.timer = setTimeout(() => {
            this.timer = null;
            console.log('关闭数据库');
            this.db.end();
        }, 2000);
    }
}

module.exports = (function () {
    const d = new DB();
    return function (){
        return d;
    }
})();