'use strict';

/***
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Coupon Schema
 */
var CouponSchema = new Schema({
    name: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    },
    amount :{
        type        : String
    },
    percentage:{
        type        : String
    },
    code :{
        type        : String
    },
    startTime :{
        type        : Date
    },
    endTime :{
        type        : Date
    },
    minTicket:{
        type        : String
    },
    maxTicket:{
        type        : String
    }
});

/**
 * Validations
 */
CouponSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
CouponSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Coupon', CouponSchema);