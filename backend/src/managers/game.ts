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
		game.nextMove = initialPlayer;
		game.status = 'waiting-join';

		const result = await this.repository.store(game);
		return rightMap(result, () => game);
	}

	async join(game: Game): Promise<Either<TypedError, Game>> {
		const player = Player('Player 2', 'O');

		if (game.players.length > 1) {
			return Left(WriteError('game is already full'));
		}

		game.players.push(player);
		game.status = 'playing';

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

		if (player !== game.nextMove) {
			return Left(WriteError('player cannot play this round'));
		}

		if (game.status !== 'playing') {
			return Left(WriteError('game is not in playing state'));
		}

		game.state[position] = player.type;
		game.status = this.gameStatus(game);

		if (game.status === 'playing') {
			game.nextMove = game.players.find((p) => p !== player);
		}

		return rightMap(await this.repository.store(game), () => game);
	}

	status(id: string) {
		return this.repository.lookup(id);
	}

	private gameStatus(game: Game) {
		const positions = game.state;

		if (!positions.includes('')) {
			return 'draw';
		}

		for (let i = 0; i < positions.length; i += 3) {
			if (
				positions[i] === positions[i + 1] &&
				positions[i] === positions[i + 2] &&
				positions[i] !== ''
			) {
				return 'win';
			}
		}

		if (
			positions[0] === positions[4] &&
			positions[0] === positions[8] &&
			positions[0] !== ''
		) {
			return 'win';
		}

		if (
			positions[2] === positions[4] &&
			positions[0] === positions[6] &&
			positions[2] !== ''
		) {
			return 'win';
		}

		return game.status;
	}
}
