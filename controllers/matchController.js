const data = require('../models/data');
const { v4: uuidv4 } = require('uuid');

exports.criarMatch = (req, res) => {
  const { interesseId } = req.body;
  const interesse = data.interesses.find(i => i.id === interesseId);
  if (!interesse) return res.status(400).json({ message: 'Interesse não encontrado.' });
  const livro = data.livros.find(l => l.id === interesse.livroId);
  if (!livro) return res.status(400).json({ message: 'Livro não encontrado.' });
  if (data.matches.find(m => m.livroId === livro.id && m.interessadoId === interesse.usuarioId)) {
    return res.status(400).json({ message: 'Match já existente.' });
  }
  const match = {
    id: uuidv4(),
    livroId: livro.id,
    donoId: livro.usuarioId,
    interessadoId: interesse.usuarioId,
    status: 'pendente'
  };
  data.matches.push(match);
  res.status(201).json({ message: 'Match criado com sucesso.', match });
};

exports.responderMatch = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const match = data.matches.find(m => m.id === id);
  if (!match) return res.status(400).json({ message: 'Match não encontrado.' });
  if (![match.donoId, match.interessadoId].includes(req.user.id)) {
    return res.status(401).json({ message: 'Acesso negado.' });
  }
  if (!['aceito', 'recusado'].includes(status)) {
    return res.status(400).json({ message: 'Status inválido.' });
  }
  match.status = status;
  res.json({ message: `Match ${status} com sucesso.` });
};
