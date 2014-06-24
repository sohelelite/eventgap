'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.admin').factory('Topics', ['$resource',
    function($resource) {
        return $resource('topics/:topicId', {
            topicId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);