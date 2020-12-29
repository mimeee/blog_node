const fs = require('fs');
/**
 * 
 * @param {string} path 目标文件地址
 * @param {string} dest_path 移动地址
 */
function m(path, dest_path) {
    return new Promise ((resovle, reject) => {
        fs.readFile( path, function (err, data) {
            if (err) {
                reject(err);
            } else {
                fs.writeFile(dest_path, data, function (err) {
                    if( err ){
                        reject(err);
                    }else{
                        resovle({
                            errno: 0,
                            code: 'success'
                        });
                    }
                });
            }
        });
    }); 
}

module.exports = m;
