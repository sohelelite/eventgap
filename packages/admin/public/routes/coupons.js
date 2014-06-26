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

            .state('allCouopons',{
                url                             : '/admin/coupons/list',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@allCouopons'          : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@allCouopons'       : { templateUrl: 'admin/views/coupon/list.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('createCoupons',{
                url                             : '/admin/coupons/create',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@createCoupons'        : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@createCoupons'     : { templateUrl: 'admin/views/coupon/create.html' }
                },
                resolve:{
                    loggedin: checkLoggedin
                }
            })

            .state('editCoupons', {
                url                             : '/admin/coupons/:couponId/edit',
                views:{
                    ''                          : { templateUrl: 'admin/views/index.html' },
                    'menu@editCoupons'          : { templateUrl: 'admin/views/includes/menu.html' },
                    'content@editCoupons'       : { templateUrl: 'admin/views/coupon/edit.html' }
                },
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);

