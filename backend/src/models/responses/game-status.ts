import { Game } from '../game';

export const GameStatus = (game: Game) => {
	return {
		id: game.id,
		state: game.state,
		players: game.players,
		status: game.status,
		nextMove: game.nextMove
	};
};
