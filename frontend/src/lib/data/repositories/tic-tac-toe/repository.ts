import type { Game, Player } from '@models';
import {
	Left,
	Right,
	UnknownError,
	compute,
	fold,
	type Either, type TypedError
} from '@web-pacotes/foundation-types';
import type { MultiplayerServerNetworkingClient } from '@data';
import { readable, type Readable } from 'svelte/store';

/**
 * A repository for managing todos.
 */
export interface TicTacToeRepository {
	start(): Promise<Either<TypedError, Game>>;
	join(): Promise<Either<TypedError, void>>;
	move(player: Player, position: number): Promise<Either<TypedError, void>>;
	subscribe(game: Game): Either<TypedError, Readable<Game>>;
}

export class MultiPlayerServerTicTacToeRepository implements TicTacToeRepository {
	private readonly client: MultiplayerServerNetworkingClient;
	private ws: WebSocket | undefined;

	constructor(client: MultiplayerServerNetworkingClient) {
		this.client = client;
	}

	async start(): Promise<Either<TypedError, Game>> {
		const result = await this.client.post({ endpoint: '/api/games', mediaType: 'text/plain', cors: 'cors' });

		console.log(result)

		return fold(result, (l) => Left(UnknownError(l)), (r) => Right(compute(r.typedBody<Game>())))
	}

	async join(): Promise<Either<TypedError, void>> {
		const ws = this.ws;
		if (!ws) {
			return Left(UnknownError('game has not been yet subscribed'));
		}

		ws.addEventListener('open', () => {
			ws.send(JSON.stringify({ type: 'join-game' }));
		});

		return Right(undefined);
	}

	async move(player: Player, position: number): Promise<Either<TypedError, void>> {
		const ws = this.ws;

		if (!ws) {
			return Left(UnknownError('game has not been yet subscribed'));
		}

		console.log('wtf')

		ws.send(JSON.stringify({ type: 'move', playerId: player.id, position: position }));


		return Right(undefined);
	}

	subscribe(game: Game): Either<TypedError, Readable<Game>> {
		const ws = new WebSocket(`ws://localhost:8080/api/games/${game.id}`);
		this.ws = ws;

		const store = readable(game, (set) => {
			ws.addEventListener('message', (ev) => {
				const data = `${ev.data}`;

				if (data.includes(game.id)) {
					set(JSON.parse(data));
				}
			});
		});

		return Right(store);
	}
}
