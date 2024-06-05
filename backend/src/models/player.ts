import { nanoid } from 'nanoid';
import { Move } from './move';

export const Player = (name: string, type: Move) => {
	return {
		id: nanoid(),
		name: name,
		type: type
	};
};

export type Player = ReturnType<typeof Player>;
