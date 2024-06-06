<script lang="ts">
	export let onNewGame: () => void;
	export let onJoinGame: (code: string) => void;

	$: wantsToJoinGame = false;

	let inputEl: HTMLInputElement;
</script>

<div class="card overflow-y-auto">
	<div class="card-body items-center break-all">
		<h2 class="card-header">Tic-Tac-Toe</h2>

		<button class="btn btn-primary w-fit" on:click={onNewGame}>New Game</button>
		<button
			class="btn btn-primary w-fit"
			on:click={() => {
				if (!wantsToJoinGame) {
					wantsToJoinGame = true;
				} else {
					onJoinGame(inputEl.value);
				}
			}}>Join Game</button
		>

		{#if wantsToJoinGame}
			<input
				bind:this={inputEl}
				type="text"
				class="input input-primary"
				on:keypress={(ev) => {
					if (ev.key === 'Enter') {
						onJoinGame(inputEl.value);
					}
				}}
			/>
		{/if}
	</div>
</div>
