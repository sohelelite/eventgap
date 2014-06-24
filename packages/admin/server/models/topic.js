'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Topic Schema
 */
var TopicSchema = new Schema({
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
TopicSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
TopicSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Topic', TopicSchema);