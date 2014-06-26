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

            .state('allEventTickets',{
                url                                 : '/admin/event-tickets/list',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@allEventTickets'          : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allEventTickets'       : { templateUrl: 'admin/views/eventTicket/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createEventTickets',{
                url                                 : '/admin/event-tickets/create',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@createEventTickets'       : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createEventTickets'    : { templateUrl: 'admin/views/eventTicket/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editEventTickets', {
                url                                 : '/admin/event-tickets/:eventTicketId/edit',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@editEventTickets'         : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editEventTickets'      : { templateUrl: 'admin/views/eventTicket/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

