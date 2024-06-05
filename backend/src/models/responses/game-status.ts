import { Game } from '../game';

export const GameStatus = (game: Game) => {
	return {
		id: game.id,
		state: game.state,
		host: game.players[0],
		guest: game.players[1]
	};
};
