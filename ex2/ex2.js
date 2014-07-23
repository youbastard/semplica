// a bar chart example
// using svg and data loaded from an ajax call

// interpretation from http://bost.ocks.org/mike/bar/2/
// ex: http://bl.ocks.org/mbostock/7341714

add.controller('ex2', function ($scope, $http) {

  $scope.width = 420;
  $scope.barHeight = 20;

  $http({
    method: 'GET',
    url: 'ex2data.js'
  }).success(function (data) {
    $scope.data = data;
    $scope.x = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([0, $scope.width]);
    console.log(data);
  });

  // use D3 for linear scaling


});