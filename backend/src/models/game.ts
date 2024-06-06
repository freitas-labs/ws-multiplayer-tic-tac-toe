import { nanoid } from 'nanoid';
import { Move } from './move';
import { Player } from './player';

type GameStatus = 'not-started' | 'waiting-join' | 'playing' | 'draw' | 'win';

export const Game = () => {
	return {
		id: nanoid(),
		state: new Array<Move | ''>(9).fill(''),
		players: [] as Player[],
		status: 'not-started' as GameStatus,
		nextMove: undefined as Player | undefined
	};
};

export type Game = ReturnType<typeof Game>;
