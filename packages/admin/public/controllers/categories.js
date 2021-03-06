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
                    name    : this.name
                });

                if(!angular.isUndefined(this.parent))
                {
                    category.parent = this.parent.name;
                }

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

        $scope.initializeEdit = function () {
            $scope.findOne();
            $scope.find();
        };

        $scope.initializeCreate = function () {
           $scope.find();
        };
    }
]);
