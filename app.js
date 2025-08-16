const express = require('express');
const data = require('./models/data');
const app = express();
app.use(express.json());

// Importar todas as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const interesseRoutes = require('./routes/interesseRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Registrar todas as rotas
app.use('/usuarios', usuarioRoutes);      
app.use('/auth', authRoutes);             
app.use('/livros', livroRoutes);          
app.use('/interesses', interesseRoutes);  
app.use('/matches', matchRoutes);         

module.exports = app;
