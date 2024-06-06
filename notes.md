# Notes

## Start Game

- Open game website
- Click "new game"
    - POST /api/games
        - JSON { id: nanoid, state: number (game positions bitwised), player: { id: nanoid, name: string, type: 'x' | 'o' } }
- Open game webpage
    - WS /api/games/:id
        - JSON { id: nanoid, state: number (game positions bitwised), player: { id: nanoid, name: string, type: 'x' | 'o' }, opponent: { name: string, type: 'x' | 'o' } }

## Join Game

- Open game webpage
    - (Start) WS /api/games/:id
        - JSON { id: nanoid, state: number (game positions bitwised), player: { id: nanoid, name: string, type: 'x' | 'o' }, opponent: { name: string, type: 'x' | 'o' }  }

## Play Game

- Click on free slot
    - (Send) WS /api/games/:id > JSON { position: number, playerId: nanoid }
        - JSON { id: nanoid, state: number (game positions bitwised), player: { id: nanoid, name: string, type: 'x' | 'o' }, opponent: { name: string, type: 'x' | 'o' }  }