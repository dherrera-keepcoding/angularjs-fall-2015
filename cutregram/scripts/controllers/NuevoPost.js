
angular.module("cutregram").controller("NuevoPostCtrl", function($scope, $location, Backend) {

    // Ceramos un objeto post vacío. Contendrá los datos del formulario
    // correspondientes al nuevo post que se va a crear.
    $scope.post = {};

    // Este flag indica que que el post está guardándose. La idea es mantener el botón
    // de 'Guardar' deshabilitado y que el usuario no lo pulse repetidamente.
    $scope.subiendo = false;

    // Volvemos atrás en el histórico del navegador.
    $scope.volver = function() {

        history.back();
    };

    // Establecemos la imagen del post.
    $scope.seleccionarImagen = function(imagen) {

        $scope.imagen = imagen;
    };

    // Enviamos al servidor el nuevo post.
    $scope.crearPost = function() {

        $scope.subiendo = true;

        // Primero subimos la imagen.
        Backend.subirImagen($scope.imagen).then(

            function(respuesta) {

                // Establecemos la ruta de la imagen en el objeto post.
                $scope.post.image_url = respuesta.data.image_url;

                // Guardamos el post.
                Backend.crearPost($scope.post).then(

                    // Como vamos a redirigir a todos los post, no es necesario recuperar el post recién creado.
                    function() { $location.path("/todos"); },

                    // Mostramos mensaje de error o damos feedback al usuario.
                    function() {
                        $scope.subiendo = false;
                        /* TODO: Mostrar el error. */
                    }
                );
            },

            // Mostramos mensaje de error o damos feedback al usuario.
            function() {
                $scope.subiendo = false;
                /* TODO: Mostrar el error. */
            }
        );
    };

});
