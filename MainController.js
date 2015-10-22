(function() {
  var app = angular.module('githubViewer');

  var MainController = function($scope, $interval, $log, $location) {


    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var contdownInterval = null;
    startCountdown = function() {
      contdownInterval = $interval(decrementCountdown, 1000, 5);
    };

    $scope.search = function(username) {
      //$log.info("searching for " + username);
      //github.getUser(username)
      //  .then(onUserComplete, onError);
      if (contdownInterval) {
        $interval.cancel(contdownInterval);
        $scope.countdown = null;
      }
      //
      $location.path("/user/" + username);
    };

    $scope.username = "angular";
    $scope.countdown = 10;
    startCountdown();

  };

  app.controller('MainController', ['$scope', '$interval', '$log', '$location', MainController]);

}());