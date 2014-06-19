'use strict';

var ticketTypes = require('../controllers/ticketTypes');

// TicketTypes authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(TicketTypes, app, auth) {

    app.route('/ticket-types')
        .get(ticketTypes.all)
        .post(auth.requiresLogin, ticketTypes.create);
    app.route('/ticket-types/:ticketTypeId')
        .get(ticketTypes.show)
        .put(auth.requiresLogin, hasAuthorization, ticketTypes.update);

    // Finish with setting up the articleId param
    app.param('ticketTypeId', ticketTypes.ticketType);
};
