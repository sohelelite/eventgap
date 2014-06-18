'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope','$window', 'Global',
    function($scope, $rootScope,$window, Global) {
        $scope.global = Global;

        $rootScope.$on('loggedin', function() {
            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

        //Enable sidebar toggle
        $scope.offcanvas = function () {
            //If window is small enough, enable sidebar push menu
            if ($window.innerWidth <= 992) {
                angular.element('.row-offcanvas').toggleClass('active');
                angular.element('.left-side').removeClass('collapse-left');
                angular.element('.right-side').removeClass('strech');
                angular.element('.row-offcanvas').toggleClass('relative');
            } else {
                //Else, enable content streching
                angular.element('.left-side').toggleClass('collapse-left');
                angular.element('.right-side').toggleClass('strech');
            }
        };

        function _fix () {
            //Get window height and the wrapper height
            var height = $window.innerHeight - angular.element('body > .header').height();

            angular.element('.wrapper').css('min-height', height + 'px');
            var content = angular.element('.wrapper').height();
            //If the wrapper height is greater than the window
            if (content > height)
            //then set sidebar height to the wrapper
                angular.element('.left-side, html, body').css('min-height', content + 'px');
            else {
                //Otherwise, set the sidebar to the height of the window
                angular.element('.left-side, html, body').css('min-height', height + 'px');
            }
        }

        function fix_sidebar() {
            //Make sure the body tag has the .fixed class
            if (!angular.element('body').hasClass('fixed')) {
                return;
            }

            //Add slimscroll
            angular.element('.sidebar').slimscroll({
                height: ($window.innerHeight - angular.element('.header').height()) + 'px',
                color: 'rgba(0,0,0,0.2)'
            });
        }

        angular.element($window).bind('resize', function()  {
            _fix();
            fix_sidebar();
        });

        //Fire upon load
        _fix();

        //Fix the fixed layout sidebar scroll bug
        fix_sidebar();

    }
]);
