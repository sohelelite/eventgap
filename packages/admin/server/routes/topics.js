'use strict';

var topics = require('../controllers/topics');

module.exports = function(Topics, app, auth) {

    app.route('/topics')
        .get(topics.all)
        .post(auth.requiresAdmin, topics.create);
    app.route('/topics/:topicId')
        .get(topics.show)
        .put(auth.requiresLogin, auth.requiresAdmin, topics.update);

    // Finish with setting up the topicId param
    app.param('topicId', topics.topic);
};
