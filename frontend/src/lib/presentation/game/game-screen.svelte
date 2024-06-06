<script lang="ts">
	import type { Game, Player } from '@models';
	import { Cross, Zero } from '@presentation';

	export let game: Game;
	export let player: Player;

	export let onMove: (player: Player, position: number) => void;
</script>

<div class="card overflow-y-auto">
	<div class="card-body items-center break-all">
		<h2 class="card-header">Tic-Tac-Toe</h2>
		<p class="text-content2">(Game ID: {game.id})</p>

		<div class="grid grid-cols-3 grid-rows-3">
			{#each game.state as item, idx}
				<button
					class="flex h-28 w-28 items-center justify-center {idx % 3 !== 0
						? 'border-l-2'
						: ''} {idx > 2 ? 'border-t-2' : ''}"
					disabled={item.length > 0}
					on:click={() => {
						onMove(player, idx);
					}}
				>
					{#if item === 'X'}
						<Cross />
					{:else if item === 'O'}
						<Zero />
					{:else}
						{item}
					{/if}
				</button>
			{/each}
		</div>

		{#if game.status === 'waiting-join'}
			<p class="text-content3">Waiting for a player to join...</p>
		{:else if game.status === 'win'}
			{#if game.nextMove?.id === player.id}
				<p class="text-success">You won!</p>
			{:else}
				<p class="text-error">You lost!</p>
			{/if}
		{:else if game.status === 'draw'}
			{#if game.nextMove?.id === player.id}
				<p class="text-warning">It's a draw!</p>
			{/if}
		{:else if game.nextMove?.id === player.id}
			<p class="text-content3">Next move: You</p>
		{:else}
			<p class="text-content3">Next move: Opponent</p>
		{/if}
	</div>
</div>
