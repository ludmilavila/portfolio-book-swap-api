const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postUsuarios = require('../fixtures/postUsuarios.json');
const data = require('../models/data.js');
const app = require('../app.js');

describe ('Usuários', () => {
   
    before(() => {
        data.usuarios = [];
        data.seed();  //insere usuários
    })

    describe ('POST /usuarios', ()=> {

        it ('Deve retornar 201 quando usuário cadastrado com sucesso', async () => {
            const bodyUsuarios = { ...postUsuarios }

            const respostaUsuarios = await request(app)            
                .post('/usuarios')
                .set('Content-Type', 'application/json')
                .send(bodyUsuarios)

            expect(respostaUsuarios.status).to.equal(201)
            expect(respostaUsuarios.body.message).to.be.a('string')
            expect(respostaUsuarios.body.message).to.equal('Usuário cadastrado com sucesso.')
        })

        it ('Deve retornar 400 quando informar usuário já cadastrado', async () => {
            const bodyUsuarios = { ...postUsuarios }

            const respostaUsuarios = await request(app)            
                .post('/usuarios')
                .set('Content-Type', 'application/json')
                .send(bodyUsuarios)

            expect(respostaUsuarios.status).to.equal(400)
            expect(respostaUsuarios.body.message).to.be.a('string')
            expect(respostaUsuarios.body.message).to.equal('E-mail já cadastrado.')
        })

        it ('Deve retornar 400 quando não informar campos obrigatórios', async () => {
            const respostaUsuarios = await request(app)            
                .post('/usuarios')
                .set('Content-Type', 'application/json')
                
            expect(respostaUsuarios.status).to.equal(400)
            expect(respostaUsuarios.body.message).to.be.a('string')
            expect(respostaUsuarios.body.message).to.equal('Nome, e-mail e senha são obrigatórios.')
        })

        it ('Deve retornar 405 quando enviar método PUT não permitido para este endpoint', async () => {
            const bodyUsuarios = { ...postUsuarios }

            const respostaUsuarios = await request(app)            
                .put('/usuarios')
                .set('Content-Type', 'application/json')
                .send(bodyUsuarios)

            expect(respostaUsuarios.status).to.equal(405)
            expect(respostaUsuarios.body.message).to.be.a('string')
            expect(respostaUsuarios.body.message).to.equal('Método não permitido.')
        })

        it ('Deve retornar 405 quando enviar método GET não permitido para este endpoint', async () => {
            const respostaUsuarios = await request(app)            
                .get('/usuarios')
                .set('Content-Type', 'application/json')

            expect(respostaUsuarios.status).to.equal(405)
            expect(respostaUsuarios.body.message).to.be.a('string')
            expect(respostaUsuarios.body.message).to.equal('Método não permitido.')
        })

        it ('Deve retornar 405 quando enviar método DELETE não permitido para este endpoint', async () => {
            const respostaUsuarios = await request(app)            
                .delete('/usuarios')
                .set('Content-Type', 'application/json')
                
            expect(respostaUsuarios.status).to.equal(405)
            expect(respostaUsuarios.body.message).to.be.a('string')
            expect(respostaUsuarios.body.message).to.equal('Método não permitido.')
        })
    })
})