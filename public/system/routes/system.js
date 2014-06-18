'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
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

            // states for my app
            $stateProvider              
                .state('home', {
                    url: '/',
                    views:
                    {
                        ''          : { templateUrl: 'admin/views/index.html' },
                        'menu@home' : { templateUrl: 'admin/views/includes/menu.html' }
                    },
                    resolve:{
                        loggedin : checkLoggedin
                    }
                })

                .state('auth', {
                    templateUrl: 'public/auth/views/index.html'
                });
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
