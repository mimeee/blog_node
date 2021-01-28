const path = require('path');
const CONFIG = require('@root/config/config.json');

module.exports = {
    "UPLOAD_FILE_PATH": path.join(getRootDir(), '/', CONFIG.uploadFilename, '/practiceCss/'),
    "HTML_FILE_PATH": "/css/html/:id",
    "PICTURE_HOST": "https://i.loli.net"
}

function getRootDir () {
    const p = __dirname;
    return p.split(CONFIG.rootFilename)[0] + CONFIG.rootFilename;
}
