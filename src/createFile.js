const fs = require('fs-extra')
const path = require("path");
const handlebars = require('handlebars');

exports.run = function (pageFile, type, params) {
    let tpl = `${__dirname}/template/${type}`;
    fs.copy(tpl, pageFile, () => {
        fs.readFile(tpl, 'utf-8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const template = handlebars.compile(data);
            const content = template(params);
            fs.writeFile(pageFile, content, (err) => {
                if (err) {
                    // return console.log(err);
                }
            });
        });
    });
}

function ucfirst(str) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}