'use strict';

angular.module('mean.admin').controller('AdminController', ['$scope', '$stateParams', '$location', 'Global', 'Admin','Util','Forms',
    function($scope, $stateParams, $location, Global, Admin, Util, Forms) {
        $scope.global = Global;
        $scope.package = {
            name: 'admin'
        };

        $scope.createInit = function () {
            Forms.get({
                name : Util.SanitizeURL($stateParams.formName)
            }, function (form) {
                $scope.form = form;
            });
        };
    }
]);
