//const { usuarios } = require('../models/data');
const data = require('../models/data'); 
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.cadastrar = (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }
  if (data.usuarios.find(u => u.email === email)) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  }
  const hash = bcrypt.hashSync(senha, 8);
  const usuario = { id: uuidv4(), nome, email, senha: hash };
  data.usuarios.push(usuario);
  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
};
