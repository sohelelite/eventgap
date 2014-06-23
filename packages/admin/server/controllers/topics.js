'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Topic       = mongoose.model('Topic'),
    _           = require('lodash');

/**
 * Find topic by id
 */
exports.topic = function(req, res, next, id) {
    Topic.load(id, function(err, topic) {
        if (err) return next(err);
        if (!topic) return next(new Error('Failed to load topic ' + id));
        req.topic = topic;
        next();
    });
};

/**
 * Create Topic
 */
exports.create = function(req, res) {
    var topic = new Topic(req.body);

    topic.save(function(err) {
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
        res.jsonp(topic);
    });
};

/**
 * Update a topic
 */
exports.update = function(req, res) {
    var topic = req.topic;

    topic = _.extend(topic, req.body);

    topic.save(function(err) {
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
        res.jsonp(topic);
    });
};

/**
 * Show topic
 */
exports.show = function(req, res) {
    res.jsonp(req.topic);
};

/**
 * List of Topic
 */
exports.all = function(req, res) {
    Topic.find().exec(function(err, topic) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the topic'
            });
        }
        res.jsonp(topic);
    });
};

