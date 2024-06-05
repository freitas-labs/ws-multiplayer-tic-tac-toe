import { Game } from '../game';

export const NewGameResponse = (game: Game) => {
	return {
		id: game.id,
		state: game.state,
		host: game.players[0]
	};
};
