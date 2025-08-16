const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const auth = require('../middlewares/auth');

router.post('/', auth, matchController.criarMatch);
router.post('/:id/resposta', auth, matchController.responderMatch);

router.all('/', (req, res) => {
  res.status(405).json({ message: 'Método não permitido.' });
});

module.exports = router;
