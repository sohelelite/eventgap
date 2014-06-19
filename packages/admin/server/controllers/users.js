'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    User        = mongoose.model('User'),
    _           = require('lodash');


/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User.load(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};

/**
 * Create an User
 */
exports.create = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        var errorMsg = '';
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    errorMsg = 'Name already exsits.';
                    break;
                default:
                    errorMsg ='Error occured while processing your request.';
            }
            return res.status(400).send(errorMsg);
        }
        res.jsonp(user);
    });
};

/**
 * Update an User
 */
exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        var errorMsg = '';
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    errorMsg = 'Name already exsits.';
                    break;
                default:
                    errorMsg ='Error occured while processing your request.';
            }
            return res.status(400).send(errorMsg);
        }
        res.jsonp(user);
    });
};

/**
 * Show an user
 */
exports.show = function(req, res) {
    res.jsonp(req.user);
};


/**
 * List of TicketType
 */
exports.all = function(req, res) {
    User.find().exec(function(err, user) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the User'
            });
        }
        res.jsonp(user);
    });
};