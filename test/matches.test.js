const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postMatches = require('../fixtures/postMatches.json');
const postRespostaMatch = require('../fixtures/postRespostaMatch.json');
const data = require('../models/data.js');
const app = require('../app.js');
const { obterToken } = require('../helpers/autenticacao');
const { obterIdInteresse } = require('../helpers/interesses');

describe ('Matches', () => {

    let token;
    let interesseId;
    let resposta;

    beforeEach(async() =>{
        token = await obterToken('ludmila.avila@teste.com', '123456')
        interesseId = await obterIdInteresse('ludmila.avila@teste.com', '123456')      
    })   

    describe ('POST /matches', ()=> {

        before(() => {
            data.matches.length = 0;
        })
        it ('Deve retornar 201 quando match cadastrado com sucesso', async () => {
            const bodyMatch = { ...postMatches, interesseId: interesseId };

            const respostaMatches = await request(app)            
                .post('/matches')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMatch)
            data.seed();
            resposta = respostaMatches.body.match.id

            expect(respostaMatches.status).to.equal(201)
            expect(respostaMatches.body.message).to.be.a('string')
            expect(respostaMatches.body.message).to.equal('Match criado com sucesso.')
            expect(respostaMatches.body.match.id).to.be.a('string')
            expect(respostaMatches.body.match.livroId).to.be.a('string')
            expect(respostaMatches.body.match.donoId).to.be.a('string')
            expect(respostaMatches.body.match.interessadoId).to.be.a('string')
            expect(respostaMatches.body.match.status).to.be.a('string')
        })

        it ('Deve retornar 400 quando informar match já cadastrado', async () => {
            const bodyMatch = { ...postMatches, interesseId: interesseId };

            const respostaMatches = await request(app)            
                .post('/matches')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMatch)

            expect(respostaMatches.status).to.equal(400)
            expect(respostaMatches.body.message).to.be.a('string')
            expect(respostaMatches.body.message).to.equal('Match já existente.')
        })

        it ('Deve retornar 405 quando enviar método PUT não permitido para este endpoint', async () => {
            const bodyMatch = { ...postMatches, interesseId: interesseId };

            const respostaMatches = await request(app)            
                .put('/matches')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMatch)
    
            expect(respostaMatches.status).to.equal(405)
            expect(respostaMatches.body.message).to.be.a('string')
            expect(respostaMatches.body.message).to.equal('Método não permitido.')
        })

        it ('Deve retornar 405 quando enviar método GET não permitido para este endpoint', async () => {
            const respostaMatches = await request(app)            
                .get('/matches')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
    
            expect(respostaMatches.status).to.equal(405)
            expect(respostaMatches.body.message).to.be.a('string')
            expect(respostaMatches.body.message).to.equal('Método não permitido.')
        })

        it ('Deve retornar 405 quando enviar método DELETE não permitido para este endpoint', async () => {
            const respostaMatches = await request(app)            
                .delete('/matches')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
    
            expect(respostaMatches.status).to.equal(405)
            expect(respostaMatches.body.message).to.be.a('string')
            expect(respostaMatches.body.message).to.equal('Método não permitido.')
        })
    })

    describe ('POST /matches/{id}/resposta', ()=> {

        before( async () => {
            token = await obterToken('teste1@teste.com', '654321')
        })

        it ('Deve retornar 200 quando match for aceito ou recusado', async () => {

            const bodyRespostaMatch = { ...postRespostaMatch.recusado }
            const respostaMatch = await request(app)            
                .post(`/matches/${resposta}/resposta`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyRespostaMatch)
            data.seed()

            expect(respostaMatch.status).to.equal(200)
            expect(respostaMatch.body.message).to.be.a('string')
            expect(respostaMatch.body.message).to.equal(`Match ${bodyRespostaMatch.status} com sucesso.` )
        })

        it ('Deve retornar 400 quando informar status inválido', async () => {

            const bodyRespostaMatch = { ...postRespostaMatch.invalido }
            const respostaMatch = await request(app)            
                .post(`/matches/${resposta}/resposta`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyRespostaMatch)

            expect(respostaMatch.status).to.equal(400)
            expect(respostaMatch.body.message).to.be.a('string')
            expect(respostaMatch.body.message).to.equal('Status inválido.')
        })
    })
})