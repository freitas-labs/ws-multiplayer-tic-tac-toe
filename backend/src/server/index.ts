import { server } from './http';
import { wss } from './ws';

export default function () {
	server.server.on('upgrade', function (request, socket, head) {
		wss.handleUpgrade(request, socket, head, function (ws) {
			wss.emit('connection', ws, request);
		});
	});

	server.listen({ port: Number.parseInt(`${process.env.PORT ?? 8080}`) });
}
