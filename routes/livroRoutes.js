const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const auth = require('../middlewares/auth');

router.post('/', auth, livroController.cadastrar);
router.get('/', auth, livroController.listar);

router.all('/', (req, res) => {
  res.status(405).json({ message: 'Método não permitido.' });
});

module.exports = router;
