const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json')
const data = require('../models/data');
const app = require('../app.js');

const obterToken = async (email, senha) => {
    const bodyLogin = { ...postLogin }
    const respostaLogin = await request(app)            
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)
    return respostaLogin.body.token
}

module.exports = {
    obterToken
}