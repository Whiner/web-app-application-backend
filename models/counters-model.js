const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CountersSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    value: {
        type: Number,
    },
});

const CountersModel = mongoose.model('counters', CountersSchema);
module.exports = CountersModel;
