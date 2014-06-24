'use strict';

angular.module('mean.admin').controller('OrganizersController',['$scope', '$stateParams', '$location', 'Global', 'Organizers',
    function ($scope, $stateParams, $location, Global, Organizers) {

        $scope.global = Global;

        $scope.hasAuthorization = function(organizer) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var organizer = new Organizers({
                    name        : this.name,
                    email       : this.email,
                    description : this.description
                });
                organizer.$save(function(response) {
                    $location.url('/admin/organizers/list?message=created');
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
                var organizer = $scope.organizer;

                organizer.$update(function(response) {
                    $location.url('/admin/organizers/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Organizers.query(function(organizers) {
                $scope.organizers = organizers;
            });
        };

        $scope.findOne = function() {
            Organizers.get({
                organizerId: $stateParams.organizerId
            }, function(organizer) {
                $scope.organizer = organizer;
            });
        };

        $scope.initializeList = function () {
            $scope.find();
        };
    }
]);
