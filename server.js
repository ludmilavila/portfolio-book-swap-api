const app = require('./app');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
