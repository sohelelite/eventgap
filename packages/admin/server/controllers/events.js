'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Event       = mongoose.model('Event'),
    _           = require('lodash');

/**
 * Find event by id
 */
exports.event = function(req, res, next, id) {
    Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));
        req.event = event;
        next();
    });
};

/**
 * Create Event
 */
exports.create = function(req, res) {
    var event = new Event(req.body);

    event.save(function(err) {
        var errorMsg = '';
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    errorMsg = 'Title already exsits.';
                    break;
                default:
                    errorMsg ='Error occured while processing your request.';
            }
            return res.status(400).send(errorMsg);
        }
        res.jsonp(event);
    });
};

/**
 * Update an Event
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(err) {
        var errorMsg = '';
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    errorMsg = 'Title already exsits.';
                    break;
                default:
                    errorMsg ='Error occured while processing your request.';
            }
            return res.status(400).send(errorMsg);
        }
        res.jsonp(event);
    });
};
/**
 * Show an event
 */
exports.show = function(req, res) {
    res.jsonp(req.event);
};

/**
 * List of Events
 */
exports.all = function(req, res) {
    Event.find().exec(function(err, event) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the event'
            });
        }
        res.jsonp(event);
    });
};