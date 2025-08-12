const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

// Retorna 405 para qualquer outro método em /auth/login
router.all('/login', (req, res) => {
  res.status(405).json({ message: 'Método não permitido.' });
});

module.exports = router;
