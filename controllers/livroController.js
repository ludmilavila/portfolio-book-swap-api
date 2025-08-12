const { livros } = require('../models/data');
const { v4: uuidv4 } = require('uuid');

exports.cadastrar = (req, res) => {
  const { titulo, autor, descricao } = req.body;
  if (!titulo || !autor || !descricao) {
    return res.status(400).json({ message: 'Título, autor e descrição são obrigatórios.' });
  }
  const livro = {
    id: uuidv4(),
    titulo,
    autor,
    descricao,
    usuarioId: req.user.id
  };
  livros.push(livro);
  res.status(201).json({ message: 'Livro cadastrado com sucesso.' });
};

exports.listar = (req, res) => {
  const meusLivros = livros.filter(l => l.usuarioId === req.user.id);
  res.json(meusLivros);
};
