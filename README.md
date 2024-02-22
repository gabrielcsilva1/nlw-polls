# NLW Exert (Node.js)
Este projeto é uma API simples para a criação de enquete, nela é possível criar enquetes, votar e acompanhar a votação em tempo real. Projeto desenvolvido durante o evento NLW expert promovido pela rocketseat.

## 🚀 Tecnologias Usadas
- Node.js
- Fastify
- Prisma

## 🕹️ Executando o Projeto
Instale as depedências.
```bash
npm install
```
Configurar PostgreSQL e Redis.
```bash
docker compose up -d
```
Copiando o arquivo **.env.example** para o **.env**
```bash
cp .env.example .env
```
Criar migration do Banco de Dados
```bash
npx prisma migrate dev
```
Rodando o Servidor
```bash
npm run dev
```

## HTTP
### POST `/polls`
Criação de uma nova enquete.

#### Request body
```json
{
  "title": "Qual o melhor framework NodeJS?",
  "options": ["Express", "Fastify", "NestJS", "HappiJS"]
}
```

#### Response body
```json
{
  "pollId": "7eaf28db-b01f-4b0c-90e4-299ab9ca5ebd"
}
```

### GET `/polls/:pollId`
Retorna os dados de uma enquete.

#### Response body
```json
{
  "poll": {
    "id": "7eaf28db-b01f-4b0c-90e4-299ab9ca5ebd",
    "title": "Qual o melhor framework NodeJS?",
    "options": [
      {
        "id": "99db73be-f90d-48f3-bdcf-9a78cf2a8479",
        "title": "Express",
        "score": 0
      },
      {
        "id": "9a137789-6a0a-4496-8ecd-d25608135804",
        "title": "Fastify",
        "score": 0
      },
      {
        "id": "a60b9735-de58-48ea-a92f-d2ab94189eb1",
        "title": "NestJS",
        "score": 0
      },
      {
        "id": "f1d6fd95-a4a8-4001-a1ea-b7c6f1507120",
        "title": "HappiJS",
        "score": 0
      }
    ]
  }
}
```

### POST `/polls/:pollId/votes`
Permite votar em uma enquete, além de também poder alterar o voto nela.

#### Request body
```json
{
  "pollOptionId": "9a137789-6a0a-4496-8ecd-d25608135804"
}
```

## WebSoket
### ws `/polls/:pollId/results`
Permite acompanha a votação em tempo real, através do protocolo WebSocket.

#### Message
```json
{
  "pollOptionId":"9a137789-6a0a-4496-8ecd-d25608135804",
  "votes":1
}
```
