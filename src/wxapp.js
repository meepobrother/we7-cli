const fs = require('fs-extra')
const path = require("path");
const handlebars = require('handlebars');

exports.run = function (jsonFile = '../package.json') {
    const json = require(jsonFile);
    let tpl = `${__dirname}/template/wxapp/`;
    deepCopy(tpl, json);
    mkpages(json);
}

function deepCopy(source, params, path) {
    fs.readdir(source, (err, files) => {
        if (err) {
            return console.log(err);
        }
        files.map(file => {
            copyFile(source + file, file, params, source);
        });
    });
}

function copyFile(file, dest, params, path) {
    let newPath = path.replace(__dirname + '/template/wxapp', '');
    if (
        file.indexOf('.html') > -1
        || file.indexOf('.xml') > -1
        || file.indexOf('.php') > -1
        || file.indexOf('.js') > -1
        || file.indexOf('.json') > -1
        || file.indexOf('.wxss') > -1
        || file.indexOf('.png') > -1
        || file.indexOf('.wxml') > -1
    ) {
        dest = `./${params.name}/${params.version}${newPath}${dest}`;
    } else {
        if (isJson(dest)) {
            dest = `./${params.name}/${params.version}${newPath}${dest}.json`;
        } else {
            dest = `./${params.name}/${params.version}${newPath}${dest}.php`;
        }
    }
    fs.stat(file, (err, stat) => {
        if (err) {
            return console.log(err);
        }
        if (stat.isFile()) {
            fs.copy(file, dest, () => {
                if (needCompolier(file)) {
                    fs.readFile(file, 'utf-8', (err, data) => {
                        if (err) {
                            return console.log(err);
                        }
                        const template = handlebars.compile(data);
                        const content = template(params);
                        fs.writeFile(dest, content, (err) => {
                            if (err) {
                                // return console.log(err);
                            }
                        });
                    });
                }
            });
        } else {
            deepCopy(file + '/', params, file)
        }
    });
}

function mkpages(params) {
    let pages = params.pages;
    pages.map(res => {
        var files = [
            `./${params.name}/${params.version}/${params.name}/pages/${res.path}/${res.path}.js`,
            `./${params.name}/${params.version}/${params.name}/pages/${res.path}/${res.path}.json`,
            `./${params.name}/${params.version}/${params.name}/pages/${res.path}/${res.path}.wxml`,
            `./${params.name}/${params.version}/${params.name}/pages/${res.path}/${res.path}.wxss`,
        ];
        // 拷贝文件
        var copy = [
            __dirname + '/template/wxapp/we7/pages/index/index.js',
            __dirname + '/template/wxapp/we7/pages/index/index.json',
            __dirname + '/template/wxapp/we7/pages/index/index.wxml',
            __dirname + '/template/wxapp/we7/pages/index/index.wxss',
        ];
        copy.map((file, index) => {
            fs.copy(file, files[index], (err, data) => {
                // console.log(err,files[index]);
            });
        });

    });
}


function needCompolier(file = '') {
    if (
        file.indexOf('.js') > -1
        || file.indexOf('.wxss') > -1
        || file.indexOf('.png') > -1
        || file.indexOf('.wxml') > -1
        || file.indexOf('.html') > -1
        || file.indexOf('.css') > -1
        || file.indexOf('.js') > -1
    ) {
        return false;
    } else {
        return true;
    }
}

function isJson(file = '') {
    if (
        file === 'app'
    ) {
        return true;
    }
    return false;
}