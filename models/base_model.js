const writeLog = require('@root/libs/writeLog');

const mysql = require('mysql');
const DB_CONFIG = require('@root/config/db_config.json');

class DB {
    constructor() {
        this.db = null;
    }

    connect() {
        this.db = mysql.createConnection(DB_CONFIG);
        this.db.connect();
    }

    end() {
        this.db.end();
    }

    sql(sql) {
        return new Promise( (resolve, reject) => {
            let that = this;
            that.connect();
            that.db.query(sql,function (err, result) {
                that.end();
                if(err){
                    writeLog('mysql', `[sql] - [${sql}]\n[DB ERROR] - ${err.message}\n\n`)
                    reject(`[DB ERROR] - ${err.message}`);
                }
                resolve(result);
            });
        })
        
    }
}

module.exports = (function () {
    const d = new DB();
    return function (){
        return d;
    }
})();