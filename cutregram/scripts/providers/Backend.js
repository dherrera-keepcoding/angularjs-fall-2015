
angular.module("cutregram").provider("Backend", function($httpProvider) {

    var urlBackend = "";

    return {

        // Con esta función establecemos el API Key del backend.
        establecerApiKey: function(valor) {
            $httpProvider.defaults.headers.common = {
                "X-Cutregram-Api-Key": valor
            };
        },

        // Con esta función habilitamos cruce de dominio en las peticiones.
        habilitarPeticionesCors: function() {
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
        },

        // Con esta función establecemos la URL del backend.
        establecerUrlBackend: function(valor) {
            urlBackend = valor;
        },

        // Definimos el factory que se inyectará en fase de run.
        $get: ["$http", function($http) {

            return {

                // Obtenemos todos los posts.
                obtenerTodosLosPosts: function() {
                    return $http.get(urlBackend + "/posts", {
                        cache: true
                    });
                },

                // Obtenemos los posts del usuario "en sesión".
                obtenerMisPosts: function() {
                    return $http.get(urlBackend + "/posts/me", {
                        cache: true
                    });
                }
            };

        }]
    };


});