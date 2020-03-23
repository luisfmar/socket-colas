const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {
  client.on('entrarChat', (usuario, cb) =>{
    let missingNombre = !usuario || !usuario.nombre || !usuario.sala;
    console.log(usuario);
    if (missingNombre) {
      return cb({err: true, msg: 'El nombre o sala es necesario'});
    }

    client.join(usuario.sala);

    let personas = usuarios.agregarUsuario(client.id, usuario.nombre, usuario.sala);

    client.broadcast.to(usuario.sala).emit('listaPersonas', { usuario: usuarios.getUsuarioPorSala(usuario.sala) });
    cb({personas});
  });

  client.on('crearMensaje', (data) => {
    let personaOrigen = usuarios.getUsuario(client.id);
    let mensaje = crearMensaje(personaOrigen.nombre, data.mensaje);
    let personaDestino = usuarios.getUsuario(data.id);
    client.broadcast.to(personaDestino.id).emit('crearMensaje',mensaje);
  });

  client.on('mensajePrivado', (data) => {
    let persona = usuarios.getUsuario(client.id);
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.emit('crearMensaje',mensaje);
  });

  client.on('disconnect', () => {
    let usuarioBorrado = usuarios.borrarUsuario(client.id);
    if (usuarioBorrado) {
      console.log(usuarioBorrado);
      client.broadcast.to(usuarioBorrado.sala).emit('crearMensaje',crearMensaje('Administrador', `${usuarioBorrado.nombre} abandonó el chat`));
      client.broadcast.to(usuarioBorrado.sala).emit('listaPersonas', { usuario: usuarios.getUsuarioPorSala(usuarioBorrado.sala) });
    }
  });
});

