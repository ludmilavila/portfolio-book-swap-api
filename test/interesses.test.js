const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postInteresses = require('../fixtures/postInteresses.json');
const data = require('../models/data.js');
const app = require('../app.js');
const { obterToken } = require('../helpers/autenticacao');

describe ('Interesses', () => {

    let token;
    before(async() =>{
        token = await obterToken('ludmila.avila@teste.com', '123456')     
    })   

    describe ('POST /interesses', ()=> {

        before(() => {
            data.interesses.length = 0;
        })
        it ('Deve retornar 201 quando interesse em livro cadastrado com sucesso', async () => {
            const bodyInteresses = { ...postInteresses }

            const respostaInteresses = await request(app)            
                .post('/interesses')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyInteresses)
                data.seed()

            expect(respostaInteresses.status).to.equal(201)
            expect(respostaInteresses.body.message).to.be.a('string')
            expect(respostaInteresses.body.message).to.equal('Interesse cadastrado com sucesso.')
        })

         it ('Deve retornar 400 quando informar interesse já cadastrado', async () => {
            const bodyInteresses = { ...postInteresses }

            const respostaInteresses = await request(app)            
                .post('/interesses')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyInteresses)

            expect(respostaInteresses.status).to.equal(400)
            expect(respostaInteresses.body.message).to.be.a('string')
            expect(respostaInteresses.body.message).to.equal('Interesse já cadastrado para este livro.')
        })
    })

    describe ('GET /interesses', ()=> {

        it ('Deve retornar 200 ao buscar interesses de livros do usuário logado', async () => {
            const respostaGetInteresses = await request(app)     
                .get('/interesses')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(respostaGetInteresses.status).to.equal(200)
            if (respostaGetInteresses.body.length >= 1) {
                expect(respostaGetInteresses.body[0].id).to.be.a('string') 
                expect(respostaGetInteresses.body[0].livroId).to.be.a('string') 
                expect(respostaGetInteresses.body[0].usuarioId).to.be.a('string') 
            }
        })

        it ('Deve retornar 405 quando enviar método PUT não permitido para este endpoint', async () => {
            const respostaGetInteresses = await request(app)     
                .put('/interesses')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(respostaGetInteresses.status).to.equal(405)
            expect(respostaGetInteresses.body.message).to.equal('Método não permitido.') 
        })

        it ('Deve retornar 405 quando enviar método DELETE não permitido para este endpoint', async () => {
            const respostaGetInteresses = await request(app)     
                .delete('/interesses')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            expect(respostaGetInteresses.status).to.equal(405)
            expect(respostaGetInteresses.body.message).to.equal('Método não permitido.') 
        })
    })
})

