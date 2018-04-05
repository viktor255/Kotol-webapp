var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var TimeConfig = require('../models/timeConfig');

router.get('/', function(req, res, next){
   TimeConfig.find()
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
    var timeConfig = new TimeConfig ({
        time: req.body.time,
        temperature: req.body.temperature
    });
    timeConfig.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved timeConfig',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    TimeConfig.findById(req.params.id, function (err, timeConfig) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!timeConfig) {
            return res.status(500).json({
                title: 'No TimeConfig Found!',
                error: {message: 'TimeConfig not found'}
            });
        }
        timeConfig.time = req.body.time;
        timeConfig.temperature = req.body.temperature;
        timeConfig.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated timeConfig',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    TimeConfig.findById(req.params.id, function(err, timeConfig) {
        if (err)
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        if (!timeConfig) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        timeConfig.remove(function(err, result) {
            if (err)
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            res.status(200).json({
                message: 'Deleted timeconfig',
                obj: result
            });
        });
    });
});




module.exports = router;