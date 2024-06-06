
import type { Game, Player } from '@models';

export const GameUpdate = (value: Game, player: Player) => {
	return {
		type: 'game-update' as const,
		value: value,
		player: player,
	};
};

export type GameUpdate = ReturnType<typeof GameUpdate>;
export type TicTacToeState = { value: Game, player: Player } & (GameUpdate);
