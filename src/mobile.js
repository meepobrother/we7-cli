const createFile = require('./createFile');
exports.run = function (name, jsonfile) {
    let json = require('' + jsonfile);
    tplFile = `${json.name}/${json.version}/inc/mobile/${name}.inc.php`;
    createFile.run(tplFile, 'mobile', { name: name });
}
