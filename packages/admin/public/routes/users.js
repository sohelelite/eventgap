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
            .state('allUsers',{
                url                             : '/admin/users/list',
                views:{
                ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@allUsers'             : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allUsers'          : { templateUrl: 'admin/views/user/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createUsers',{
                url                             : '/admin/users/create',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@createUsers'          : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createUsers'       : { templateUrl: 'admin/views/user/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editUsers', {
                url                              : '/admin/users/:usersId/edit',
                views:{
                    ''                           : { templateUrl: 'admin/views/index.html' },
                    'menu@editUsers'             : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editUsers'          : { templateUrl: 'admin/views/user/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });

    }
]);
