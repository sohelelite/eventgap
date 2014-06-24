'use strict';

angular.module('mean.admin').controller('TopicsController',['$scope', '$stateParams', '$location', 'Global', 'Topics',
    function ($scope, $stateParams, $location, Global, Topics) {

        $scope.global = Global;

        $scope.hasAuthorization = function(category) {
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid)
            {
                var topic = new Topics({
                    name    : this.name
                });

                if(!angular.isUndefined(this.parent))
                {
                    topic.parent = this.parent.name;
                }

                topic.$save(function(response) {
                    $location.url('/admin/topics/list?message=created');
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
                var topic = $scope.topic;
                topic.$update(function(response) {
                    $location.url('/admin/topics/list?message=updated');
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Topics.query(function(topics) {
                $scope.topics = topics;
            });
        };

        $scope.findOne = function() {
            Topics.get({
                topicId: $stateParams.topicId
            }, function(topic) {
                $scope.topic = topic;
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
