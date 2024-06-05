import Fastify from 'fastify';
import { newGame } from './handlers';

export const server = Fastify({
	logger: true
});

server.post('/api/games', newGame);
