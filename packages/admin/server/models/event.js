'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
    title: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    },
    allias: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    },
    lat:{
        type        : String
    },
    long:{
        type        : String
    },
    venue:{
        type        : String
    },
    startDate:{
        type        : Date
    },
    endDate:{
        type        : Date
    },
    logo:{
        type        : String
    },
    description :{
        type        : String
    },
    showRemainingTicket:{
        type        : Boolean
    }
});

/**
 * Validations
 */
EventSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Event', EventSchema);
