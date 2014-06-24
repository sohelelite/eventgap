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

            .state('allTopics',{
            url                                 : '/admin/topics/list',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@allTopics'            : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allTopics'         : { templateUrl: 'admin/views/topic/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createTopics',{
                url                             : '/admin/topics/create',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@createTopics'         : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createTopics'      : { templateUrl: 'admin/views/topic/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editTopics', {
            url                                 : '/admin/topics/:topicId/edit',
                views:{
                ''                              : { templateUrl: 'admin/views/index.html' },
                    'menu@editTopics'           : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editTopics'        : { templateUrl: 'admin/views/topic/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

