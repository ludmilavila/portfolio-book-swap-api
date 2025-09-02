# Book Swap API

## 📚 Objetivo da API

**Book Swap API** é uma API REST desenvolvida em JavaScript com Express, para facilitar a doação e troca de livros entre usuários. O projeto permite que usuários cadastrem livros, demonstrem interesse em trocas e gerenciem matches de troca de forma simples e eficiente.


## 🛠️ Tecnologias utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticação via tokens


### Armazenamento
- **Memória** - Dados armazenados em memória durante execução
- **JSON** - Estrutura de dados para fixtures e configurações

### Documentação
- **Swagger/OpenAPI 3.0** - Documentação interativa da API
- **[Wiki do Projeto](https://github.com/ludmilavila/portfolio-book-swap-api/wiki)** - Contém requisitos, plano de testes, casos de teste e histórico de defeitos

## 🏗️ Estrutura do Projeto

```
portfolio-book-swap-api/
├── app.js                          # Configuração principal da aplicação
├── index.js                        # Ponto de entrada do servidor
├── server.js                       # Configuração do servidor
├── swagger.json                    # Documentação da API
├── package.json                    # Dependências e scripts
├── controllers/                    # Controladores da aplicação
│   ├── authController.js          # Autenticação e login
│   ├── interesseController.js     # Gerenciamento de interesses
│   ├── livroController.js         # Gerenciamento de livros
│   ├── matchController.js         # Gerenciamento de matches
│   └── usuarioController.js       # Gerenciamento de usuários
├── middlewares/                    # Middlewares da aplicação
│   └── auth.js                    # Middleware de autenticação
├── models/                         # Modelos de dados
│   └── data.js                    # Dados em memória e mocks
├── routes/                         # Rotas da API
│   ├── authRoutes.js              # Rotas de autenticação
│   ├── interesseRoutes.js         # Rotas de interesses
│   ├── livroRoutes.js             # Rotas de livros
│   ├── matchRoutes.js             # Rotas de matches
│   └── usuarioRoutes.js           # Rotas de usuários
├── fixtures/                       # Dados de teste
│   ├── postInteresses.json        # Fixture para cadastro de interesses
│   ├── postLivros.json            # Fixture para cadastro de livros
│   ├── postLogin.json             # Fixture para login
│   ├── postMatches.json           # Fixture para matches
│   ├── postRespostaMatch.json     # Fixture para resposta de matches
│   └── postUsuarios.json          # Fixture para cadastro de usuários
├── helpers/                        # Funções auxiliares
│   ├── autenticacao.js            # Helper para autenticação nos testes
│   └── interesses.js              # Helper para interesses nos testes
├── test/                           # Testes automatizados
│   ├── livros.test.js             # Testes de livros
│   ├── login.test.js              # Testes de login
│   ├── matches.test.js            # Testes de matches
│   ├── usuarios.test.js           # Testes de usuários
│   └── interesses.test.js         # Testes de interesses
│   └── performanceUsuarios.test.js# Testes de performance para cadastro de usuários
├── mochawesome-report/             # Relatórios de teste (gerado automaticamente)
├── .env                            # Arquivo com variáveis de ambiente (não versionado)
├── .gitignore                      # Arquivos ignorados pelo Git
├── config/
│   └── config.local.json          # Configurações locais da aplicação
├── utils/
│   └── variaveis.js               # Utilitários para gerenciamento de variáveis
└── docs/                           # Documentação adicional
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm 

### 1. Clone o repositório
```bash
git clone https://github.com/ludmilavila/portfolio-book-swap-api.git
cd portfolio-book-swap-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=http://localhost:7000
```

### 4. Execute a API
```bash
npm start
```

A API estará disponível em `http://localhost:7000`

## 📖 Funcionalidades da API

### 🔐 Autenticação
- **POST /auth/login** - Login de usuário com geração de token JWT
- Autenticação via Bearer Token em todas as rotas protegidas

### 👥 Usuários
- **POST /usuarios** - Cadastro de novos usuários
- Validação de dados obrigatórios
- Verificação de e-mail único

### 📚 Livros
- **POST /livros** - Cadastro de livros para troca ou doação
- **GET /livros** - Listagem de livros do usuário logado
- Campos obrigatórios: título, autor, descrição

### ❤️ Interesses
- **POST /interesses** - Cadastro de interesse em livro
- **GET /interesses** - Listagem de interesses do usuário
- Validação para não permitir interesse no próprio livro

### 🤝 Matches
- **POST /matches** - Criação de match entre interesse e livro
- **POST /matches/{id}/resposta** - Aceitar ou recusar troca
- Status: pendente, aceito, recusado

## 🔗 Endpoints da API

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/login` | Login do usuário | ❌ |
| POST | `/usuarios` | Cadastro de usuário | ❌ |
| POST | `/livros` | Cadastro de livro | ✅ |
| GET | `/livros` | Listar livros do usuário | ✅ |
| POST | `/interesses` | Cadastrar interesse | ✅ |
| GET | `/interesses` | Listar interesses do usuário | ✅ |
| POST | `/matches` | Criar match | ✅ |
| POST | `/matches/{id}/resposta` | Responder match | ✅ |

## 📊 Dados de Teste em Memória

O arquivo `models/data.js` contém dados mockados para desenvolvimento e testes:

### Usuário Padrão
```javascript
{
  id: '1',
  nome: 'Usuário Teste 1',
  email: 'teste1@teste.com',
  senha: '654321'
}
```

### Livro Padrão
```javascript
{
  id: '1',
  titulo: 'Poder sem Limites',
  autor: 'Anthony Robbins',
  genero: 'Autoajuda',
  descricao: 'Um livro sobre desenvolvimento pessoal e superação de limites',
  usuarioId: '1',
  disponivel: true
}
```

## 📖 Documentação Swagger

A API possui documentação interativa via Swagger disponível em:
```
http://localhost:7000/api-docs
```

## 🧪 Testes Automatizados

### Ferramentas utilizadas
- **Mocha** - Framework de testes
- **Supertest** - Testes de API HTTP
- **Chai** - Biblioteca de asserções
- **Mochawesome** - Geração de relatórios HTML
- **dotenv** - Gerenciamento de variáveis de ambiente

### Estrutura dos Testes
Os testes estão organizados por funcionalidade:
- **usuarios.test.js** - Testes de cadastro de usuários
- **login.test.js** - Testes de autenticação
- **livros.test.js** - Testes de cadastro de livros
- **interesses.test.js** - Testes de interesses em livros
- **matches.test.js** - Testes de criação e resposta de matches

### Helpers de Teste
- **autenticacao.js** - Helper para obter tokens de autenticação
- **interesses.js** - Helper para obter IDs de interesses

### Instalação e Execução dos Testes

#### Instale as dependências de teste
```bash
npm install --save-dev mocha@11.7.1 chai@4.3.6 supertest@7.1.4
npm install dotenv --save-dev
```

#### Executar todos os testes
```bash
npm test
```

#### Executar testes específicos
```bash
# Teste de usuários
npx mocha ./test/usuarios.test.js --timeout=200000

# Teste de login
npx mocha ./test/login.test.js --timeout=200000

# Teste de livros
npx mocha ./test/livros.test.js --timeout=200000

# Teste de interesses
npx mocha ./test/interesses.test.js --timeout=200000

# Teste de matches
npx mocha ./test/matches.test.js --timeout=200000
```

### Relatórios de Teste

Os testes geram relatórios HTML automáticos via Mochawesome no diretório `mochawesome-report/`. Após executar os testes, abra o arquivo `mochawesome.html` para visualizar os resultados detalhados.


## 🚀 Testes de Performance com K6

### Tecnologia Utilizada
**K6**: Ferramenta de teste de carga e performance

### Objetivo de cada grupo de arquivos

#### 📁 Pasta `config/`
- **config.local.json**: Arquivo de configuração local contendo a URL base da API para testes

#### 📁 Pasta `utils/`
- **variaveis.js**: Módulo utilitário para gerenciar variáveis de ambiente e configuração

#### 📁 Pasta `test/`
- **performanceUsuarios.test.js**: Script de teste de performance para o endpoint POST `/usuarios`

### Instalação e Execução

#### 1. Instalar K6
```bash
# Windows
choco install k6
```

#### 2. Executar Teste de Performance
```bash
# Execução básica
k6 run test/performanceUsuarios.test.js

# Certifique-se de passar a variável de ambiente BASE_URL, caso não esteja usando um config.local.json:
k6 run test/performanceUsuarios.test.js -e BASE_URL=http://localhost:7000
```


### Geração de Relatórios

#### Relatório HTML
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run test/performanceUsuarios.test.js
```


### Interpretação dos Resultados

#### Métricas Principais

**HTTP Requests:**
- **http_req_duration**: Tempo de resposta das requisições
  - `avg`: Tempo médio de resposta
  - `p(90)`: 90% das requisições respondem em menos de X ms
  - `max`: Tempo máximo de resposta
- **http_req_failed**: Taxa de falha das requisições
- **http_reqs**: Total de requisições por segundo

**Virtual Users (VUs):**
- **vus**: Número atual de usuários virtuais ativos
- **vus_max**: Número máximo de usuários virtuais

**Performance:**
- **iterations**: Total de iterações executadas
- **iteration_duration**: Duração média de cada iteração

#### Thresholds e Validações

**Status de Sucesso:**
- ✅ **http_req_duration p(90)<3000**: 90% das requisições respondem em menos de 3 segundos
- ✅ **http_req_duration max<5000**: Nenhuma requisição demora mais de 5 segundos
- ✅ **http_req_failed rate<0.01**: Taxa de falha menor que 1%

**Análise dos Resultados:**
- **Taxa de falha alta**: Pode indicar problemas de validação, autenticação ou limitações da API
- **Tempo de resposta alto**: Pode indicar gargalos de performance ou sobrecarga do sistema
- **VUs baixo**: Pode indicar que o sistema não consegue suportar a carga esperada


### Integração Contínua
Todos os testes automatizados, incluindo os testes de API e de performance com K6, podem ser executados na pipeline de CI/CD via GitHub Actions, clicando em **Run workflow**.  
[Ver execuções da pipeline](https://github.com/ludmilavila/portfolio-book-swap-api/actions)


## 🌸 Desenvolvido por:

**Ludmila Ávila** - [GitHub](https://github.com/ludmilavila)
[LinkedIn](https://www.linkedin.com/in/ludmilaavilamendes)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
