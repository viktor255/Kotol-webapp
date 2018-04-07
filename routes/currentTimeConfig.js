var express = require('express');
var router = express.Router();

var TimeConfig = require('../models/currentTimeConfig');

router.get('/', function(req, res, next){
    TimeConfig.findOne()
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

module.exports = router;