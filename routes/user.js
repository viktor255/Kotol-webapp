var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign(
            {user: user},
            'secret',
            {expiresIn:'2d'}
        );
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            admin: user.admin
        });
    });
});

router.use('/', function (req, res, next) {
    User.findOne({_id: req.query.userId}, function (err, user) {
        if(user.admin !== 'true') {
            return res.status(401).json({
                title: 'Not admin',
                error: {message: 'To continue you need admin rights'}
            });
        }
    });
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

router.post('/signup', function (req, res, next) {
    var user = new User({
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        admin: req.body.admin
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

module.exports = router;
