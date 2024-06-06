import { dev } from '$app/environment';
import { type FetchClient, NetworkingClient } from '@web-pacotes/networking';


export class MultiplayerServerNetworkingClient extends NetworkingClient {
	constructor(client: FetchClient) {
		super({
			fetchClient: client,
			baseUrl: new URL(dev ? 'http://localhost:8080' : import.meta.env.VITE_multiplayer_server_url)
		});
	}
}
