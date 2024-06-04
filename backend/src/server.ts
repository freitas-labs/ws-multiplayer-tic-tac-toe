import { WebSocketServer } from 'ws';

export default function () {
    const wss = new WebSocketServer({ port: Number.parseInt(`${process.env.PORT ?? 8080}`) });

    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        ws.send('something');
    });
}