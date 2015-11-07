
// Directiva que representa cada fila en una colección de posts.
angular.module("cutregram").directive("elementoPost", function() {

    return {

        // Con restrict indicamos si usar la directiva como elemento (E) o como atributo (A).
        restrict: "A",

        // Con template / templateUrl establecemos la vista de la directiva.
        templateUrl: "views/ElementoPost.html",

        // Con scope establecemos la interfaz de comunicación.
        scope: {
            post: "=", // Con = establecemos enlace bidireccional.
            onPostClick: "&" // Con & asociamos un manejador del scope padre a un evento de la directiva.
        },

        // En link establecemos la lógica de la directiva y manipulamos el DOM en caso de necesitarlo.
        link: function(scope, elemento) {

            // Añadimos el evento clic al elemento <tr>.
            // NOTA: Al suscribir un elemento a un evento usando jQuery, en vez de AngularJS con su correspondiente
            // directiva, el ciclo digest no se dispara, por lo que tendremos que forzarlo en el manejador definido.
            elemento.bind("click", function() {

                // Al definir una propiedad de la interfaz de comunicación con "&" asociamos un
                // manejador, que será siempre una función, y por tanto podemos ejecutarla como tal.
                scope.onPostClick({ idPost: scope.post.id });
            });
        }
    };
});