// ex13
// projection with bounding sphere and graticule

add.controller('ex13', function ($scope, $http) {

  var width = 1600;
  var height = 1200;

  var projection = d3.geo.winkel3()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0.1);

  var path = d3.geo.path()
      .projection(projection);

  var graticule = d3.geo.graticule();

  $scope.path = path;

  $http({ method: 'GET', url: '/src/js/data/world-50m.js' })
    .success(function (world) {
      $scope.sphere = path({type:"Sphere"});
      $scope.boundary = path(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }));
      $scope.graticule = path(graticule(topojson.feature(world, world.objects.land)));
      $scope.countries = topojson.feature(world, world.objects.countries).features;
  });


});