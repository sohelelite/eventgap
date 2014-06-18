'use strict';

angular.module('mean.admin').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;

        //Add hover support for touch devices
        angular.element('.btn').bind('touchstart', function($event) {
            angular.element(this).addClass('hover');
        });
        angular.element('.btn').bind('touchend', function($event) {
            angular.element(this).removeClass('hover');
        });

        /* Sidebar tree view */
        angular.element('.sidebar .treeview').tree();

        /*
         * We are gonna initialize all checkbox and radio inputs to
         * iCheck plugin in.
         * You can find the documentation at http://fronteed.com/iCheck/
         */
        angular.element('input[type="checkbox"], input[type="radio"]').iCheck({
            checkboxClass: 'icheckbox_minimal',
            radioClass: 'iradio_minimal'
        });

    }
]);