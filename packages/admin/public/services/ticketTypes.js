'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.admin').factory('TicketTypes', ['$resource',
    function($resource) {
        return $resource('ticket-types/:ticketTypeId', {
            ticketTypeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
