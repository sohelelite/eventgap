'use strict';

angular.module('mean.admin').controller('UsersController',['$scope', '$stateParams', '$location', 'Global', 'Users',
    function ($scope, $stateParams, $location, Global, Users) {

        $scope.global = Global;

        $scope.hasAuthorization = function(user) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var user = new Users({
                    name: this.name
                });
                user.$save(function(response) {
                    $location.url('/admin/users/list?message=created');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            }
            else
            {
                $scope.submitted = true;
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var user = $scope.user;

                user.$update(function(response) {
                    $location.url('/admin/users/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Users.query(function(users) {
                $scope.users = users;
            });
        };

        $scope.findOne = function() {
    Users.get({
        userId: $stateParams.userId
    }, function(user) {
        $scope.user = user;
    });
};

    }
]);