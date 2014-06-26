'use strict';

//Coupons service used for articles REST endpoint
angular.module('mean.admin').factory('Coupons', ['$resource',
    function($resource) {
        return $resource('coupons/:couponId', {
            couponId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);