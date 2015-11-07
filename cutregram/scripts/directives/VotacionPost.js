
angular.module("cutregram").directive("votacionPost", function(Backend) {

    return {
        restrict: "E",
        templateUrl: "views/VotacionPost.html",
        scope: {
            post: "="
        },
        link: function (scope) {

            scope.meGusta = function(evento) {

                // Paramos la propagación del evento click para evitar que se dispare el click del elemento <tr>.
                evento.stopPropagation();

                // Enviamos el "me gusta" al servidor.
                Backend.sumarMeGusta(scope.post.id).then(
                    function() {
                        scope.post.likes++;
                    }
                );
            };

            scope.noMeGusta = function(evento) {

                // Paramos la propagación del evento click para evitar que se dispare el click del elemento <tr>.
                evento.stopPropagation();

                // Enviamos el "no me gusta" al servidor.
                Backend.sumarNoMeGusta(scope.post.id).then(
                    function() {
                        scope.post.dislikes++;
                    }
                );
            };
        }
    };

});