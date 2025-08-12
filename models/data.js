module.exports = {
  usuarios: [],
  livros: [],
  interesses: [],
  matches: [],
  reset() {
    this.usuarios.length = 0;
    this.livros.length = 0;
    this.interesses.length = 0;
    this.matches.length = 0;
  }
};