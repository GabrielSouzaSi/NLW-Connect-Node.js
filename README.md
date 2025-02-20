# NLW Connect #19

### Trilha Nodejs

Nessa trilha, entraremos a fundo nos fundamentos e na construção de aplicações back-end utilizando Node.js na prática construindo uma API RESTful para um sistema de indicações para eventos online. Nossa API utilizará de ferramentas e conceitos como banco de dados SQL, Fastify, documentação com Swagger, validação de dados e muito mais.

## Instrução e comandos para rodar o projeto

### Instale as dependências:

```
npm i
```

### Crie seu arquivo **.env** com as seguintes variáveis de ambiente:

> [!IMPORTANT]
> Você pode preencher os dados com base no arquivo **docker-compose.yml**

```
PORT=3333
WEB_URL="http://localhost:3000"
POSTGRES_URL="postgresql://docker:docker@localhost:3333/connect"
REDIS_URL="redis://localhost:6379"
```
### Execute o arquivo **docker-compose.yml**:

```
docker compose up -d
```

### Gere as tabelas no banco de dados:

```
npm run db:migrate
```

### Agora rode o projeto:

```
npm run dev
```
