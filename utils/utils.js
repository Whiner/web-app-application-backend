const fs = require('fs');

class Utils {
    getByteArray(filePath) {
        let fileData = fs.readFileSync(filePath).toString('hex');
        let result = [];
        for (let i = 0; i < fileData.length; i += 2)
            result.push('0x' + fileData[i] + '' + fileData[i + 1]);
        return result;
    }

    writeImage(bytes, name) {
        fs.writeFile("./icons/" + name, bytes, err => {
            if(err) {
                throw new Error('Error while writing image');
            }
        });
    }
}

module.exports = new Utils();
