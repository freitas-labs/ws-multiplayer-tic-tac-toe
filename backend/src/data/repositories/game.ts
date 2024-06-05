import { Game } from '../../models';
import {
	Left,
	ReadError,
	Right,
	type Either,
	type TypedError
} from '@web-pacotes/foundation-types';

export interface GameRepository {
	store(game: Game): Promise<Either<TypedError, void>>;
	lookup(id: string): Promise<Either<TypedError, Game>>;
}

export class MemoryGameRepository implements GameRepository {
	private games: Record<string, Game> = {};

	store(game: Game): Promise<Either<TypedError, void>> {
		this.games[game.id] = game;

		return Promise.resolve(Right(undefined));
	}

	lookup(id: string): Promise<Either<TypedError, Game>> {
		const game = this.games[id];

		if (!game) {
			return Promise.resolve(
				Left(ReadError(`couldn't find game with id: ${id}`))
			);
		}

		return Promise.resolve(Right(game));
	}
}
