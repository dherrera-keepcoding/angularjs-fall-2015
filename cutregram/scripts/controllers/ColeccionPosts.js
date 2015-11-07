
// Controlador encargado de la lógica correspondiente con vista de colección de posts.
angular.module("cutregram").controller("ColeccionPostsCtrl", function($scope, Posts, $location, $timeout) {

    // Almacenamos en local la colección de posts para que no se muestren
    // todos directamente en la vista.
    var posts = Posts.data;

    // Establecemos las propiedades del paginador.
    $scope.paginador = {

        // Cambiamos de página.
        cambioDePagina: function() {
            // Obtenemos el primer y último elemento de la página a mostrar.
            var primero = ($scope.paginador.paginaActual - 1) * $scope.paginador.elementosPorPagina;
            var ultimo = primero + $scope.paginador.elementosPorPagina;
            // Establecemos en la vista la página seleccionada.
            $scope.posts = posts.slice(primero, ultimo);
        },

        // Página actual.
        paginaActual: 1,

        // Total de elementos -posts-.
        totalElementos: posts.length,

        // Tamaño de página.
        elementosPorPagina: 20
    };

    // Forzamos el cambio de página para que traiga la primera al entrar a la vista.
    $scope.paginador.cambioDePagina();

    // Redirigir el navegador al detalle del post indicado.
    $scope.navegar = function(idPost) {

        // Forzamos el ciclo digest con ejecutando la redirección dentro de un $timeout.
        $timeout(function() { $location.path("/detalle/" + idPost); }, 100);
    };

});