var myControllers = angular.module('myControllers', ['ngRoute']);

myControllers.controller('HomeController', ['$scope', '$http', function($scope, $http){
  $scope.posts = '';
  $scope.loadPosts = function(){
    $http.get('/api/posts')
      .then(function(resp){
        $scope.posts=resp.data.posts;
        //console.log(resp);
      });
  };
  $scope.showMore = function(postId){
    $http.get('/api/post/' + postId)
      .then(function(resp){
        $scope.posts[postId].text = resp.data.text;
        $scope.posts[postId].more = false;
      });
  };
  $scope.deletePost = function(postId){
    console.log('deleting');
    $http.delete('/api/post/' + postId)
      .then(function(resp){
        $scope.loadPosts();
      }, function (resp){
        console.log(resp);
      });
  };

  $scope.loadPosts();
}]);

myControllers.controller('AddController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.form = {};
  $scope.addPost = function(){
    $http.post('/api/post', $scope.form)
      .then(function(resp){
        $scope.form = {};
        $location.path('/');
      });
  };
}]);

myControllers.controller('EditController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
  $scope.form = {};

  $http.get('/api/post/' + $routeParams.id)
    .then(function(resp){
      $scope.form = resp.data;
      console.log(resp);
    });

  $scope.editPost = function(){
    $http.put('/api/post/' + $routeParams.id, $scope.form)
      .then(function(resp){
        $location.path('/');
      });
  };
}]);
