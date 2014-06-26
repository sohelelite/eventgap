'use strict';

angular.module('mean.admin').controller('CouponsController',['$scope', '$stateParams', '$location', 'Global', 'Coupons','EventTickets',
    function ($scope, $stateParams, $location, Global, Coupons, EventTickets) {

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
                var coupon = new Coupons({
                    name        : this.name,
                    code        : this.code,
                    amount      : this.amount,
                    percent     : this.percent,
                    min         : this.min,
                    max         : this.max,
                    startDate   : this.startDate,
                    endDate     : this.endDate,
                    eventTicket : this.eventTicket._id
                });

                coupon.$save(function(response) {
                    $location.url('/admin/coupons/list?message=created');
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
                var coupon = $scope.coupon;
                coupon.$update(function(response) {
                    $location.url('/admin/coupons/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Coupons.query(function(coupons) {
                $scope.coupons = coupons;
            });
        };

        $scope.findOne = function() {
            Coupons.get({
                couponId: $stateParams.couponId
            }, function(coupon) {
                $scope.coupon = coupon;
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

            EventTickets.query(function(eventTickets) {
                $scope.eventTickets = eventTickets;
            });

        };
    }
]);
