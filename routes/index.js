const express = require('express');
const router = express.Router();
const AppModel = require('../models/application-model');
const AppCategoryModel = require('../models/application-category-model');

router.get('/applications', (req, res) => {
    AppModel.find({}, (err, applications) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ applications: applications })
        }
    })
});

router.get('/application-categories', (req, res) => {
    AppCategoryModel.find({}, (err, applications) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ applications: applications })
        }
    })
});

module.exports = router;
