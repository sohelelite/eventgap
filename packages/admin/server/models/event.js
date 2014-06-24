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

    longitude:{
        type        : Number
    },

    latitude :{
        type        : Number
    },

    venue:{
        type        : String
    },
    startDate:{
        type        : Date,
        default     : Date.now
    },
    endDate:{
        type        : Date,
        default     : Date.now
    },
    logo:{
        type        : String
    },
    description :{
        type        : String
    },
    organizer :{
        type        : Schema.ObjectId,
        ref         : 'Organizer'
    },
    category:{
        type        : Schema.ObjectId,
        ref         : 'Category'
    },
    topic:{
        type        : Schema.ObjectId,
        ref         : 'Topic'
    },
    listingType :{
        type        : String,
        enum        : ['Public', 'Private']
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
