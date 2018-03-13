const createFile = require('./createFile');
exports.run = function (name, jsonfile) {
    let json = require(jsonfile);
    tplFile = `${json.name}/${json.version}/inc/web/${name}.inc.php`;
    createFile.run(tplFile, 'web', { name: name });
}

