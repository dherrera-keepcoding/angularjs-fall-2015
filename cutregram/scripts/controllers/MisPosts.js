
// Controlador encargado de la lógica correspondiente con vista de mis de posts.
angular.module("cutregram").controller("MisPostsCtrl", function($scope, $http) {

    // Hacemos la petición de mis posts al servidor.
    $http.get("http://cutregram-sp.appspot.com/api/1/posts/me").then(

        // La petición al servidor fue correcta.
        function(respuesta) {
            $scope.posts = respuesta.data;
        },

        // Ocurrió algo malo al ir al servidor.
        function(error) {
            // ¿Mostrar mensaje de error al usuario? ¿Mostrar traza en consola?
        }
    );

});