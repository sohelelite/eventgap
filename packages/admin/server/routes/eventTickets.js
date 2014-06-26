'use strict';

var eventTickets = require('../controllers/eventTickets');

module.exports = function(EventTickets, app, auth) {

    app.route('/event-tickets')
        .get(eventTickets.all)
        .post(auth.requiresAdmin, eventTickets.create);
    app.route('/event-tickets/:eventTicketId')
        .get(eventTickets.show)
        .put(auth.requiresLogin, auth.requiresAdmin, eventTickets.update);

    // Finish with setting up the eventId param
    app.param('eventTicketId', eventTickets.eventTicket);

    //REST API
    app.route('/api/event-tickets')
        .get(eventTickets.all);

};
