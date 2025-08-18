const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const auth = require('../middlewares/auth');

router.post('/', auth, livroController.cadastrar);
router.get('/', auth, livroController.listar);

router.all('/', (req, res) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
