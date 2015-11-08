
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
        $get: ["$http", "$q", function($http, $q) {

            return {

                // Obtenemos todos los posts.
                obtenerTodosLosPosts: function() {
                    return $http.get(urlBackend + "/posts");
                },

                // Obtenemos los posts del usuario "en sesión".
                obtenerMisPosts: function() {
                    return $http.get(urlBackend + "/posts/me");
                },

                // Obtenemos el post indicado.
                obtenerPost: function(idPost) {
                    return $http.get(urlBackend + "/posts/" + idPost);
                },

                // Creamos un nuevo post.
                crearPost: function(post) {
                    return $http.post(urlBackend + "/posts", post);
                },

                // Subimos una imagen al blobstore del backend.
                subirImagen: function(documento) {

                    // Creamos un objeto diferido.
                    var diferido = $q.defer();

                    // Primero, obtenemos el endpoint de subida de imagen.
                    $http.get(urlBackend + "/images/upload/url").then(
                        function(respuesta1) {

                            // Obtenemos el endpoint de la respuesta.
                            var endpoint = respuesta1.data.upload_url;

                            // Establecemos el documento de imagen como datos de formulario.
                            var fd = new FormData();
                            fd.append("file", documento);

                            // Establecemos la configuración de la petición.
                            // Debemos indicar la cabecera Content-Type como 'undefined' para forzar que
                            // AngularJS la establezca según los datos de la petición.
                            var configuracion = {
                                transformRequest: angular.identity,
                                headers: { "Content-Type": undefined }
                            };

                            // Subimos la imagen.
                            $http.post(endpoint, fd, configuracion).then(

                                // Resolvemos el objeto diferido.
                                function(respuesta2) { diferido.resolve(respuesta2); },

                                // Rechazamos el objeto diferido en caso de error.
                                function() { diferido.reject(); }
                            );
                        },
                        // Rechazamos el objeto diferido en caso de error.
                        function() { diferido.reject(); }
                    );

                    // Retornamos la promesa del diferido.
                    return diferido.promise;
                },

                // Sumamos un "me gusta" al post indicado.
                sumarMeGusta: function(idPost) {
                    return $http.post(urlBackend + "/posts/" + idPost + "/like");
                },

                // Sumamos un "no me gusta" al post indicado.
                sumarNoMeGusta: function(idPost) {
                    return $http.post(urlBackend + "/posts/" + idPost + "/dislike");
                },

                // Añadimos un nuevo comentario.
                enviarComentario: function(idPost, comentario) {
                    return $http.post(urlBackend + "/posts/" + idPost + "/comments", comentario);
                }
            };
        }]
    };


});