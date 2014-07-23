// a bar chart example
// using divs and static data

// interpretation from http://bost.ocks.org/mike/bar/
// ex: http://bl.ocks.org/mbostock/7322386

add.controller('ex1', function ($scope) {

  $scope.data = [4, 8, 15, 16, 23, 42];

  // use D3 for linear scaling
  $scope.x = d3.scale.linear()
    .domain([0, d3.max($scope.data)])
    .range([0, 420]);

});