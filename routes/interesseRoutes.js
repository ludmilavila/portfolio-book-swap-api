const express = require('express');
const router = express.Router();
const interesseController = require('../controllers/interesseController');
const auth = require('../middlewares/auth');

router.post('/', auth, interesseController.cadastrar);
router.get('/', auth, interesseController.listar);

router.all('/', (req, res) => {
  res.status(405).json({ message: 'Método não permitido.' });
});

module.exports = router;
