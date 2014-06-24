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

            .state('allEvents',{
                url                             : '/admin/events/list',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@allEvents'            : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allEvents'         : { templateUrl: 'admin/views/event/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createEvents',{
                url                             : '/admin/events/create',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@createEvents'         : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createEvents'      : { templateUrl: 'admin/views/event/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editEvents', {
                url                             : '/admin/events/:eventId/edit',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@editEvents'           : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editEvents'        : { templateUrl: 'admin/views/event/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

