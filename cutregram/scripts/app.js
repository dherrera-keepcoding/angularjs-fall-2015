
// Definición de la aplicación.
angular.module("cutregram", []);

// En fase de config, inyectamos $httpProvider para configurar las cabeceras
// por defecto de los distintos métodos HTTP del servicio $http, que usamos
// para pedir los datos al servidor.
angular.module("cutregram").config(function($httpProvider) {

    // Configuramos el servicio $http para que envíe la cabecera necesaria al
    // servidor en todas las peticiones. En este caso, enviarmos la API Key para
    // firmar las acciones.
    $httpProvider.defaults.headers.common = {
        "X-Cutregram-Api-Key": "aqui-va-tu-api-key"
    };

    // Configuramos las cabeceras por defecto para evitar problemas de CORS.
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});