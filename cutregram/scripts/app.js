
// Definición de la aplicación.
angular.module("cutregram", ["ngRoute"]);

// En fase de config, inyectamos $httpProvider para configurar las cabeceras
// por defecto de los distintos métodos HTTP del servicio $http, que usamos
// para pedir los datos al servidor.
angular.module("cutregram").config(function($httpProvider, Properties) {

    // Configuramos el servicio $http para que envíe la cabecera necesaria al
    // servidor en todas las peticiones. En este caso, enviarmos la API Key para
    // firmar las acciones.
    $httpProvider.defaults.headers.common = {
        "X-Cutregram-Api-Key": Properties.apiKey
    };

    // Configuramos las cabeceras por defecto para evitar problemas de CORS.
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});

// En fase de config inyectamos $routeProvider para configurar las rutas de la aplicación.
angular.module("cutregram").config(function($routeProvider, Properties) {

    // Definir la ruta de "Todos los posts".
    $routeProvider.when("/todos", {
        controller: "ColeccionPostsCtrl",
        templateUrl: "views/ColeccionPosts.html",
        // En "resolve" establecemos todas aquellas dependencias que tenga el controlador.
        // Tenemos que usar la anotación de array en línea.
        resolve: {
            Posts: ["$http", function($http) {
                return $http.get(Properties.backendUrl + "/posts", {
                    cache: true
                });
            }]
        }
    });

    // Definir la ruta de "Mis posts".
    $routeProvider.when("/mios", {
        controller: "MisPostsCtrl",
        templateUrl: "views/MisPosts.html",
        // En "resolve" establecemos todas aquellas dependencias que tenga el controlador.
        // Tenemos que usar la anotación de array en línea.
        resolve: {
            Posts: ["$http", function($http) {
                return $http.get(Properties.backendUrl + "/posts/me", {
                    cache: true
                });
            }]
        }
    });

    // Configuramos una ruta por defecto.
    $routeProvider.otherwise({
        redirectTo: "/todos"
    });

});