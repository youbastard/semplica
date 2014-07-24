add.controller('ex5', function ($scope, $http) {

  $scope.margin = { top: 20, right: 20, bottom: 30, left: 50 };
  $scope.width = 960 - $scope.margin.left - $scope.margin.right;
  $scope.height = 500 - $scope.margin.top - $scope.margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  $scope.x = d3.time.scale().range([0, $scope.width]);
  $scope.y = d3.scale.linear().range([$scope.height, 0]);

  $scope.xAxis = d3.svg.axis().scale($scope.x).orient("bottom");
  $scope.yAxis = d3.svg.axis().scale($scope.y).orient("left");

  area = d3.svg.area()
    .x(function(d) { return $scope.x(d.date); })
    .y0($scope.height)
    .y1(function(d) { return $scope.y(d.close); });

  $http({
    method: 'GET',
    url: '/src/js/data/close.js'
  }).success(function (data) {

    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    $scope.x.domain(d3.extent(data, function(d) { return d.date; }));
    $scope.y.domain([0, d3.max(data, function(d) { return d.close; })]);

    $scope.data = data;

    $scope.xAxis(d3.select('.x.axis'));
    $scope.yAxis(d3.select('.y.axis'));

    $scope.areaPath = area($scope.data);
  });

});