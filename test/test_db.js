var http = require('http');
const db = require("../models/base_model")();


// http server 例子
var server = http.createServer(function(req, res){
    var url = res.url;
    db.sql("select * from blog_css").then(d => {
        res.end(JSON.stringify(d));
    })
    
});

server.listen(4200);