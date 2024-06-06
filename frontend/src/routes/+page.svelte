<script lang="ts">
	import { InitialGameScreen, GameScreen } from '@presentation';
	import { AlertsReactor, JoinGame, Move, NewGame, TicTacToeReactor } from '@reactors';
	import { resolve } from '@web-pacotes/reactor-svelte';
	import { LL } from '@i18n';

	const ticTacToe = resolve(TicTacToeReactor);

	$: {
		console.log($ticTacToe);
	}
</script>

<section class="m-4 h-1/3">
	<div class="flex max-h-full justify-center overflow-hidden">
		{#if $ticTacToe.value.status === 'not-started'}
			<InitialGameScreen
				onNewGame={() => {
					ticTacToe.add(NewGame());
				}}
				onJoinGame={(code) => {
					ticTacToe.add(JoinGame(code));
				}}
			/>
		{:else}
			<GameScreen
				game={$ticTacToe.value}
				player={$ticTacToe.player}
				onMove={(player, position) => ticTacToe.add(Move(player, position))}
			/>
		{/if}
	</div>
</section>
