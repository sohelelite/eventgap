'use strict';

angular.module('mean.admin').config(['$stateProvider',
    function ($stateProvider) {

        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider

            .state('allTicketTypes',{
                url                             : '/admin/ticket-types/list',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@allTicketTypes'       : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allTicketTypes'    : { templateUrl: 'admin/views/ticketType/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createTicketTypes',{
                url         : '/admin/ticket-types/create',
                views:{
                    ''                             : { templateUrl: 'admin/views/index.html' },
                    'menu@createTicketTypes'       : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createTicketTypes'    : { templateUrl: 'admin/views/ticketType/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editTicketTypes', {
                url         : '/admin/ticket-types/:ticketTypeId/edit',
                views:{
                    ''                           : { templateUrl: 'admin/views/index.html' },
                    'menu@editTicketTypes'       : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editTicketTypes'    : { templateUrl: 'admin/views/ticketType/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

