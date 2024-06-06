
import { logError } from '@web-pacotes/lumberdash';
import type { TicTacToeRepository } from '@data';
import { Reactor } from '@web-pacotes/reactor-svelte';
import { isLeft, wrap } from '@web-pacotes/foundation-types';
import { GameUpdate, type TicTacToeState } from './state';
import { JoinGame, Move, isJoinGame, isMove, isNewGame, type NewGame, type TicTacToeEvent } from './event';

/**
 * A reactor that manages the state of todo actions.
 */
export class TicTacToeReactor extends Reactor<TicTacToeEvent, TicTacToeState> {
	constructor(repository: TicTacToeRepository) {
		super(GameUpdate({ status: 'not-started', id: '', players: [], state: [], nextMove: undefined }, { id: '', name: '', type: 'O' }));

		this.on<NewGame>(async (_, emit) => {
			const result = await repository.start();

			if (isLeft(result)) {
				logError(wrap(result.left));
				emit(this.state);

				return;
			}

			const game = result.right;
			const player = result.right.players[0];

			emit(GameUpdate(game, player));

			this.subscribeToGameUpdates(repository, emit);
		}, isNewGame);

		this.on<JoinGame>(async (event, emit) => {
			this.state.value.id = event.code;

			const subscription = this.subscribeToGameUpdates(repository, emit);

			const result = await repository.join();

			if (isLeft(result)) {
				logError(wrap(result.left));
				emit(this.state);

				return;
			}

			subscription?.right.subscribe((g) => {
				if (!g.players.includes(this.state.player) && g.players.length === 2) {
					emit(GameUpdate(g, g.players[1]));
				}
			})
		}, isJoinGame);

		this.on<Move>(async (event, emit) => {
			const result = await repository.move(event.player, event.position);

			if (isLeft(result)) {
				logError(wrap(result.left));
				emit(this.state);

				return;
			}
		}, isMove);
	}

	private subscribeToGameUpdates(repository: TicTacToeRepository, emit: (state: TicTacToeState) => void) {
		const game = this.state.value;
		const player = this.state.player

		const subscriptionResult = repository.subscribe(game);

		if (isLeft(subscriptionResult)) {
			logError(wrap(subscriptionResult.left));
			emit(this.state);

			return;
		}

		subscriptionResult.right.subscribe((game) => {
			if (!game) {
				return
			}

			emit(GameUpdate(game, player));
		});

		return subscriptionResult;
	}
}
