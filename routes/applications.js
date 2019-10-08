const express = require('express');
const router = express.Router();
const AppModel = require('../models/application-model');
const getByteArray = require('../utils/utils');

router.get('/', (req, res) => {
    const filter = req.query.category ? { category: req.query.category } : {};
    AppModel.find(filter, (err, applications) => {
        if (err) {
            console.warn(err.message);
            res.sendStatus(500);
        } else {
            for (let i = 0; i < applications.length; i++) {
                applications[i] = applications[i].toObject();
                applications[i].icon = getByteArray('icons/' + applications[i].icon);
            }
            // console.log(applications);
            res.send(applications);
        }
    });
});

module.exports = router;
