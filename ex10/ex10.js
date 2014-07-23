// Hexagonal Binning
/*** 2013 regular season Miami Heat shot distribution ***/
  
add.controller('ex10', function ($scope, $http, $interval) {

  var width = 500;
  var height = 470;

  $scope.views = ['made', 'distribution'];
  $scope.view = $scope.views[0];
  $scope.hexs = [];

  $scope.color = d3.scale.linear()
    .domain([0, 20])
    .range(["steelblue", "red"])
    .interpolate(d3.interpolateLab);

  $scope.hexbin = d3.hexbin()
    .size([width, height])
    .radius(3);

  $scope.viewMode = function (mode) {
    if (!$scope.data) {
      return;
    }

    switch (mode) {
      case 'made':
        $scope.hexs = $scope.hexbin($scope.made);
        break;
      case 'distribution':
        $scope.hexs = $scope.hexbin($scope.distribution);
        break;
    }
  };

  $http({ method: 'GET', url: '/src/js/data/shotchart.js' }).success(function (data) {
    $scope.data = data;
    $scope.distribution = data.map(function (d) { return [d.x+250, d.y+50]; });
    $scope.made = data.filter(function (d) { return d.made; }).map(function (d) { return [d.x+250, d.y+50]; });
    $scope.viewMode($scope.view);
  });

  $scope.$watch('view', function () {
    $scope.viewMode($scope.view);
  });

});