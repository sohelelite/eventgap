'use strict';

var organizers = require('../controllers/organizers');

module.exports = function(Organizers, app, auth) {

    app.route('/organizers')
        .get(organizers.all)
        .post(auth.requiresAdmin, organizers.create);
    app.route('/organizers/:organizerId')
        .get(organizers.show)
        .put(auth.requiresLogin, auth.requiresAdmin, organizers.update);

    // Finish with setting up the organizerId param
    app.param('organizerId', organizers.organizer);

    //REST API
    app.route('/api/organizers')
        .get(organizers.all);
};
