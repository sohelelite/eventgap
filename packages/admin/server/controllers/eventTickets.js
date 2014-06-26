'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    EventTicket = mongoose.model('EventTicket'),
    _           = require('lodash');

/**
 * Find event ticket by id
 */
exports.eventTicket = function(req, res, next, id) {
    EventTicket.load(id, function(err, eventTicket) {
        if (err) return next(err);
        if (!eventTicket) return next(new Error('Failed to load event ticket ' + id));
        req.eventTicket = eventTicket;
        next();
    });
};

/**
 * Create Event Ticket
 */
exports.create = function(req, res) {
    var eventTicket = new EventTicket(req.body);

    eventTicket.save(function(err) {
        var errorMsg = 'Error occured while processing your request.';
        if (err)
        {
            console.log(err);
            return res.status(400).send(errorMsg);
        }
        res.jsonp(eventTicket);
    });
};

/**
 * Update an Event Ticket
 */
exports.update = function(req, res) {
    var eventTicket = req.eventTicket;

    eventTicket = _.extend(eventTicket, req.body);

    eventTicket.save(function(err) {
        var errorMsg = 'Error occured while processing your request.';
        if (err)
        {
            console.log(err);
            return res.status(400).send(errorMsg);
        }
        res.jsonp(eventTicket);
    });
};
/**
 * Show an event ticket
 */
exports.show = function(req, res) {
    res.jsonp(req.eventTicket);
};

/**
 * List of Events Ticket
 */
exports.all = function(req, res) {
    EventTicket.find().exec(function(err, eventTicket) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the event Ticket'
            });
        }
        res.jsonp(eventTicket);
    });
};