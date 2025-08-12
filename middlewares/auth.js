const jwt = require('jsonwebtoken');
const SECRET = 'bookswap_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido.' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Autenticação necessária ou inválida.' });
    req.user = user;
    next();
  });
};
