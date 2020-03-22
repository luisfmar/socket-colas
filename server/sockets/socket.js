const { io } = require('../server');

io.on('connection', (client) => {
  console.log('Usuario conectado');
  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  client.emit('enviarMensaje', {
    usuario: 'Administrador',
    mensaje: 'Bienvenido a esta aplicación'
  });

  // Escuchar mensaje del cliente
  client.on('enviarMensaje', (data, cb) => {
    console.log(data);
    client.broadcast.emit('enviarMensaje', data);
    /*
    if (data.usuario) {
      return cb({
        resp: 'TODO SALIO BIEN!'
      });
    } else {
      return cb({
        resp: 'TODO SALIO MAL!!!'
      });
    }
    */
  });
});