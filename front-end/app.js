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

app.config(function($routeProvider) {
    $routeProvider
    .when("/front-end/casual.html", {
        templateUrl: "/front-end/casual.html"
    });
});

