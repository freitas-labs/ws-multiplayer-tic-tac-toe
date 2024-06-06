import Fastify from 'fastify';
import cors from '@fastify/cors';
import { newGame } from './handlers';

export const server = Fastify({
	logger: true
});

server.post('/api/games', newGame);
server.register(cors);
