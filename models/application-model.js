const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    icon: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    category: {
        type: Number,
    },
});

const AppModel = mongoose.model('applications', AppSchema);
module.exports = AppModel;
