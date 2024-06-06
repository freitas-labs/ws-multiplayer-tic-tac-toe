import {
	MultiPlayerServerTicTacToeRepository,
	MultiplayerServerNetworkingClient,
	type TicTacToeRepository
} from '@data';

/**
 * A container registry for application dependencies.
 */
interface Vault {
	ticTacToeRepository: TicTacToeRepository;
}

/**
 * Creates a [Vault] depending on the application environment.
 *
 * @param window - the window object if running on the browser.
 */
export function vault() {
	return {
		ticTacToeRepository: new MultiPlayerServerTicTacToeRepository(new MultiplayerServerNetworkingClient(fetch))
	} satisfies Vault;

}
