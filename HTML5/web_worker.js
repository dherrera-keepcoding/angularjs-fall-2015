
// Tarea que se ejecuta en segundo plano.
function countdown(start) {

    // Notificamos el número al worker.
    postMessage(start);

    // Restamos 1 al contador.
    start -= 1;

    // Esperamos 1 segundo y llamamos a la función
    // de nuevo.
    setTimeout(function() { countdown(start) }, 1000);
}

// Iniciamos la cuenta atrás.
countdown(10);