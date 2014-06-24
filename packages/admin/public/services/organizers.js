'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.admin').factory('Organizers', ['$resource',
    function($resource) {
        return $resource('organizers/:organizerId', {
            organizerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
