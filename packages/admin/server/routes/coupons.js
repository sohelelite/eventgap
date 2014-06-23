'use strict';

var coupons = require('../controllers/coupons');

module.exports = function(Coupons, app, auth) {

    app.route('/coupons')
        .get(coupons.all)
        .post(auth.requiresAdmin, coupons.create);
    app.route('/coupons/:couponId')
        .get(coupons.show)
        .put(auth.requiresLogin, auth.requiresAdmin, coupons.update);

    // Finish with setting up the couponId param
    app.param('couponId', coupons.coupon);
};