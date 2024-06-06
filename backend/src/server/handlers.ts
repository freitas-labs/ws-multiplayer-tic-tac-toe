import { FastifyReply, FastifyRequest } from 'fastify';
import { fold, isRight } from '@web-pacotes/foundation-types';
import {
	GameStatus,
	GamesRequestFromRawData,
	JoinGameRequest,
	MoveRequest
} from '../models';
import { withVault } from '../core';
import { IncomingMessage } from 'http';
import { RawData } from 'ws';

type IncomingRequest = FastifyRequest;
type OutgoingResponse = FastifyReply;
type OutgoingMessage = (data: string) => void;
type Data = RawData;

const vault = withVault();
const manager = vault.gameManager;

export async function newGame(
	request: IncomingRequest,
	response: OutgoingResponse
) {
	const result = await manager.start();

	return fold(
		result,
		(l) => {
			request.log.error(l, `failed to start game on manager!`);

			response.status(500).send();
		},
		(r) => response.status(201).send(GameStatus(r))
	);
}

export async function updateGame(
	request: IncomingMessage,
	response: OutgoingMessage,
	id: string,
	data: Data
) {
	const result = GamesRequestFromRawData(data);

	return fold(
		result,
		(l) => {
			console.error(
				l,
				`failed to parse message: ${data}, defaulting to game status`
			);

			return gameStatus(request, response, id);
		},
		(r) => {
			switch (r.type) {
				case 'join-game':
					return joinGame(request, response, id, r as JoinGameRequest);
				case 'move':
					return move(request, response, id, r as MoveRequest);
				default:
					return gameStatus(request, response, id);
			}
		}
	);
}

async function joinGame(
	request: IncomingMessage,
	response: OutgoingMessage,
	id: string,
	data: JoinGameRequest
) {
	if (data.playerId) {
		return gameStatus(request, response, id);
	}

	let result = await manager.status(id);

	if (isRight(result)) {
		const game = result.right;

		result = await manager.join(game);
	}

	return fold(
		result,
		(l) => {
			console.error(l, `failed to join game with id: ${id}`);
			response(l.cause);
		},
		(r) => response(JSON.stringify(GameStatus(r)))
	);
}

async function move(
	request: IncomingMessage,
	response: OutgoingMessage,
	id: string,
	data: MoveRequest
) {
	let result = await manager.status(id);

	if (isRight(result)) {
		const game = result.right;

		result = await manager.move(game, data.playerId, data.position);
	}

	return fold(
		result,
		(l) => {
			console.error(l, `failed to join game with id: ${id}`);
			response(l.cause);
		},
		(r) => response(JSON.stringify(GameStatus(r)))
	);
}

export async function gameStatus(
	request: IncomingMessage,
	response: OutgoingMessage,
	id: string
) {
	const result = await manager.status(id);

	return fold(
		result,
		(l) => {
			console.error(l, `failed to lookup game with id: ${id}`);
			response(l.cause);
		},
		(r) => response(JSON.stringify(GameStatus(r)))
	);
}
