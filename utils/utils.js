const fs = require('fs');

function getByteArray(filePath) {
    let fileData = fs.readFileSync(filePath).toString('hex');
    let result = [];
    for (let i = 0; i < fileData.length; i += 2)
        result.push('0x' + fileData[i] + '' + fileData[i + 1]);
    return result;
}

module.exports = getByteArray;
