/*
 * Directive to validate input to accept only numbers
 * Usage:
 * <input type="text" ng-model="employee.age" valid-number placeholder="Enter an age" />
 */

'use strict';

angular.module('mean.admin').directive('validNumber',function() {
        return {
            require: '?ngModel',

            link : function (scope, element, attrs, ngModelCtrl) {
                if(!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function(val) {
                    var clean = val.replace( /[^0-9]+/g, '');
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function(event) {
                    if(event.keyCode === 32) {
                        event.preventDefault();
                    }
                });

            }

        };
    }
);
