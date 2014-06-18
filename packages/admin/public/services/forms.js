'use strict';

angular.module('mean.admin').factory('Forms', ['$resource',
    function($resource) {
        return $resource('/forms/:name', {
            name: '@name'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
