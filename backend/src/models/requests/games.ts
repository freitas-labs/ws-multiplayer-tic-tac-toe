import {
	Either,
	Left,
	ReadError,
	Right,
	TypedError,
	safeThrowCall
} from '@web-pacotes/foundation-types';
import { RawData } from 'ws';

export type GamesRequestType = 'join-game' | 'move';

export type GamesRequest = {
	type: GamesRequestType;
};

export function GamesRequestFromRawData(
	data: RawData
): Either<TypedError, GamesRequest> {
	return safeThrowCall(() => {
		const json = JSON.parse(data.toString());

		if (!json || !json.type) {
			return Left(ReadError('invalid games request json'));
		}

		return Right(json as GamesRequest);
	}) as Either<TypedError, GamesRequest>;
}
