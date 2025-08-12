const { matches, interesses, livros } = require('../models/data');
const { v4: uuidv4 } = require('uuid');

exports.buscarCompatibilidade = (req, res) => {
  // Busca interesses em livros que ainda não viraram match
  const possiveis = interesses.filter(i => {
    const livro = livros.find(l => l.id === i.livroId);
    if (!livro) return false;
    // Não pode ser do próprio usuário
    if (livro.usuarioId === i.usuarioId) return false;
    // Não pode já ter match
    if (matches.find(m => m.livroId === i.livroId && m.interessadoId === i.usuarioId)) return false;
    return true;
  });
  res.json(possiveis);
};

exports.criarMatch = (req, res) => {
  const { interesseId } = req.body;
  const interesse = interesses.find(i => i.id === interesseId);
  if (!interesse) return res.status(400).json({ message: 'Interesse não encontrado.' });
  const livro = livros.find(l => l.id === interesse.livroId);
  if (!livro) return res.status(400).json({ message: 'Livro não encontrado.' });
  if (matches.find(m => m.livroId === livro.id && m.interessadoId === interesse.usuarioId)) {
    return res.status(400).json({ message: 'Match já existente.' });
  }
  const match = {
    id: uuidv4(),
    livroId: livro.id,
    donoId: livro.usuarioId,
    interessadoId: interesse.usuarioId,
    status: 'pendente'
  };
  matches.push(match);
  res.status(201).json({ message: 'Match criado com sucesso.', match });
};

exports.responderMatch = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const match = matches.find(m => m.id === id);
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
