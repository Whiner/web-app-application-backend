const express = require('express');
const router = express.Router();
const AppModel = require('../models/application-model');

router.get('/', (req, res) => {
    const filter = req.query.category ? { category: req.query.category } : {};
    AppModel.find(filter, (err, applications) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send({ applications: applications });
        }
    });
});

module.exports = router;
