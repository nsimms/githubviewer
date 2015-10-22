//This is my custom service
(function() {


  var github = function($http) {

    var getUser = function(username) {
      //This is tricky to understand. we could just return the promise directly from the http response but Scott says better to go one further dig out the data from the responsee so the
      //controller doesn't have to. in which case need to have a then function responding to the original http response promise and provide another promise to the calling controller that just contains the 
      //data part of the resonse as another promise to the calling controller. Whoa!
      return $http.get('https://api.github.com/users/' + username)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepos = function(user) {
      //console.log(user);
      //console.log('repos  ' + user.repos);
      return $http.get(user.repos)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepo = function(login, name) {
//console.log("https://api.github.com/repos/" + login + "/" + name);
      return $http.get("https://api.github.com/repos/" + login + "/" + name)
        .then(function(response) {
          //console.log(response);
          return response.data;
        });

    };
    
    var getContributors = function(login,name){
      return $http.get("https://api.github.com/repos/" + login + "/" + name + "/contributors")
      .then(function(response){
        return response.data;
      });
    }

    return {
      
      getUser: getUser,
      getRepos: getRepos,
      getRepo: getRepo,
      getContributors: getContributors

    };
  };


  //This is a reference to the existing angular module created in script.js (soon to be renamed app.js) which we use to register our service with on the next line
  var module = angular.module('githubViewer');
  //register our servcie
  module.factory("github", github);

}());