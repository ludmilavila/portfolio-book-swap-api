const data = require('../models/data');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'bookswap_secret';

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const usuario = data.usuarios.find(u => u.email === email);
  if (!usuario) return res.status(401).json({ message: 'Credenciais inválidas.' });
  if (!bcrypt.compareSync(senha, usuario.senha)) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
};
