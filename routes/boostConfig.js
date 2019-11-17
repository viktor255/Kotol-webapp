var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var BoostConfig = require('../models/boostConfig');

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.get('/', function(req, res, next){
    BoostConfig.findOne()
        .exec(function(err, result) {
            if (err)
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
});

router.patch('/:id', function (req, res, next) {
    BoostConfig.findById(req.params.id, function (err, boostConfig) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!boostConfig) {
            return res.status(500).json({
                title: 'No BoostConfig Found!',
                error: {message: 'BoostConfig not found'}
            });
        }
        boostConfig.duration = req.body.duration;
        boostConfig.temperature = req.body.temperature;
        boostConfig.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated boostConfig',
                obj: result
            });
        });
    });
});




module.exports = router;
