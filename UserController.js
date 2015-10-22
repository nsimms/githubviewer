(function() {
  var app = angular.module('githubViewer');

  var UserController = function($scope, github, $log, $routeParams, $location) {


    var onUserComplete = function(data) {
      console.log("User data retrieval complete...");

      var person = {
        firstName: data.login,
        lastName: data.login,
        imageSrc: data.avatar_url,
        repos: data.repos_url,
        login: data.login
      };

      $scope.person = person;

      github.getRepos(person)
        .then(onRepos, onError);

    };

    var onRepos = function(data) {
      $log.info("Repo data retrieval complete...");

      $scope.repos = data;
    };

    var onError = function(reason) {
      $log.info('error gettting data from API ');
    };

    $scope.reposOrderBy = '-stargazers_count';
    $scope.username = $routeParams.username;
    github.getUser($scope.username)
      .then(onUserComplete, onError);

    $scope.repoDetails = function() {
      $log("in repo deets");
      //$location.path("/repo");
    };

  };



  app.controller('UserController', ['$scope', 'github', '$log', '$routeParams', '$location', UserController]);

}());