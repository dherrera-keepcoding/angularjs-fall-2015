
// Controlador encargado de la lógica correspondiente con vista de colección de posts.
angular.module("cutregram").controller("ColeccionPostsCtrl", function($scope, Posts, $location) {

    $scope.posts = Posts.data;

    // Redirigir el navegador al detalle del post indicado.
    $scope.navegar = function(idPost) {

        $location.path("/detalle/" + idPost);
    };

});