import { GamesRequest, GamesRequestType } from './games';

export type MoveRequest = {
	playerId: string;
	position: number;
	type: Extract<GamesRequestType, 'move'>;
} & GamesRequest;
