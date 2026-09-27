# Product Store 🛒 — MERN Crash Course

Aplicação full stack de uma loja de produtos, feita acompanhando um crash course de **MERN** (**M**ongoDB, **E**xpress, **R**eact e **N**ode.js).

Dá para **listar, criar, editar e apagar produtos** (um CRUD completo). Cada produto tem nome, preço e imagem, e fica salvo num banco MongoDB. O frontend tem tema claro/escuro, notificações e layout responsivo.

---

## Funcionalidades

- **Listar produtos** na página inicial, em uma grade de cards (1 coluna no celular, 2 no tablet, 3 no desktop).
- **Criar produto** pela página `/create` (botão **+** na navbar).
- **Editar produto** em um modal, pelo botão de lápis em cada card.
- **Apagar produto** pelo botão de lixeira em cada card.
- **Tema claro/escuro** pelo botão de sol/lua na navbar. O site abre no escuro e lembra a escolha.
- **Tooltips**: passar o mouse nos botões da navbar mostra uma descrição.
- **Notificações (toasts)** de sucesso e erro depois de cada ação.
- **Validação** no frontend e no backend: campos vazios, preço inválido, id que não existe.

---

## Tecnologias utilizadas

### Backend

| Tecnologia | Versão | Para que serve no projeto |
|---|---|---|
| [Node.js](https://nodejs.org) | 20.19+ | Roda o JavaScript no servidor. |
| [Express](https://expressjs.com) | 5.2.1 | Framework que cria o servidor HTTP e as rotas da API (`/api/products`). |
| [MongoDB](https://www.mongodb.com) | — | Banco de dados NoSQL, guarda os produtos como documentos JSON. Usado via **MongoDB Atlas** (na nuvem). |
| [Mongoose](https://mongoosejs.com) | 9.10.2 | Biblioteca que conversa com o MongoDB: define o formato dos dados (schema) e faz as buscas, criações, updates e deletes. |
| [dotenv](https://github.com/motdotla/dotenv) | 18.0.4 | Carrega as variáveis do arquivo `.env` (senha do banco, porta) para dentro do `process.env`. |
| [nodemon](https://nodemon.io) | 3.1.14 | (desenvolvimento) Reinicia o servidor sozinho toda vez que um arquivo é salvo. |

### Frontend

| Tecnologia | Versão | Para que serve no projeto |
|---|---|---|
| [React](https://react.dev) | 19.3.0 | Biblioteca para montar a interface com componentes. |
| [Vite](https://vite.dev) | 8.3.1 | Ferramenta que roda o servidor de desenvolvimento (com recarregamento instantâneo) e gera o build. Também faz o **proxy** para o backend. |
| [Chakra UI](https://chakra-ui.com) | 3.37.0 | Biblioteca de componentes prontos e estilizados (botões, inputs, modal, toasts, tooltips, grid). Usa o [Emotion](https://emotion.sh) por baixo. |
| [React Router](https://reactrouter.com) | 7.18.4 | Navegação entre páginas (`/` e `/create`) sem recarregar o site. |
| [Zustand](https://zustand.docs.pmnd.rs) | 5.0.15 | "Store" global: guarda a lista de produtos e as funções que chamam a API, compartilhadas entre as páginas. |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Controla o tema claro/escuro (o Chakra UI v3 usa ele para isso). |
| [react-icons](https://react-icons.github.io/react-icons) | 5.7.0 | Ícones (pacote **Lucide**: carrinho, +, sol, lua, lápis, lixeira). |
| [oxlint](https://oxc.rs) | 1.85.0 | (desenvolvimento) Linter: aponta erros e más práticas no código. |

---

## Estrutura de pastas

```
MERN-CRASH-COURSE/
├── package.json              # dependências e scripts do BACKEND ("type": "module", "npm run dev")
├── .env                      # variáveis secretas (MONGO_URI, PORT) — NÃO vai pro git
├── .gitignore
│
├── backend/
│   ├── server.js             # ponto de entrada: carrega o .env, cria o app Express, liga as rotas e sobe o servidor
│   ├── config/
│   │   └── db.js             # conexão com o MongoDB via Mongoose
│   ├── models/
│   │   └── product.model.js  # formato de um produto (name, price, image) + regras
│   ├── routes/
│   │   └── product.route.js  # liga cada método HTTP + URL à função do controller
│   └── controllers/
│       └── product.controller.js  # lógica de cada rota: buscar, criar, atualizar, apagar
│
└── frontend/
    ├── package.json          # dependências e scripts do FRONTEND
    ├── vite.config.js        # config do Vite + proxy /api -> localhost:5000
    ├── index.html
    └── src/
        ├── main.jsx          # liga React, Router, Chakra, tema e notificações
        ├── App.jsx           # layout base + definição das rotas
        ├── pages/
        │   ├── HomePage.jsx      # "Current Products": grade de produtos
        │   └── CreatePage.jsx    # formulário "Create New Product"
        ├── store/
        │   └── product.js        # store Zustand: lista de produtos + chamadas à API
        └── components/ui/
            ├── Navbar.jsx        # logo, botão + e botão de tema
            ├── ProductCard.jsx   # card do produto + modal de edição
            ├── color-mode.jsx    # provider e hook do tema claro/escuro
            ├── toaster.jsx       # notificações (toasts)
            └── tooltip.jsx       # tooltip reutilizável
```

A separação do backend em **routes → controllers → models** deixa cada arquivo com uma responsabilidade só: a rota diz *qual URL*, o controller diz *o que fazer* e o model diz *como é o dado*.

---

## Pré-requisitos

- **Node.js 20.19 ou mais novo** (recomendado 22 LTS ou superior). É o mínimo exigido pelo Vite 8 e pelo Mongoose 9. Confira com `node -v`.
- **npm** (vem junto com o Node). Confira com `npm -v`.
- **Um banco MongoDB**. O jeito mais fácil é uma conta grátis no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas):
  1. Crie um cluster (o plano grátis serve).
  2. Em **Database Access**, crie um usuário e senha.
  3. Em **Network Access**, libere o seu IP (ou `0.0.0.0/0` para liberar qualquer IP, só para estudo).
  4. Em **Connect → Drivers**, copie a *connection string*. Ela é a sua `MONGO_URI`.

---

## Como rodar o projeto

### 1. Clonar e instalar as dependências

O backend e o frontend têm **cada um o seu `package.json`**, então é preciso instalar nos dois lugares:

```bash
git clone <url-do-repositorio>
cd MERN-CRASH-COURSE

npm install            # dependências do backend (raiz)

cd frontend
npm install            # dependências do frontend
cd ..
```

### 2. Criar o arquivo `.env`

Na **raiz** do projeto (ao lado do `package.json` do backend), crie um arquivo chamado `.env`:

```env
MONGO_URI=mongodb+srv://<usuario>:<senha>@<seu-cluster>.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority
PORT=5000
```

- `MONGO_URI`: a connection string do Atlas, com o seu usuário e senha.
- `PORT`: a porta do backend. Se não existir, o servidor usa `5000`.

> ⚠️ O `.env` tem a senha do banco, por isso ele está no `.gitignore` e **nunca** deve ir para o GitHub.

> Se trocar a `PORT`, troque também o `target` do proxy em `frontend/vite.config.js`, senão o frontend não encontra o backend.

### 3. Rodar o backend (terminal 1)

Na raiz do projeto:

```bash
npm run dev
```

Se deu tudo certo, aparece:

```
Server started at http://localhost:5000
MongoDB Connected: <host-do-seu-cluster>
```

### 4. Rodar o frontend (terminal 2)

Em **outro terminal**:

```bash
cd frontend
npm run dev
```

Abra **http://localhost:5173** no navegador.

> Os dois precisam ficar rodando **ao mesmo tempo**: o frontend (porta 5173) é o site, e o backend (porta 5000) é a API que ele consulta.

---

## Entendendo o `npm run dev`

No `package.json` existe um campo `"scripts"` com "atalhos" de comandos. `npm run <nome>` executa o comando daquele nome.

### No backend (`package.json` da raiz)

```json
"scripts": {
  "dev": "nodemon backend/server.js"
}
```

- `npm run dev` roda `nodemon backend/server.js`.
- O **nodemon** fica vigiando os arquivos: **toda vez que você salva**, ele reinicia o servidor sozinho. Sem ele, a cada mudança seria preciso parar (`Ctrl + C`) e rodar `node backend/server.js` de novo.
- Com o nodemon rodando:
  - digite `rs` + `Enter` no terminal para **reiniciar na mão**;
  - aperte `Ctrl + C` para **parar**.
- Como foi configurado:
  ```bash
  npm install -D nodemon    # -D = dependência só de desenvolvimento
  ```
  e depois foi adicionada a linha `"dev": "nodemon backend/server.js"` em `"scripts"`.

### No frontend (`frontend/package.json`)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o site em modo desenvolvimento em `http://localhost:5173`. Salvou um arquivo, a página atualiza na hora (HMR). |
| `npm run build` | Gera a versão otimizada do site na pasta `frontend/dist`. |
| `npm run preview` | Serve o que está na `dist` para testar o build. |
| `npm run lint` | Roda o oxlint e aponta problemas no código. |

---

## Por que trocar para `"type": "module"` no `package.json`

O projeto usa a sintaxe **ES Modules** (`import` / `export`):

```js
import express from "express";
export const connectDB = async () => { ... };
```

Mas o **padrão do Node.js é CommonJS**, que usa outra sintaxe:

```js
const express = require("express");
module.exports = { connectDB };
```

Para o Node aceitar `import`/`export`, é preciso **trocar o tipo do projeto para `module`** no `package.json` da raiz. Dependendo da versão, o `npm init` cria o arquivo com `"type": "commonjs"` ou sem o campo `type`. Nos dois casos, deixe assim:

```json
{
  "name": "mern-crash-course",
  "type": "module",
  ...
}
```

Sem isso, ao rodar o servidor aparece:

```
SyntaxError: Cannot use import statement outside a module
```

### Cuidado: com `"type": "module"` o `.js` é obrigatório

Em ES Modules no Node, os imports de **arquivos do próprio projeto** precisam da extensão `.js`:

```js
import Product from "../models/product.model.js";   // ✅ certo
import Product from "../models/product.model";      // ❌ ERR_MODULE_NOT_FOUND
```

Imports de **pacotes** (`"express"`, `"mongoose"`) continuam sem extensão.

> O `frontend/package.json` já vem com `"type": "module"` pelo template do Vite, então lá não precisa mexer.

---

## Como o frontend conversa com o backend

1. **Proxy do Vite** (`frontend/vite.config.js`): toda requisição que começa com `/api` é repassada para `http://localhost:5000`. Por isso, no frontend basta escrever `fetch("/api/products")`, sem colocar o endereço do backend, e também não acontece erro de CORS.
2. **Store Zustand** (`frontend/src/store/product.js`): cada função faz um `fetch` para uma rota da API e atualiza a lista de produtos, que todas as páginas enxergam.

Exemplo do caminho de um produto criado:

```
Botão "Add Product" (CreatePage)
  → createProduct() no store
  → fetch POST /api/products
  → proxy do Vite (5173 → 5000)
  → Express: router.post("/") → createProduct (controller)
  → Mongoose salva no MongoDB
  → resposta { success: true, data: produto }
  → store adiciona na lista → HomePage mostra o novo card
```

---

## API

Base: `http://localhost:5000/api/products`

Todas as respostas são JSON, no formato `{ "success": true, "data": ... }` quando dá certo, ou `{ "success": false, "message": "..." }` quando dá erro.

| Método | Rota | Body (JSON) | Sucesso | Erros possíveis |
|---|---|---|---|---|
| `GET` | `/api/products` | — | `200` + lista de produtos | `500` erro no servidor |
| `POST` | `/api/products` | `{ name, price, image }` (todos obrigatórios) | `201` + produto criado | `400` campo faltando ou dado inválido · `500` |
| `PUT` | `/api/products/:id` | qualquer campo a alterar, ex: `{ price }` | `200` + produto **já atualizado** | `400` dado inválido · `404` produto não existe · `500` |
| `DELETE` | `/api/products/:id` | — | `200` + `"Product deleted"` | `404` produto não existe · `500` |

O `PUT` só altera os campos enviados no body. Na prática funciona como uma atualização parcial.

### Exemplos com `curl`

```bash
# listar
curl http://localhost:5000/api/products

# criar
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Wireless Earbuds","price":199.99,"image":"https://exemplo.com/fone.jpg"}'

# atualizar só o preço
curl -X PUT http://localhost:5000/api/products/<id> \
  -H "Content-Type: application/json" \
  -d '{"price":149.99}'

# apagar
curl -X DELETE http://localhost:5000/api/products/<id>
```

### Modelo de dados — `Product`

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `_id` | ObjectId | automático | Criado pelo MongoDB. |
| `name` | String | sim | Nome do produto. |
| `price` | Number | sim | Preço. |
| `image` | String | sim | **URL** da imagem (não o arquivo). |
| `createdAt` | Date | automático | Criado pelo `timestamps: true`. |
| `updatedAt` | Date | automático | Atualizado a cada alteração. |

Os produtos ficam na coleção **`products`** (o Mongoose transforma o model `"Product"` no plural e em minúsculo).

---

## O que foi trabalhado

### Backend
- Servidor **Express 5** com leitura de JSON (`express.json()`) e rotas agrupadas no prefixo `/api/products`.
- Conexão com o **MongoDB Atlas** usando **Mongoose**, com a URI protegida no `.env` via **dotenv**.
- **Model** `Product` com campos obrigatórios e `timestamps`.
- **CRUD completo** (GET, POST, PUT, DELETE), separado em **routes** e **controllers**.
- Status HTTP corretos: `201` ao criar, `400` para dado inválido, `404` para produto que não existe e `500` para falha do servidor.
- Validação também no update (`runValidators: true`) e retorno do produto já atualizado (`returnDocument: "after"`).
- Tratamento de erro ao subir o servidor: se a porta estiver ocupada, o erro aparece e o processo encerra, em vez de fingir que subiu.
- Código organizado e comentado: cabeçalho em cada arquivo e comentários explicando o porquê.

### Frontend
- Projeto **React + Vite** com **Chakra UI v3**.
- Rotas `/` e `/create` com **React Router**.
- **Navbar** com logo em degradê, botão de criar e botão de tema, cada um com **tooltip**.
- **Tema claro/escuro** com **next-themes**.
- **HomePage** com grade responsiva de **cards de produto** e mensagem quando não há produtos.
- **Modal de edição** e botão de apagar em cada card.
- **CreatePage** com formulário e validação.
- **Notificações (toasts)** de sucesso e erro.
- **Store global com Zustand** centralizando as chamadas à API.
- **Proxy do Vite** ligando o frontend ao backend.

### Repositório
- `.gitignore` com `node_modules` e `.env` (a pasta `node_modules` foi retirada do controle do git).

---

## Problemas comuns

| Erro | Causa provável | Como resolver |
|---|---|---|
| `http proxy error /api/products ... ECONNREFUSED` (no terminal do frontend) | O backend não está rodando, ou caiu. | Rode `npm run dev` na raiz e veja se aparece "Server started". |
| `listen EADDRINUSE: address already in use :::5000` | Já tem outro programa usando a porta 5000. | Feche o outro processo (ou outro terminal com o backend) ou troque a `PORT` no `.env` e no proxy. |
| `Cannot use import statement outside a module` | Falta `"type": "module"` no `package.json`. | Veja a seção [sobre `"type": "module"`](#por-que-trocar-para-type-module-no-packagejson). |
| `ERR_MODULE_NOT_FOUND` | Import de arquivo local sem `.js`. | Coloque a extensão: `"./config/db.js"`. |
| `Error connecting to MongoDB: ...` | `MONGO_URI` errada, senha errada ou IP não liberado no Atlas. | Confira o `.env` e o **Network Access** no Atlas. |
| A página abre mas não aparece nenhum produto | Banco vazio ou backend fora do ar. | Crie um produto pelo botão **+** e confira o terminal do backend. |

---

## Build para produção

`npm run build` dentro de `frontend/` gera o site otimizado em `frontend/dist`. O backend **ainda não está configurado** para servir esses arquivos, então por enquanto o projeto roda só em modo desenvolvimento (os dois `npm run dev`).
