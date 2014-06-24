'use strict';

var categories = require('../controllers/categories');

// TicketTypes authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Categories, app, auth) {

    app.route('/categories')
        .get(categories.all)
        .post(auth.requiresLogin, categories.create);
    app.route('/categories/:categoryId')
        .get(categories.show)
        .put(auth.requiresLogin, hasAuthorization, categories.update);

    // Finish with setting up the articleId param
    app.param('categoryId', categories.category);
};