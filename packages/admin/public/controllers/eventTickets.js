'use strict';

angular.module('mean.admin').controller('EventTicketsController',['$scope', '$stateParams', '$location', 'Global', 'Events','TicketTypes','EventTickets',
    function ($scope, $stateParams, $location, Global, Events,TicketTypes, EventTickets) {

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
                var eventTicket = new EventTickets({
                    event           : this.event._id,
                    ticket          : this.ticket,
                    name            : this.name,
                    description     : this.description,
                    ticketType      : this.ticketType.name,
                    amount          : this.amount,
                    quantity        : this.quantity,
                    min             : this.min,
                    max             : this.max,
                    startDate       : this.startDate,
                    endDate         : this.endDate
                });

                eventTicket.$save(function(response) {
                    $location.url('/admin/event-tickets/list?message=created');
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
                var eventTicket = $scope.eventTicket;
                eventTicket.$update(function(response) {
                    $location.url('/admin/event-tickets/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            EventTickets.query(function(eventTickets) {
                $scope.eventTickets = eventTickets;
            });
        };

        $scope.findOne = function() {
            EventTickets.get({
                eventTicketId: $stateParams.eventTicketId
            }, function(eventTicket) {
                $scope.eventTicket = eventTicket;
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
            Events.query(function(events) {
                $scope.events = events;
            });

            TicketTypes.query(function(ticketTypes) {
                $scope.ticketTypes = ticketTypes;
            });
        };

    }
]);
