const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLivros = require('../fixtures/postLivros.json');
const data = require('../models/data.js');
const app = require('../app.js');
const { obterToken } = require('../helpers/autenticacao');

describe ('Livros', () => {

    let token;
    before(async() =>{
        token = await obterToken('ludmila.avila@teste.com', '123456')     
    })   

    describe ('POST /livros', ()=> {

        before(() => {
            data.livros.length = 0;
        })
        it ('Deve retornar 201 quando livro cadastrado com sucesso', async () => {
            const bodyLivros = { ...postLivros }

            const respostaLivros = await request(app)            
                .post('/livros')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyLivros)
            data.seed()
            
            expect(respostaLivros.status).to.equal(201)
            expect(respostaLivros.body.message).to.be.a('string')
            expect(respostaLivros.body.message).to.equal('Livro cadastrado com sucesso.')
        })

        it ('Deve retornar 400 quando não informar campos obrigatórios', async () => {
            const respostaLivros = await request(app)            
                .post('/livros')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            
            expect(respostaLivros.status).to.equal(400)
            expect(respostaLivros.body.message).to.be.a('string')
            expect(respostaLivros.body.message).to.equal('Título, autor e descrição são obrigatórios.')
        })
    })

    describe ('GET /livros', ()=> {

        it ('Deve retornar 200 quando buscar lista de livros do usuário', async () => {
            const respostaGetLivros = await request(app)            
                .get('/livros')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)                
            
            expect(respostaGetLivros.status).to.equal(200)
            if (respostaGetLivros.body.length >= 1) {
                expect(respostaGetLivros.body[0].id).to.be.a('string') 
                expect(respostaGetLivros.body[0].titulo).to.be.a('string') 
                expect(respostaGetLivros.body[0].autor).to.be.a('string') 
            }
        })

        it ('Deve retornar 405 quando enviar método PUT não permitido para este endpoint', async () => {
            const respostaGetLivros = await request(app)            
                .put('/livros')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)                
            
            expect(respostaGetLivros.status).to.equal(405)
            expect(respostaGetLivros.body.message).to.equal('Método não permitido.') 
        })

        it ('Deve retornar 405 quando enviar método DELETE não permitido para este endpoint', async () => {
            const respostaGetLivros = await request(app)            
                .delete('/livros')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)                
            
            expect(respostaGetLivros.status).to.equal(405)
            expect(respostaGetLivros.body.message).to.equal('Método não permitido.') 
        })
    })
})