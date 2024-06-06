import { WebSocket, WebSocketServer } from 'ws';
import { updateGame } from './handlers';

export const wss = new WebSocketServer({
	noServer: true
});

const clients = {} as Record<string, WebSocket[]>;

wss.on('connection', async function connection(ws, request) {
	const { pathname } = new URL(request.url ?? '', 'wss://base.url');

	if (!pathname.startsWith('/api/games')) {
		ws.close();
	}

	const id = request.url?.split('/').at(-1) ?? '';

	if (!clients[id]) {
		clients[id] = [];
	}

	clients[id].push(ws);

	ws.on('error', console.error);
	ws.on('message', function message(data) {
		updateGame(
			request,
			(data) => clients[id].forEach((ws) => ws.send(data)),
			id,
			data
		);
	});
});
