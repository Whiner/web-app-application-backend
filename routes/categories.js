const express = require('express');
const router = express.Router();
const AppCategoryModel = require('../models/application-category-model');

router.get('/', (req, res) => {
    AppCategoryModel.find({}, (err, applications) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ applications: applications })
        }
    })
});

module.exports = router;
