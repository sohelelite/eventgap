'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    TicketType  = mongoose.model('TicketType'),
    _           = require('lodash');

/**
 * Find article by id
 */
exports.ticketType = function(req, res, next, id) {
    TicketType.load(id, function(err, ticketType) {
        if (err) return next(err);
        if (!ticketType) return next(new Error('Failed to load ticketType ' + id));
        req.ticketType = ticketType;
        next();
    });
};

/**
 * Create TicketType
 */
exports.create = function(req, res) {
    var ticketType = new TicketType(req.body);

    ticketType.save(function(err) {
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
        res.jsonp(ticketType);
    });
};

/**
 * Update an ticketType
 */
exports.update = function(req, res) {
    var ticketType = req.ticketType;

    ticketType = _.extend(ticketType, req.body);

    ticketType.save(function(err) {
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
        res.jsonp(ticketType);
    });
};

/**
 * Show an ticketType
 */
exports.show = function(req, res) {
    res.jsonp(req.ticketType);
};

/**
 * List of TicketType
 */
exports.all = function(req, res) {
    TicketType.find().exec(function(err, ticketType) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the ticketType'
            });
        }
        res.jsonp(ticketType);
    });
};