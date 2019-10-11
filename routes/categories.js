const express = require('express');
const router = express.Router();
const AppCategoryModel = require('../models/application-category-model');
const utils = require('../utils/utils');

router.get('/', (req, res) => {
    AppCategoryModel.find({}, (err, applications) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(applications)
        }
    })
});


router.post('/add', (req, res) => {
    AppCategoryModel.create({
        text: req.body.name,
        value: utils.getSequenceValue('categoryValue')
    }, (err) => {
        if (err) {
            console.warn(err.message);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});


router.post('/edit', (req, res) => {
    AppCategoryModel.updateOne(
        {
            _id: req.body.id,
        },
        {
            text: req.body.text,
        }, (err) => {
            if (err) {
                console.warn(err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
});

router.post('/delete', (req, res) => {
    AppCategoryModel.deleteOne({
        _id: req.body.id,
    }, (err) => {
        if (err) {
            console.warn(err.message);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
