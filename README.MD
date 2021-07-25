## Desafio CSP Consultaria

### API de contatos

Permite cadastrar em um banco de dados contatos com as seguintes informações:

- Id
- Primeiro Nome
- Último nome
- Email
- Telefones (realcionamento 1:n)

Para isso o banco de dados foi estruturado da seguinte forma:

<h3 align="left">
  <img src=".github/diagram.png" alt="demonstration" width="700">
<h3>

### Tecnologias Utilizadas:

- typescript
- typeorm
- express
- mysql

### Rodando a aplicação

1. Faça clone do repositório e entre no novo diretório criado

```
git clone git@github.com:abelsouzacosta/csptecnologia-desafio-backend.git

cd csptecnologia-desafio-backend/

```

2. Neste projeto foi usado o typeorm, para que seja possível fazer o uso de migrations é preciso ter o pacote `ts-node` instalado globalmente, se você não possuir este pacote instalado de forma global pode instalá-lo usando o comando:

`npm -g install ts-node` ou `sudo npm -g install ts-node` (caso em ambiente linux)

3. Renomeie os arquivos `.env.local` e `.ormconfig.env` para `.env` e `ormconfig.env`, respectivamente;

4. Dentro de `.env` determine a porta da aplicação (ex: _3030_)

5. Crie um banco de dados MYSQL com um nome qualquer de sua preferência (ex: _CONTACTS_)

6. No arquivo `ormconfig.env` determine os valores das variáveis `TYPEORM_USERNAME`, `TYPEORM_PASSWORD` e `TYPEORM_DATABASE` com o usuário do banco de dados, a senha e o nome do banco de dados criado no passo anterior.

7. Rode as migrations com o comando: `yarn migration:run`

8. Inicialize a aplicação: `yarn dev`
