'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Coupons Schema
 */
var CouponsSchema = new Schema({
    name: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    },
    code:{
        type        : Number,
        required    : true
    },
    amount:{
        type        : Number,
        required    : true
    },
    percent:{
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
    },
    eventTicket:{
        type        : Schema.ObjectId,
        ref         : 'EventTicket'
    }
});

/**
 * Validations
 */
CouponsSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
CouponsSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Coupon', CouponsSchema);
