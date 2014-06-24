'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
    name: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    },

    parent:{
        type        : String,
        index       : true
    },

    isActive :{
        type        : Boolean,
        default     : true
    }

});

/**
 * Validations
 */
CategorySchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
CategorySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Category', CategorySchema);

