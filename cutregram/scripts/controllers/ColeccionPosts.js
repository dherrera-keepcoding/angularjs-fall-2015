
// Controlador encargado de la lógica correspondiente con vista de colección de posts.
angular.module("cutregram").controller("ColeccionPostsCtrl", function($scope, Posts) {

    $scope.posts = Posts.data;

});