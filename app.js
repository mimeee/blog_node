// //-----------------------------设置@为根目录-------------------------
require('module-alias/register')
// //-----------------------------加载一些依赖库-------------------------
// // var createError = require('http-errors');
// var express = require('express');
// // var path = require('path');
// // var cookieParser = require('cookie-parser');
// // var logger = require('morgan');
// // var favicon = require('serve-favicon');//这里是设置图标

// //-----------------------------生成express实例-------------------------
// var app = express();
// //---------------------------替换默认的视图模板----------------------------
// /**
//  * 设置views文件夹伪存放视图文件的目录，即存放模板文件的目录
//  * __dirname为全局变量，存储当前执行的脚步所在目录
//  */
// // app.set('views', path.join(__dirname, 'views'));
// //设置视图的模板引擎为jade
// // app.set('view engine', 'jade');
// // 模版引擎替换成html
// // var ejs = require('ejs');
// // app.engine('html', ejs.__express);
// // app.set('view engine', 'html');


// //---------------------------默认设置---------------------------
// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //标签栏图标
// // app.use(logger('dev')); //加载日志中间件
// // app.use(express.json()); //加载解析json的中间件
// //加载解析urlencoded请求体的中间件
// // app.use(express.urlencoded({
// //   extended: false
// // }));
// // app.use(cookieParser()); //加载解析cookie的中间件
// // app.use(express.static(path.join(__dirname, 'public'))); //设置public文件夹为存放静态文件的目录

// //---------------------------设置跨域请求---------------------------
// // app.all('*', function (req, res, next) {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
// //   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// //   res.header("X-Powered-By", ' 3.2.1')
// //   res.header("Content-Type", "application/json;charset=utf-8");
// //   next();
// // });

// //---------------------------设置路由---------------------------
// // 设置接口api
// // app.use('/api/test', require('./routes/test'));
// // app.use('/api/hello', require('./routes/hello'));

// /**
//  * 捕获404错误，并转发到错误处理器
//  */
// // app.use(function (req, res, next) {
// //   next(createError(404));
// // });

// /**
//  * 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
//  */
// // app.use(function (err, req, res, next) {
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   res.status(err.status || 500);
// //   res.render('error');
// // });

// //---------------------------导出app实例供其他模块调用---------------------------
// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4200;

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/blog', require('./routes/blog_css.routes'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
