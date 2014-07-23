// http://bl.ocks.org/mbostock/6713736
  
add.controller('ex8', function ($scope, $http, $interval) {

  var speed = 0.015;
  var start = Date.now();
  var path, projection;

  $scope.width = 600;
  $scope.height = 600;
  $scope.ocean = {};
  $scope.projections = [
    'orthographic',
    'azimuthalEqualArea',
    'equirectangular',
    'stereographic'
  ];

  $scope.selectedProjection = $scope.projections[0];

  $scope.$watch('selectedProjection', function () {
    projection = d3.geo[$scope.selectedProjection]()
      .scale($scope.height / 2.2)
      .clipAngle(90)
      .translate([$scope.width / 2, $scope.height / 2])
      .precision(0.5);
    path = d3.geo.path().projection(projection);
  });
  
  $http({ method: 'GET', url: '/src/js/data/topo.js' }).success(function (topo) {
    $scope.ocean.data = topojson.feature(topo, topo.objects.ocean);
  });

  $interval(function () {
    projection.rotate([speed * (Date.now() - start), -20]);

    path = d3.geo.path().projection(projection);
    $scope.ocean.path = path($scope.ocean.data);
  }, 30);

});