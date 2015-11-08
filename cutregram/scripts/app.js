
// Definición de la aplicación.
angular.module("cutregram", ["ngRoute", "angular-loading-bar", "ui.bootstrap"]);

// En fase de config, inyectamos $httpProvider para configurar las cabeceras
// por defecto de los distintos métodos HTTP del servicio $http, que usamos
// para pedir los datos al servidor.
angular.module("cutregram").config(function(BackendProvider, Properties) {

    BackendProvider.establecerApiKey(Properties.apiKey);
    BackendProvider.habilitarPeticionesCors();
    BackendProvider.establecerUrlBackend(Properties.backendUrl);
});

// En fase de config, inyectamos cfpLoadingBarProvider para configurar
// la barra de progreso que se muestra con las peticiones HTTP.
angular.module("cutregram").config(function(cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeSpinner = false
});

// En fase de config inyectamos $routeProvider para configurar las rutas de la aplicación.
angular.module("cutregram").config(function($routeProvider) {

    // Definir la ruta de "Todos los posts".
    $routeProvider.when("/todos", {
        controller: "ColeccionPostsCtrl",
        templateUrl: "views/ColeccionPosts.html",
        // En "resolve" establecemos todas aquellas dependencias que tenga el controlador.
        // Tenemos que usar la anotación de array en línea.
        resolve: {
            Posts: ["Backend", function(Backend) {
                return Backend.obtenerTodosLosPosts();
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
            Posts: ["Backend", function(Backend) {
                return Backend.obtenerMisPosts();
            }]
        }
    });

    // Difinir la ruta de "Nuevo Post".
    $routeProvider.when("/nuevo", {
        controller: "NuevoPostCtrl",
        templateUrl: "views/NuevoPost.html"
    });

    // Definir la ruta de "Detalle de Post".
    $routeProvider.when("/detalle/:idPost", {
        controller: "DetallePostCtrl",
        templateUrl: "views/DetallePost.html",
        // En "resolve" establecemos todas aquellas dependencias que tenga el controlador.
        // Tenemos que usar la anotación de array en línea.
        resolve: {
            Post: ["Backend", "$route", function(Backend, $route) {
                return Backend.obtenerPost($route.current.params.idPost);
            }]
        }
    });

    // Configuramos una ruta por defecto.
    $routeProvider.otherwise({
        redirectTo: "/todos"
    });

});