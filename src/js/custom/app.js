var add = angular.module('add', []);




add.directive("addAxis", function () {
  'use strict';

  return {
    restrict: 'AE',
    scope: {
      axis: '=',
      data: '='
    },
    controller: function () {

    },
    link: function postLink(scope, element, attrs) {
      scope.$watch('axis', function(axis) {
        d3.select(element[0]).call(scope.axis);
      });
      scope.$watch('data', function(data) {
        console.log('data changed');
        d3.select(element[0]).call(scope.axis);
      });
    }
  };

});


add.directive("addTopology", function () {
  'use strict';

  return {
    restrict: 'AE',
    scope: {
      projection: '=',
      data: '='
    },
    controller: function () {

    },
    link: function postLink(scope, element, attrs) {
      var projection;
      scope.$watch('projection', function(d) {

      });
    }

  };

});