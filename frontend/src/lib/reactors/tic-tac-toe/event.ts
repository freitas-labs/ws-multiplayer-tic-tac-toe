import type { Player } from '@models';
import { isTypedOf } from '@web-pacotes/reactor-svelte';

export function NewGame() {
	return {
		type: 'new-game' as const,
	};
}

export function JoinGame(code: string) {
	return {
		type: 'join-game' as const,
		code: code,
	};
}

export function Move(player: Player, position: number) {
	return {
		type: 'move' as const,
		player: player,
		position: position,
	};
}


export type NewGame = ReturnType<typeof NewGame>;
export type JoinGame = ReturnType<typeof JoinGame>;
export type Move = ReturnType<typeof Move>;
export type TicTacToeEvent = NewGame | JoinGame | Move

export const isNewGame = (event: TicTacToeEvent) => isTypedOf<NewGame>(event, 'new-game');
export const isJoinGame = (event: TicTacToeEvent) => isTypedOf<JoinGame>(event, 'join-game');
export const isMove = (event: TicTacToeEvent) => isTypedOf<Move>(event, 'move');
