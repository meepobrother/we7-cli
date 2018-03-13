const createFile = require('./createFile');
exports.run = function (name, jsonfile) {
    let json = require(jsonfile);
    tplFile = `${json.name}/${json.version}/table/${name}.table.php`;
    createFile.run(tplFile, 'table', { name: name });
}

