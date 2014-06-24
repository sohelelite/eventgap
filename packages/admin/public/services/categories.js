'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.admin').factory('Categories', ['$resource',
    function($resource) {
        return $resource('categories/:categoryId', {
            categoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);