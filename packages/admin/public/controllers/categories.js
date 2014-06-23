'use strict';

angular.module('mean.admin').controller('CategoriesController',['$scope', '$stateParams', '$location', 'Global', 'Categories',
    function ($scope, $stateParams, $location, Global, Categories) {

        $scope.global = Global;

        $scope.hasAuthorization = function(category) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var category = new Categories({
                    name: this.name
                });
                category.$save(function(response) {
                    $location.url('/admin/categories/list?message=created');
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
                var category = $scope.category;

                category.$update(function(response) {
                    $location.url('/admin/categories/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Categories.query(function(categories) {
                $scope.categories = categories;
            });
        };

        $scope.findOne = function() {
            Categories.get({
                categoryId: $stateParams.categoryId
            }, function(category) {
                $scope.category = category;
            });
        };

        $scope.initializeList = function () {
            $scope.find();
        };
    }
]);
