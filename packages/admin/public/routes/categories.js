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

            .state('allCategories',{
                url                                 : '/admin/categories/list',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@allCategories'            : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allCategories'         : { templateUrl: 'admin/views/category/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createCategories',{
                url                                 : '/admin/categories/create',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@createCategories'         : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createCategories'      : { templateUrl: 'admin/views/category/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editCategories', {
                url                                 : '/admin/categories/:categoryId/edit',
                views:{
                    ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@editCategories'           : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editCategories'        : { templateUrl: 'admin/views/category/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

