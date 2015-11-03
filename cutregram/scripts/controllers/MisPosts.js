
// Controlador encargado de la lógica correspondiente con vista de mis de posts.
angular.module("cutregram").controller("MisPostsCtrl", function($scope, Posts) {

    $scope.posts = Posts.data;

});