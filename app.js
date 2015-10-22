(function() {

  var app = angular.module("githubViewer", ["ngRoute"]);



  app.config(function($routeProvider) {
    $routeProvider
      .when("/main", {
        templateUrl: "main.html",
        controller: "MainController"
      })
      .when("/user/:username", {
        templateUrl: "user.html",
        controller: "UserController"
      })
      .when("/repo/:login/:name", {
        templateUrl: "repo.html",
        Controller: "RepoController"
      })
      .otherwise({
        redirectTo: "/main"
      });

  });


}());