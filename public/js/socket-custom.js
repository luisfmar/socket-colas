var socket = io();

// escuchar del servidor
socket.on('connect', function () {
  console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
  console.log('Perdida conexión con el servidor');
});

// escuchar mensaje del servidor
socket.on('enviarMensaje', function (data) {
  console.log('servidor', data);
});

// enviar informacion al servidor
socket.emit('enviarMensaje', {
  usuario: 'Luis',
  mensaje: 'Hola mundo'
}, function( res ) {
  console.log('Respuesta del servidor', res);
});