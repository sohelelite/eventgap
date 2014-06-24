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

            .state('allOrganizers',{
                url                                 : '/admin/organizers/list',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@allOrganizers'            : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allOrganizers'         : { templateUrl: 'admin/views/organizer/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createOrganizers',{
                url                                 : '/admin/organizers/create',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@createOrganizers'         : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createOrganizers'      : { templateUrl: 'admin/views/organizer/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editOrganizers', {
                url                                 : '/admin/organizers/:organizerId/edit',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@editOrganizers'           : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editOrganizers'        : { templateUrl: 'admin/views/organizer/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

