// a bar chart example with dynamically 
// updating data and axes

add.controller('ex4', function ($scope, $http) {

  $scope.margin = { top: 20, right: 20, bottom: 30, left: 40 };
  $scope.width = 960 - $scope.margin.left - $scope.margin.right;
  $scope.height = 500 - $scope.margin.top - $scope.margin.bottom;

  $scope.x = d3.scale.ordinal()
    .rangeRoundBands([0, $scope.width], 0.1);

  $scope.y = d3.scale.linear()
    .range([$scope.height, 0]);

  $scope.xAxis = d3.svg.axis()
    .scale($scope.x)
    .orient("bottom");

  $scope.yAxis = d3.svg.axis()
    .scale($scope.y)
    .orient("left")
    .ticks(10, "%");

  var onAjaxSuccess = function (data) {
    $scope.data = data;
    $scope.x.domain($scope.data.map(function(d) { return d.letter; }));
    $scope.y.domain([0, d3.max($scope.data, function(d) { return d.frequency; })]);
  };

  $http({ method: 'GET', url: 'ex4data.js' }).success(onAjaxSuccess);


  $scope.updateChart = function () {
    console.log($scope.data);
    for (var i in $scope.data) {
      $scope.data[i].frequency = Math.random()/10;
    }
    $scope.yAxis.scale($scope.y);
  };

});