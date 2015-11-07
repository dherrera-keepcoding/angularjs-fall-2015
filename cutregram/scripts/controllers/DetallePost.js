
angular.module("cutregram").controller("DetallePostCtrl", function($scope, Post, Backend) {

    $scope.post = Post.data;

    // Volvemos atrás en el histórico del navegador.
    $scope.volver = function() {

        history.back();
    };

    // Enviamos al servidor un nuevo comentario.
    $scope.enviarComentario = function() {

        var comentario = {
            text: $scope.comentario
        };

        // Enviamos el comentario al servidor.
        Backend.enviarComentario($scope.post.id, comentario).then(

            // Si ha ido bien.
            function(respuesta) {
                // Añadimos el comentario creado en la colección
                // del post. Nos ahorramos ir de nuevo a por el post.
                $scope.post.comments.unshift( respuesta.data );
                // Limpiamos la caja de texto.
                $scope.comentario = "";
            },
            function(error) {
                // TODO: Mostrar el error.
            }
        );
    };

});
