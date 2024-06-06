import { type FetchClient, NetworkingClient } from '@web-pacotes/networking';


export class MultiplayerServerNetworkingClient extends NetworkingClient {
	constructor(client: FetchClient) {
		super({
			fetchClient: client,
			baseUrl: new URL('http://localhost:8080')
		});
	}
}
