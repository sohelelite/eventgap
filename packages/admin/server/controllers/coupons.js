'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Coupon      = mongoose.model('Coupon'),
    _           = require('lodash');

/**
 * Find coupon by id
 */
exports.coupon = function(req, res, next, id) {
    Coupon.load(id, function(err, coupon) {
        if (err) return next(err);
        if (!coupon) return next(new Error('Failed to load coupon ' + id));
        req.coupon = coupon;
        next();
    });
};

/**
 * Create Coupon
 */
exports.create = function(req, res) {
    var coupon = new Coupon(req.body);

    coupon.save(function(err) {
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
        res.jsonp(coupon);
    });
};

/**
 * Update a coupon
 */
exports.update = function(req, res) {
    var coupon = req.coupon;

    coupon = _.extend(coupon, req.body);

    coupon.save(function(err) {
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
        res.jsonp(event);
    });
};
/**
 * Show coupon
 */
exports.show = function(req, res) {
    res.jsonp(req.coupon);
};

/**
 * List of coupon
 */
exports.all = function(req, res) {
    Coupon.find().exec(function(err, coupon) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the coupon'
            });
        }
        res.jsonp(coupon);
    });
};