import { MemoryGameRepository } from '../data';
import { GameManager } from '../managers';

interface Vault {
	gameManager: GameManager;
}

export function vault() {
	return {
		gameManager: new GameManager(new MemoryGameRepository())
	} satisfies Vault;
}

const globalVault = vault();
export function withVault() {
	return globalVault;
}
