const express = require('express');
const router = express.Router();
const AppModel = require('../models/application-model');
const utils = require('../utils/utils');

router.get('/', (req, res) => {
    const filter = req.query.category ? { category: req.query.category } : {};
    AppModel.find(filter, (err, applications) => {
        if (err) {
            console.warn(err.message);
            res.sendStatus(500);
        } else {
            for (let i = 0; i < applications.length; i++) {
                applications[i] = applications[i].toObject();
                applications[i].icon = utils.getByteArray('icons/' + applications[i].icon);
            }
            res.send(applications);
        }
    });
});

router.post('/add', (req, res) => {
    const application = req.body;
    const iconName = application.name.replace(/\s/, '_') + '.png';
    try {
        utils.writeImage(new Uint8Array(application.icon), iconName);
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
    AppModel.create({
        name: application.name,
        description: application.description,
        url: application.url,
        icon: iconName,
        category: application.category,
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
    const application = req.body;
    const iconName = application.name.replace(/\s/, '_') + '.png';
    try {
        utils.writeImage(new Uint8Array(application.icon), iconName);
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
    AppModel.updateOne(
        {
            _id: application.id,
        },
        {
            name: application.name,
            description: application.description,
            url: application.url,
            icon: iconName,
            category: application.category,
        }, (err) => {
            if (err) {
                console.warn(err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
});

router.post('/delete', async (req, res) => {
    const app = AppModel.findById(req.body.id).exec();
    const iconName = (await app).icon;
    utils.deleteIcon(iconName);
    AppModel.deleteOne({
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
