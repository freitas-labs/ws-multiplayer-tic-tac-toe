import { nanoid } from 'nanoid';
import { Move } from './move';
import { Player } from './player';

export const Game = () => {
	return {
		id: nanoid(),
		state: new Array<Move | ''>(9).fill(''),
		players: [] as Player[]
	};
};

export type Game = ReturnType<typeof Game>;
