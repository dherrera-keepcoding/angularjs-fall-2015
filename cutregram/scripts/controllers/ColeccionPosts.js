
// Controlador encargado de la lógica correspondiente con vista de colección de posts.
angular.module("cutregram").controller("ColeccionPostsCtrl", function($scope, $http) {

    // Las entidades post vienen representadas por el siguiente JSON.
    // Solo las propiedades "text", "image_url" y "coords" pueden enviarse
    // en un alta; el resto se informan en servidor de manera transparente.

    /*
    {
        "id": 1,
        "text": "Lorem ipsum",
        "image_url": "https://imagen",
        "likes": 0,
        "dislikes": 0,
        "author": "user1",
        "coords": {
            "latitude": 0.5,
            "longitude": -0.5
        }
    }
    */

    // Hacemos la petición de posts al servidor.
    $http.get("http://cutregram-sp.appspot.com/api/1/posts").then(

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