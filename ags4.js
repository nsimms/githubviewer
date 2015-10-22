(function() {
  var app = angular.module('githubViewer', []);

  var mainCtrl = function($scope, github, $interval, $log, $location, $anchorScroll) {
    $scope.username = "angular";
    $scope.reposOrderBy = '-stargazers_count';
    $scope.message = 'GitHub Viewer';
    $scope.countdown = 5;


    var onUserComplete = function(data) {
      console.log("User data retrieval complete...");

      var person = {
        firstName: data.login,
        lastName: data.login,
        imageSrc: data.avatar_url,
        repos: data.repos_url
      };

      $scope.person = person;

     github.getRepos(person)
        .then(onRepos, onError);

    };

    var onRepos = function(data) {
      $log.info("Repo data retrieval complete...");

      $scope.repos = data;
      
      $location.hash('userDetails');
      $anchorScroll();
    };

    var onError = function(reason) {
      $log.info('error gettting data from API ');
    };

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
      $log.info("searching for " + username);
      github.getUser(username)
        .then(onUserComplete, onError);
      if (contdownInterval) {
        $interval.cancel(contdownInterval); 
        $scope.countdown = null;
      }

    };

    startCountdown();

  };

  app.controller('mainCtrl', ['$scope', 'github', '$interval', '$log', '$location', '$anchorScroll', mainCtrl]);

}());