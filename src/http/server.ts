import fastify from 'fastify';
import cookie from '@fastify/cookie';
import websocket from '@fastify/websocket';

import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-polls';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollsResults } from './ws/polls-result';

const app = fastify();

// Cookies
app.register(cookie, {
    secret: "polls-app-nlw",
    hook: "onRequest"
});

// Websockets
app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.register(pollsResults);

app.listen({port: 3333}).then(() => {
    console.log('Servidor Iniciado')
})