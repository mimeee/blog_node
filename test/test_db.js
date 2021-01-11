const path = "https://i.loli.net/2021/01/12/WtKTJ8e9FlL4URk.gif";
const fs = require('fs');

let o = getName(path)

fs.mkdirSync(__dirname + '/../uploads/cssBlog/' + o.imageDir);
function getName (path) {
    let o = new URL(path);
    let dir = o.pathname.slice(1).split('/');
    return {
        imageName: dir.pop(),
        imageDir: dir.join('-')
    }
}