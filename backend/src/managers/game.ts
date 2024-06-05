import {
	Either,
	Left,
	TypedError,
	WriteError,
	rightMap
} from '@web-pacotes/foundation-types';
import { GameRepository } from '../data';
import { Game, Player } from '../models';

export class GameManager {
	private repository: GameRepository;

	constructor(repository: GameRepository) {
		this.repository = repository;
	}

	async start() {
		const game = Game();
		const initialPlayer = Player('Player 1', 'X');

		game.players.push(initialPlayer);

		const result = await this.repository.store(game);
		return rightMap(result, () => game);
	}

	async join(game: Game): Promise<Either<TypedError, Game>> {
		const player = Player('Player 2', 'O');

		if (game.players.length > 1) {
			return Left(WriteError('game is already full'));
		}

		game.players.push(player);

		return rightMap(await this.repository.store(game), () => game);
	}

	async move(
		game: Game,
		playerId: string,
		position: number
	): Promise<Either<TypedError, Game>> {
		const player = game.players.find((p) => p.id === playerId);

		if (!player) {
			return Left(WriteError('player is not in game'));
		}

		if (game.state[position] !== '') {
			return Left(WriteError('illegal move, slot already filled'));
		}

		game.state[position] = player.type;

		return rightMap(await this.repository.store(game), () => game);
	}

	status(id: string) {
		return this.repository.lookup(id);
	}
}
