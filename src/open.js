const createFile = require('./createFile');
exports.run = function (name, jsonfile) {
    let json = require(jsonfile);
    tplFile = `${json.name}/${json.version}/open/${name}.open.php`;
    createFile.run(tplFile, 'open', { name: name });
}

