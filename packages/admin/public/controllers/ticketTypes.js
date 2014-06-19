'use strict';

angular.module('mean.admin').controller('TicketTypesController',['$scope', '$stateParams', '$location', 'Global', 'TicketTypes',
    function ($scope, $stateParams, $location, Global, TicketTypes) {

        $scope.global = Global;

        $scope.hasAuthorization = function(ticketType) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var ticketType = new TicketTypes({
                    name: this.name
                });
                ticketType.$save(function(response) {
                    $location.url('/admin/ticket-types/list?message=created');
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
                var ticketType = $scope.ticketType;

                ticketType.$update(function(response) {
                    $location.url('/admin/ticket-types/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            TicketTypes.query(function(ticketTypes) {
                $scope.ticketTypes = ticketTypes;
            });
        };

        $scope.findOne = function() {
            TicketTypes.get({
                ticketTypeId: $stateParams.ticketTypeId
            }, function(ticketType) {
                $scope.ticketType = ticketType;
            });
        };

        $scope.initializeList = function () {
            $scope.find();
        };
    }
]);
