'use strict';

angular.module('mean.admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

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

        // For unmatched routes:
        $urlRouterProvider.otherwise('/admin');


        $stateProvider
        .state('admin',{
           url : '/admin',
            views:
            {
                ''              : { templateUrl: 'admin/views/index.html' },
                'menu@admin'    : { templateUrl: 'admin/views/includes/menu.html' }
            },
            resolve:{
                loggedin : checkLoggedin
            }
        })

        .state('create',{
            url: '/admin/form/create',
            views:{
                ''                  : { templateUrl: 'admin/views/index.html' },
                'menu@create'       : { templateUrl: 'admin/views/includes/menu.html' },
                'content@create'    : { templateUrl: 'admin/views/includes/create.html' }
            },
            resolve:{
                loggedin : checkLoggedin
            }
        });
    }
]);
