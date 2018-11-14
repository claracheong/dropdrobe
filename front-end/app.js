var angularApp = angular.module('angularApp', ["ngRoute"]);

var maincontroller = function($scope, $http) {
    $http({
  method: 'GET',
  url: 'http://localhost:3000/main'
}).then(function successCallback(response) {
    console.log(response);
    $scope.items = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}

maincontroller.$inject = ['$scope', '$http'];
angularApp.controller('maincontroller', maincontroller);

var lookscontroller = function($scope, $http) {
}

lookscontroller.$inject = ['$scope', '$http'];
angularApp.controller('lookscontroller', lookscontroller);

angularApp.config(function($routeProvider) {
    $routeProvider
    
    .when("/", {
        templateUrl: "main.html", 
        controller: "maincontroller"
    })
    
    .when("/looks", {
        templateUrl: "looks.html",
        controller: "lookscontroller"
    });
});

