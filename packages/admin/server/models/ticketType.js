'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TicketType Schema
 */
var TicketTypeSchema = new Schema({
    name: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    }
});

/**
 * Validations
 */
TicketTypeSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
TicketTypeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('TicketType', TicketTypeSchema);
