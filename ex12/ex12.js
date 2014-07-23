// Hexagonal Binning
/*** 2013 regular season Miami Heat shot distribution ***/
  
add.controller('ex12', function ($scope, $http, $interval) {

  $scope.players = {};

  $scope.color = d3.scale.linear()
    .domain([0, 5])
    .range(["white", "steelblue"])
    .interpolate(d3.interpolateLab);


  /*** ***/

  function byPlayer (p) {
    p.scale = d3.scale
      .linear()
      .domain([0, 1, d3.max(p.ranges.attempts, function (d) { return d.length; })])
      .range([0, 2, 20]);
  }

  function byTeam () {

  }


  /*** ***/

  function groupPlayers (e) {
    if (!$scope.players[e.id]) {
      $scope.players[e.id] = {
        id : e.id,
        name : e.name,
        shots : [],
        ranges : {
          attempts : d3.range(26).map(function() { return []; }),
          made : d3.range(26).map(function() { return []; })
        }
      };
    }

    $scope.players[e.id].shots.push(e);

  }

  function parsePlayers (p) {
    for (var i in p.shots) {
      var shot = p.shots[i];
      var dist = Math.floor(Math.sqrt((shot.x*shot.x) + (shot.y*shot.y)) / 12);

      if (dist>25) {
        dist = 25;
      }

      p.ranges.attempts[dist].push(shot);

      if (shot.made) {
        p.ranges.made[dist].push(shot);
      }
    }

    byPlayer(p);
  }

  $http({ method: 'GET', url: '/src/js/data/shotchart.js' }).success(function (data) {
    $scope.data = data;

    for (var i in data) {
      groupPlayers(data[i]);
    }

    for (var p in $scope.players) {
      parsePlayers($scope.players[p]);
    }

    console.log($scope.players);

  });


});