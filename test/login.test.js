const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');
const data = require('../models/data.js');
const app = require('../app.js');

describe ('Login', () => {
    
    describe ('POST /login', ()=> {
        it ('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const bodyLogin = { ...postLogin }

            const respostaLogin = await request(app)            
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
                
            expect(respostaLogin.status).to.equal(200)
            expect(respostaLogin.body.token).to.be.a('string')
        })
    })
})