<script>
	import '../app.css';
	import { vault } from '@core';
	import { MultiReactorProvider } from '@web-pacotes/reactor-svelte';
	import { AlertsReactor, TicTacToeReactor } from '@reactors';
	import {
		BreakpointProvider,
		GlobalThemeDropdown,
		ThemeProvider,
		ToastGroup
	} from '@presentation';
	import { onMount } from 'svelte';

	const appVault = vault();

	const todos = new TicTacToeReactor(appVault.ticTacToeRepository);
	const alerts = new AlertsReactor();

	$: mounted = false;

	onMount(() => (mounted = true));
</script>

<BreakpointProvider>
	<ThemeProvider>
		<MultiReactorProvider reactors={[todos, alerts]}>
			{#if mounted}
				<slot />
			{/if}

			<GlobalThemeDropdown />
			<ToastGroup values={$alerts.value} />
		</MultiReactorProvider>
	</ThemeProvider>
</BreakpointProvider>
