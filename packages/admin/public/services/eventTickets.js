'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.admin').factory('EventTickets', ['$resource',
    function($resource) {
        return $resource('event-tickets/:eventTicketId', {
            eventTicketId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);