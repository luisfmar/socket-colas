
class Usuarios{
  constructor () {
    this.usuarios = [];
  }

  agregarUsuario(id, nombre, sala) {
    let usuario = { id, nombre, sala}
    this.usuarios.push(usuario);
    return this.usuarios.filter( u => u.sala === sala);
  }

  getUsuario(id) {
    let usuarioFiltrados = this.usuarios.filter( u => u.id === id);
    if (usuarioFiltrados && usuarioFiltrados.length > 0) {
      return usuarioFiltrados[0];
    } else {
      return null;
    }
  }

  getUsuarios() {
    return this.usuarios;
  }

  getUsuarioPorSala(sala) {
    let usuarioFiltrados = this.usuarios.filter( u => u.sala === sala);
    return usuarioFiltrados;
  }

  borrarUsuario(id) {
    let usuarioBorrado = this.getUsuario(id);
    this.usuarios = this.usuarios.filter( u =>u.id !== id);
    return usuarioBorrado;
  }
}

module.exports = {
  Usuarios
}