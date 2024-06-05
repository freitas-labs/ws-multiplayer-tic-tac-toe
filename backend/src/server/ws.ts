import { WebSocketServer } from 'ws';
import { updateGame } from './handlers';

export const wss = new WebSocketServer({
	noServer: true
});

wss.on('connection', async function connection(ws, request) {
	const { pathname } = new URL(request.url ?? '', 'wss://base.url');

	if (!pathname.startsWith('/api/games')) {
		ws.close();
	}

	const id = request.url?.split('/').at(-1) ?? '';

	ws.on('error', console.error);
	ws.on('message', function message(data) {
		updateGame(request, (data) => ws.send(data), id, data);
	});
});
