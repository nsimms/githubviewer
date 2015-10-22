(function() {

  var app = angular.module("githubViewer");

  var RepoController = function($scope, $routeParams, github) {
    //$scope.reponame = "Test Repo";

    $scope.login = $routeParams.login;
    $scope.name = $routeParams.name;

    var onRepoComplete = function(data) {
      console.log("Single Repo data retrieval complete...");

      $scope.open_issues_count = data.open_issues_count;
$scope.ownerlogin = data.owner.login;
    };

    var onError = function(reason) {
      $log.info('error gettting data from Repo API ');
    };

    var onContributorsComplete = function(data) {
      console.log("Contributors data retrieval complete...");

      $scope.contributors = data;
     // console.log($scope.contributors);

    };

    github.getRepo($routeParams.login, $routeParams.name)
      .then(onRepoComplete, onError);

    github.getContributors($routeParams.login, $routeParams.name)
      .then(onContributorsComplete, onError);

  };

  app.controller('RepoController', ['$scope', '$routeParams', 'github', RepoController]);


}());