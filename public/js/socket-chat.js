var socket = io();


var searchParams = new URLSearchParams( window.location.search );
if (!searchParams.has('nombre') || !searchParams.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre  y sala son necesario');
}

var nombreString = searchParams.get('nombre');
var salaString = searchParams.get('sala');

var usuario = {
  nombre: nombreString,
  sala: salaString
}

// escuchar del servidor
socket.on('connect', function () {
  socket.emit('entrarChat', usuario, function (res) {
    console.log('Usuarios conectados', res);
  });
});



socket.on('disconnect', function () {
  console.log('Perdida conexión con el servidor');
});

// escuchar cuando se escribe un mensaje
socket.on('crearMensaje', function (data) {
  console.log('servidor', data);
});

// escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function (data) {
  console.log('servidor', data);
});

// escuchar cuando un usuario entra o sale del chat
socket.on('mensajePrivado', function (mensaje) {
  console.log('servidor', mensaje);
});

/*
// enviar informacion al servidor
socket.emit('enviarMensaje', {
  usuario: 'Luis',
  mensaje: 'Hola mundo'
}, function( res ) {
  console.log('Respuesta del servidor', res);
});
*/
