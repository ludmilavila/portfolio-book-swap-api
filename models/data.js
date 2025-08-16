module.exports = {
  usuarios: [],        
  livros: [],          
  interesses: [],      
  matches: [],         
  
  reset() {
    this.usuarios = [];    
    this.livros = [];      
    this.interesses = [];  
    this.matches = [];     
  },

  seed() {
    this.usuarios.push({
      id: '1',
      nome: 'Usuário Teste 1',
      email: 'teste1@teste.com',
      senha: '654321'
    });

    this.livros.push({
      id: '1',
      titulo: 'Poder sem Limites',
      autor: 'Anthony Robbins',
      genero: 'Autoajuda',
      descricao: 'Um livro sobre desenvolvimento pessoal e superação de limites',
      usuarioId: '1',
      disponivel: true
    });
  }
};