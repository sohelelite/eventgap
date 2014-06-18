'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Form        = mongoose.model('Form'),
    _           = require('lodash');

/**
 * Find form by id
 */
exports.form = function(req, res, next, id) {
    Form.load(id, function(err, form) {
        if (err) return next(err);
        if (!form) return next(new Error('Failed to load form ' + id));
        req.form = form;
        next();
    });
};

/**
 * Create a form
 */
exports.create = function(req, res) {
    var form = new Form(req.body);

    form.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the form'
            });
        }

        res.jsonp(form);

    });
};

/**
 * Update a form
 */
exports.update = function(req, res) {
    var form = req.form;

    form = _.extend(form, req.body);

    form.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the form'
            });
        }
        res.jsonp(form);

    });
};

/**
 * List of Forms
 */
exports.all = function(req, res) {

    Form.find().exec(function(err, forms) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the forms'
            });
        }
        res.jsonp(forms);
    });
};

/**
 * Find form by name
 */
exports.formByName = function (req, res, name) {
    Form.findOne({ 'name' : name }).exec(function(err, form) {
        if(err){
            return res.jsonp(500,{
                error: 'Failed to load form ' + name
            });
        }
        res.jsonp(form);
    });
};