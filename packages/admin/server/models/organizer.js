'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Organizer Schema
 */
var OrganizerSchema = new Schema({
    name: {
        type        : String,
        required    : true,
        unique      : true,
        trim        : true
    },
    description :{
        type        : String
    },
    email:{
        type        : String
    }
});

/**
 * Validations
 */
OrganizerSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
OrganizerSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Organizer', OrganizerSchema);
