var app = angular.module('myApp', ['ngRoute', 'myControllers']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'partials/home'
    })
    .when('/addPost', {
      controller: 'AddController',
      templateUrl: 'partials/addPost'
    })
    .when('/editPost/:id', {
      controller: 'EditController',
      templateUrl: 'partials/editPost'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);
