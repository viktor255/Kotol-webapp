var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Boost = require('../models/boost');
var BoostConfig = require('../models/boostConfig');


router.get('/', function (req, res, next) {
    BoostConfig.findOne()
        .exec(function (err, result) {
            if (err)
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            var durationInMin = result.duration;
            var duration = Date.now() - durationInMin * 60 * 1000;
            Boost.findOne({time: {$gt: duration}})
                .sort({time: 'desc'})
                .exec(function (err, boost) {
                    if (err)
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    if (!boost) {
                        return res.status(200).json({
                            title: 'No Boost Found!',
                            obj: null
                        });
                    }
                    res.status(200).json({
                        message: 'Success',
                        obj: boost
                    });
                });
        });
});

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

router.post('/', function (req, res, next) {
    var boost = new Boost({
        time: req.body.time,
        duration: req.body.duration,
        temperature: req.body.temperature,
        author: req.body.author
    });
    boost.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved boost',
            obj: result
        });
    });
});

router.delete('/:id', function (req, res, next) {
    Boost.findById(req.params.id, function (err, boost) {
        if (err)
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        if (!boost) {
            return res.status(500).json({
                title: 'No Boost Found!',
                error: {message: 'Boost not found'}
            });
        }
        boost.remove(function (err, result) {
            if (err)
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            Boost.findOne()
                .sort({time: 'desc'})
                .exec(function (err, result) {
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
    });
});


module.exports = router;
