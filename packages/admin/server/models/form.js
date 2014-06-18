'use strict';

/***
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Form Schema
 */
var FormSchema = new Schema({

    name :{
        type        : String,
        unique      : true,
        required    : true,
        trim        : true
    },
    desc : {
        type        : String,
        trim        : true
    },
    model :{
        type        : String,
        required    : true,
        trim        : true
    },
    isActive :{
        type        : Boolean,
        default     : true
    }

});

/**
 * Validations
 */
FormSchema.path('name').validate(function (name) {
    return !!name;
}, 'Name cannot be blank');

FormSchema.path('model').validate(function(model) {
    return !!model;
}, 'Model cannot be blank');

/***
 * Statics
 */
FormSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Form', FormSchema);