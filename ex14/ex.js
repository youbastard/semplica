// ex14
// Chord Diagram example

// original example: http://bl.ocks.org/mbostock/4062006

add.controller('ex14', function ($scope, $http) {

  var matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ];

  var width = 960;
  var height = 500;
  var innerRadius = Math.min(width, height) * 0.41;
  var outerRadius = innerRadius * 1.1;

  var chord = d3.layout.chord()
      .padding(0.05)
      .sortSubgroups(d3.descending)
      .matrix(matrix);

  $scope.groups = chord.groups();
  $scope.chords = chord.chords();
  $scope.fill = d3.scale.ordinal().domain(d3.range(4)).range(["#000000", "#FFDD89", "#957244", "#F26223"]);
  $scope.arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  $scope.radius = d3.svg.chord().radius(innerRadius);

  $scope.opacity = function (c) {
    if (typeof c.opacity === "undefined") {
      c.opacity = 1;
    }
    return c.opacity;
  };

  $scope.fade = function (index, opacity) {
    var chords = $scope.chords
      .filter(function(d) { return d.source.index != index && d.target.index != index; })
      .forEach(function(d) { d.opacity = opacity; });
  };

});