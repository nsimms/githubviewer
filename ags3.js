(function() {
  var app = angular.module('app', []);

  var mainCtrl = function($scope, $http) {
    var vm = this;
    vm.message = 'GitHub Viewer';

    $scope.username = "angular";
    $scope.reposOrderBy = '-stargazers_count';
    
    var onRepos = function(response) {
      console.log("Repo data retrieval complete...");
      
      $scope.repos = response.data;
    };

    var onUserComplete = function(response) {

      console.log("User data retrieval complete...");

      var person = {
        firstName: response.data.login,
        lastName: response.data.login,
        imageSrc: response.data.avatar_url,
        repos: response.data.repos_url
      };

      $scope.person = person; 

      $http.get(person.repos)
        .then(onRepos, onError);

    };

    var onError = function(reason) {
      console.log('error gettting data from API ');
    };

    $scope.search = function(username) {
      $http.get('https://api.github.com/users/' + username)
        .then(onUserComplete, onError);
    };
  };

  app.controller('mainCtrl', ['$scope', '$http', mainCtrl]);

}());