const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppCategorySchema = new Schema({
    text: {
        type: String,
        unique: true,
    },
    value: {
        type: Number,
        unique: true,
    },
});

const AppCategoryModel = mongoose.model('application-categories', AppCategorySchema);
module.exports = AppCategoryModel;
