'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Organizer   = mongoose.model('Organizer'),
    _           = require('lodash');

/**
 * Find organizer by id
 */
exports.organizer = function(req, res, next, id) {
    Organizer.load(id, function(err,organizer) {
        if (err) return next(err);
        if (!organizer) return next(new Error('Failed to load organizer ' + id));
        req.organizer = organizer;
        next();
    });
};

/**
 * Create Organizer
 */
exports.create = function(req, res) {
    var organizer = new Organizer(req.body);

    organizer.save(function(err) {
        var errorMsg = '';
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    errorMsg = 'Name already exsits.';
                    break;
                default:
                    errorMsg =  'Error occured while processing your request.';
            }
            return res.status(400).send(errorMsg);
        }
        res.jsonp(organizer);
    });
};

/**
 * Update a organizer
 */
exports.update = function(req, res) {
    var organizer = req.organizer;

    organizer = _.extend(organizer, req.body);

    organizer.save(function(err) {
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
        res.jsonp(organizer);
    });
};

/**
 * Show organizer
 */
exports.show = function(req, res) {
    res.jsonp(req.organizer);
};

/**
 * List of Organizer
 */
exports.all = function(req, res) {
    Organizer.find().exec(function(err, organizer) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the organizer'
            });
        }
        res.jsonp(organizer);
    });
};

