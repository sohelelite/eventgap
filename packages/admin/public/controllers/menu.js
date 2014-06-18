'use strict';

angular.module('mean.admin').controller('MenuController', ['$scope',
    function ($scope) {

        /* Sidebar tree view */
        angular.element('.sidebar .treeview').tree();

    }
]);
