
// Directiva que representa cada fila en una colección de posts.
angular.module("cutregram").directive("elementoPost", function(Backend) {

    return {

        // Con restrict indicamos si usar la directiva como elemento (E) o como atributo (A).
        restrict: "AE",

        // Con template / templateUrl establecemos la vista de la directiva.
        templateUrl: "views/ElementoPost.html",

        // Con scope establecemos la interfaz de comunicación.
        scope: {
            post: "=" // Con = establecemos enlace bidireccional.
        },

        // En link establecemos la lógica de la directiva y manipulamos el DOM en caso de necesitarlo.
        link: function(scope) {

            scope.meGusta = function() {
                Backend.sumarMeGusta(scope.post.id).then(
                    function() {
                        scope.post.likes++;
                    }
                );
            };

            scope.noMeGusta = function() {
                Backend.sumarNoMeGusta(scope.post.id).then(
                    function() {
                        scope.post.dislikes++;
                    }
                );
            };
        }
    };
});