const fs = require('fs');
const CountersModel = require('../models/counters-model');

class Utils {
    getByteArray(filePath) {
        let fileData = fs.readFileSync(filePath).toString('hex');
        let result = [];
        for (let i = 0; i < fileData.length; i += 2)
            result.push('0x' + fileData[i] + '' + fileData[i + 1]);
        return result;
    }

    writeImage(bytes, name) {
        fs.writeFile('./icons/' + name, bytes, err => {
            if (err) {
                throw new Error('Error while writing image');
            }
        });
    }

    async getSequenceValue(sequenceName) {
        const query = await CountersModel.findOneAndUpdate(
            { id: sequenceName },
            { $inc: { value: 1 } },
            { new: true }
        ).exec();
        return query.value;
    }

    deleteIcon(name) {
        fs.unlink('./icons/' + name, err => console.warn('Icon ' + name + ' was not remove'))
    }
}

module.exports = new Utils();
