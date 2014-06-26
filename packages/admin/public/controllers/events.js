'use strict';

angular.module('mean.admin').controller('EventsController',['$scope', '$stateParams', '$location', 'Global', 'Events','Organizers',
    function ($scope, $stateParams, $location, Global, Events, Organizers) {

        $scope.global = Global;

        $scope.format = 'dd-MMMM-yyyy';
        $scope.openStartDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedStartDate = true;
        };
        $scope.openEndDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedEndDate = true;
        };

        $scope.hasAuthorization = function(category) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var event = new Events({
                    title               : this.title,
                    allias              : this.allias,
                    longitude           : this.longitude,
                    latitude            : this.latitude,
                    venue               : this.venue,
                    startDate           : this.startDate,
                    endDate             : this.endDate,
                    logo                : this.logo,
                    description         : this.description,
                    organizer           : this.organizer._id,
                    category            : this.category,
                    topic               : this.topic,
                    listingType         : this.listingType,
                    showRemainingTicket : this.showRemainingTicket
                });

                event.$save(function(response) {
                    $location.url('/admin/events/list?message=created');
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
                var event = $scope.event;
                event.$update(function(response) {
                    $location.url('/admin/events/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Events.query(function(events) {
                $scope.events = events;
            });
        };

        $scope.findOne = function() {
            Events.get({
                eventId: $stateParams.eventId
            }, function(event) {
                $scope.event = event;
            });
        };

        $scope.initializeEdit = function () {
            $scope.findOne();
            $scope.initializeFormControl();
        };

        $scope.initializeCreate = function () {
            $scope.find();
            $scope.initializeFormControl();
        };

        $scope.initializeFormControl = function () {

            Organizers.query(function(organizers) {
                $scope.organizers = organizers;
            });

        };
    }
]);
