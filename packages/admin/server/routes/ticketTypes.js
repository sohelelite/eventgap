'use strict';

var ticketTypes = require('../controllers/ticketTypes');

module.exports = function(TicketTypes, app, auth) {

    app.route('/ticket-types')
        .get(ticketTypes.all)
        .post(auth.requiresAdmin, ticketTypes.create);
    app.route('/ticket-types/:ticketTypeId')
        .get(ticketTypes.show)
        .put(auth.requiresLogin, auth.requiresAdmin, ticketTypes.update);

    // Finish with setting up the articleId param
    app.param('ticketTypeId', ticketTypes.ticketType);
};
