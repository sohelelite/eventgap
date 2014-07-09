'use strict';

var events = require('../controllers/events');

module.exports = function(Events, app, auth) {

    app.route('/events')
        .get(events.all)
        .post(auth.requiresAdmin, events.create);
    app.route('/events/:eventId')
        .get(events.show)
        .put(auth.requiresLogin, auth.requiresAdmin, events.update);

    // Finish with setting up the eventId param
    app.param('eventId', events.event);

    //REST API
    app.route('/api/events')
        .get(events.all)
        .post(events.create);

};
