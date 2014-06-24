'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Category    = mongoose.model('Category'),
    _           = require('lodash');

/**
 * Find category by id
 */
exports.category = function(req, res, next, id) {
    Category.load(id, function(err, category) {
        if (err) return next(err);
        if (!category) return next(new Error('Failed to load category ' + id));
        req.category = category;
        next();
    });
};

/**
 * Create Category
 */
exports.create = function(req, res) {
    var category = new Category(req.body);
    category.save(function(err) {
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
        res.jsonp(category);
    });
};

/**
 * Update an Category
 */
exports.update = function(req, res) {
    var category = req.category;

    category = _.extend(category, req.body);

    category.save(function(err) {
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
        res.jsonp(category);
    });
};

/**
 * Show an category
 */
exports.show = function(req, res) {
    res.jsonp(req.category);
};

/**
 * List of Category
 */
exports.all = function(req, res) {
    Category.find().exec(function(err, category) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the category'
            });
        }
        res.jsonp(category);
    });
};

/****
 * Get Category By Parent Name
 */
exports.parent = function(req, res) {
    console.log(req.params.parentName);
    Category.find({ 'parent' : req.params.parentName }).exec(function(err, category) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the category'
            });
        }
        res.jsonp(category);
    });
};