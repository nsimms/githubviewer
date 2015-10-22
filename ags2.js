(function() {
var app = angular.module('app', []);

var mainCtrl = function($scope, $http) {
  var vm = this;
  vm.message = 'Hi There';
  //$scope.message = 'Hi There';

  /*
      var person = {
      firstName: 'Nev',
      lastName: 'Simms',
      imageSrc: 'http://upfront.asia/images/logo-upfront-media.svg'
    }
    
    vm.person = person;
  */

  /*
  use http.get method with promise syntax because data not necessarily returned immediately so we set a then 
  function to execute passing in the response data. Alternatively We could define a separate named function which accepts response 
  as a parameter and invoke that function.
  Optionally pass a second function as a parameter to the then promise method for if the "get" fails for any reason. the reason for the failure can be retrieved from the reason 
  object passed into your function or you can simply write your own err message to the user and log something more revealing from the reaon object to your system log. simulate 
  a failed call by breaking the url
  */
  $http.get('https://api.github.com/users/nsimms')
    .then(function(response) {

      //Can assign the returned data to a variable or use it directly
      //var rdata = response.data;

      var person = {
        firstName: response.data.login,
        lastName: response.data.login,
        imageSrc: response.data.avatar_url
      };
      $scope.person = person;
      
      
    }, function(reason) {
      console.log('error gettting data from API');
    });
};

app.controller('main', ['$scope', '$http', mainCtrl]);

}());