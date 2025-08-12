const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usuarioRoutes = require('./routes/usuarioRoutes');
const livroRoutes = require('./routes/livroRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const matchRoutes = require('./routes/matchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes);
app.use('/livros', livroRoutes);
app.use('/interesses', interesseRoutes);
app.use('/matches', matchRoutes);

app.get('/', (req, res) => res.json({ message: 'Book Swap API' }));

app.listen(7000, () => {
  console.log('Book Swap API rodando na porta 7000. Swagger em /api-docs');
});
