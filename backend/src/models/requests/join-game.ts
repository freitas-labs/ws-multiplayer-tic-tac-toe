import { GamesRequest, GamesRequestType } from './games';

export type JoinGameRequest = {
	playerId?: string;
	type: Extract<GamesRequestType, 'join-game'>;
} & GamesRequest;
