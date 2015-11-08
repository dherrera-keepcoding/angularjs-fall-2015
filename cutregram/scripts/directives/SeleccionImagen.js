
angular.module("cutregram").directive("seleccionImagen", function($timeout) {

    return {

        templateUrl: "views/SeleccionImagen.html",
        scope: {
            imagenSeleccionada: "&"
        },
        link: function(scope, elemento) {

            // Flag para indicar cuando se está arrastrando una imagen sobre la directiva.
            scope.documentoEnArrastre = false;

            // Ruta o Base64 de la imagen. Por defecto, establecemos una imagen de fondo.
            scope.rutaImagen = "images/seleccion-por-defecto.png";

            // Obtenemos el elemento de la zona de arrastre.
            var zonaArrastre = elemento[0].children[0];

            // Suscripción al evento 'documento entra en la zona de arrastre'.
            zonaArrastre.addEventListener(
                "dragenter",
                function(evento) {
                    // Evitamos la propagación del evento en la jerarquía de elementos.
                    evento.preventDefault();
                    evento.stopPropagation();
                    // Establecemos la clase CSS 'transparencia', y lo hacemos dentro de
                    // un $timeout para garantizar que se ejecuta en un ciclo digest.
                    $timeout(function() { scope.documentoEnArrastre = true; }, 1);
                },
                false
            );

            // Suscripción al evento 'documento sobre la zona de arrastre'.
            zonaArrastre.addEventListener(
                "dragover",
                function(evento) {
                    // Evitamos la propagación del evento en la jerarquía de elementos.
                    evento.preventDefault();
                    evento.stopPropagation();
                },
                false
            );

            // Suscripción al evento 'documento sale de la zona de arrastre'.
            zonaArrastre.addEventListener(
                "dragleave",
                function(evento) {
                    // Evitamos la propagación del evento en la jerarquía de elementos.
                    evento.preventDefault();
                    evento.stopPropagation();
                    // Eliminamos la clase CSS 'transparencia', y lo hacemos dentro de
                    // un $timeout para garantizar que se ejecuta en un ciclo digest.
                    $timeout(function() { scope.documentoEnArrastre = false; }, 1);
                },
                false
            );

            // Suscripción al evento 'se suelta un documento sobre la zona de arrastre'.
            zonaArrastre.addEventListener(
                "drop",
                function(evento) {

                    // Evitamos la propagación del evento en la jerarquía de elementos.
                    evento.preventDefault();
                    evento.stopPropagation();

                    // Obtenemos el documento que se está arrastrando sobre la directiva.
                    var documento = evento.dataTransfer.files[0];

                    // Solo en caso de que sea una imagen.
                    if (documento.type.match(/image.*/)) {

                        // Creamos un FileReader para leer la imagen.
                        var lectorDocumento = new FileReader();

                        // Establecemos el evento 'onload' del FileReader, que se
                        // dispara cuando finaliza la lectura del documento.
                        lectorDocumento.onload = function() {

                            // Dentro de un $timeout.
                            $timeout(function() {

                                // Establecemos la imagen en Base64 como ruta para pintarla en pantalla.
                                scope.rutaImagen = lectorDocumento.result;

                                // Eliminamos la clase CSS 'transparencia', y lo hacemos dentro de
                                // un $timeout para garantizar que se ejecuta en un ciclo digest.
                                scope.documentoEnArrastre = false;

                                // Notificamos el documento seleccionado.
                                scope.imagenSeleccionada({ $imagen: documento });
                            });
                        };

                        // Leemos el documento como Base64.
                        lectorDocumento.readAsDataURL(documento);
                    }
                },
                false
            );

        }
    };
});
