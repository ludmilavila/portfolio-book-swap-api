const { interesses, livros } = require('../models/data');
const { v4: uuidv4 } = require('uuid');

exports.cadastrar = (req, res) => {
  const { livroId } = req.body;
  const livro = livros.find(l => l.id === livroId);
  if (!livro) return res.status(404).json({ message: 'Livro não encontrado.' });
  if (livro.usuarioId === req.user.id) {
    return res.status(400).json({ message: 'Não é possível cadastrar interesse em seu próprio livro.' });
  }
  if (interesses.find(i => i.livroId === livroId && i.usuarioId === req.user.id)) {
    return res.status(400).json({ message: 'Interesse já cadastrado para este livro.' });
  }
  const interesse = {
    id: uuidv4(),
    livroId,
    usuarioId: req.user.id
  };
  interesses.push(interesse);
  res.status(201).json({ message: 'Interesse cadastrado com sucesso.' });
};

exports.listar = (req, res) => {
  const meusInteresses = interesses.filter(i => i.usuarioId === req.user.id);
  res.json(meusInteresses);
};
