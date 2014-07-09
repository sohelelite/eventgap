'use strict';

angular.module('mean.admin').controller('UsersController',['$scope', '$stateParams', '$location', 'Global', 'Users',
    function ($scope, $stateParams, $location, Global, Users) {

        $scope.global = Global;

        $scope.format = 'dd-MMMM-yyyy';
        $scope.openBirthDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedBirthDate = true;
        };

        $scope.hasAuthorization = function(user) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var homeAddress = {
                    address1    : this.address1Home,
                    address2    : this.address2Home,
                    city        : this.cityHome,
                    state       : this.stateHome,
                    zipCode     : this.zipCodeHome,
                    country     : this.countryHome
                };

                var billingAddress = {
                    address1    : this.address1Billing,
                    address2    : this.address2Billing,
                    city        : this.cityBilling,
                    state       : this.stateBilling,
                    zipCode     : this.zipCodeBilling,
                    country     : this.countryBilling
                };

                var shippingAddress = {
                    address1    : this.address1Shipping,
                    address2    : this.address2Shipping,
                    city        : this.cityShipping,
                    state       : this.stateShipping,
                    zipCode     : this.zipCodeShipping,
                    country     : this.countryShipping
                };

                var workAddress = {
                    jobTitle    : this.jobTitle,
                    company     : this.company,
                    address1    : this.address1Work,
                    address2    : this.address2Work,
                    city        : this.cityWork,
                    state       : this.stateWork,
                    zipCode     : this.zipCodeWork,
                    country     : this.countryWork,
                    phone       : this.phone,
                    blog        : this.blog,
                    website     : this.website
                };

                var user = new Users({
                    email           : this.email,
                    password        : this.password,
                    confirmPassword : this.confirmPassword,
                    firstName       : this.firstName,
                    lastName        : this.lastName,
                    homePhone       : this.homePhone,
                    cellPhone       : this.cellPhone,
                    provider        : 'local',
                    roles           : ['authenticated'],
                    homeAddress     : homeAddress,
                    billingAddress  : billingAddress,
                    shippingAddress : shippingAddress,
                    workAddress     : workAddress,
                    gender          : this.gender,
                    birthDate       : this.birthDate
                });

                console.log(user);

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
            Users.get(
                {
                    userId: $stateParams.userId
                },
                function(user)
                {
                    $scope.user = user;
                }
            );
};

    }
]);