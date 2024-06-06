import type { Move } from './move';
import type { Player } from './player';

export type Game = {
	id: string;
	state: Move[];
	players: Player[];
	status: 'not-started' | 'waiting-join' | 'playing' | 'draw' | 'win',
	nextMove: Player | undefined,
};