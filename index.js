const app = require('./app');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota raiz
app.get('/', (req, res) => res.json({ message: 'Book Swap API' }));

// Inicializar servidor
app.listen(7000, () => {
  console.log('Book Swap API rodando na porta 7000. Swagger em /api-docs');
});
