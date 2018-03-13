const fs = require('fs-extra')
const path = require("path");
const handlebars = require('handlebars');

exports.run = function (jsonFile = '../package.json') {
    const json = require(jsonFile);
    let tpl = `${__dirname}/template/module/`;
    deepCopy(tpl, json);
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
    let newPath = path.replace(__dirname + '/template/module', '');
    if (file.indexOf('.html') > -1 || file.indexOf('.xml') > -1 || file.indexOf('.php') > -1) {
        dest = `./${params.name}/${params.version}${newPath}${dest}`;
    } else {
        dest = `./${params.name}/${params.version}${newPath}${dest}.php`;
    }
    fs.stat(file, (err, stat) => {
        if (err) {
            return console.log(err);
        }
        if (stat.isFile()) {
            fs.copy(file, dest, () => {
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
            });
        } else {
            deepCopy(file + '/', params, file)
        }
    });
}
