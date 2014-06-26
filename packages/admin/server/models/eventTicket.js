'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Event Ticket Schema
 */
var EventTicketSchema = new Schema({

    event:{
        type        : Schema.ObjectId,
        ref         : 'Event'
    },

    ticket: {
        type        : String,
        trim        : true
    },

    name :{
        type        : String
    },

    description :{
        type        : String
    },

    ticketType: {
        type        : String
    },

    amount:{
        type        : Number,
        required    : true
    },

    quantity :{
        type        : Number,
        required    : true
    },

    min:{
        type        : Number,
        default     : 1
    },

    max:{
        type        : Number,
        default     : 1
    },

    startDate:{
        type        : Date,
        default     : Date.now
    },

    endDate:{
        type        : Date,
        default     : Date.now
    }

});

/**
 * Validations
 */
EventTicketSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
EventTicketSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('EventTicket', EventTicketSchema);

