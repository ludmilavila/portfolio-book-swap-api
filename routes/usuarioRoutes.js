const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.cadastrar);

// Para qualquer outro método em "/", retorna 405
router.all('/', (req, res) => {
  res.status(405).json({ message: 'Método não permitido.' });
});

module.exports = router;
