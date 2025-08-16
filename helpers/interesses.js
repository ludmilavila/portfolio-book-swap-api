const request = require('supertest');
const data = require('../models/data');
const app = require('../app.js');
const { obterToken } = require('./autenticacao');

const obterIdInteresse = async (email, senha) => {
    const token = await obterToken(email, senha)
    
    const respostaInteresses = await request(app)     
        .get('/interesses')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    return respostaInteresses.body[0].id
}

module.exports = {
    obterIdInteresse
}
