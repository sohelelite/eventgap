'use strict';

var users = require('../controllers/users');

// TicketTypes authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Users, app, auth) {

    app.route('/users')
        .get(users.all)
        .post(auth.requiresLogin, users.create);
    app.route('/users/:userId')
        .get(users.show)
        .put(auth.requiresLogin, hasAuthorization, users.update);

    // Finish with setting up the articleId param
    app.param('userId', users.user);

    //REST API


};