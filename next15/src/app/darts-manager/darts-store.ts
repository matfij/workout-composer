import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DartsGame, DartsPlayer, DartsPlayerPlace } from './types';

const initialState: DartsGame = {
    players: [],
    currentPlayerIndex: 0,
    currentTurn: 0,
};

type DartsStore = DartsGame & {
    addPlayer: (player: DartsPlayer) => void;
    updatePlayer: (player: DartsPlayer) => void;
    clearPoints: () => void;
    clearGame: () => void;
};

export const useDartsStore = create(
    persist<DartsStore>(
        (set, get) => ({
            ...initialState,
            addPlayer: (player: DartsPlayer) => set({ players: [...get().players, player] }),
            updatePlayer: (player: DartsPlayer) =>
                set({ players: [...get().players.map((p) => (p.name === player.name ? player : p))] }),
            clearPoints: () => {
                const state = get();
                const resetPlayers = state.players.map((player) => ({
                    ...player,
                    points: player.startingPoints,
                    place: DartsPlayerPlace.None,
                }));
                return set({ ...initialState, players: resetPlayers });
            },
            clearGame: () => set({ ...get(), ...initialState }),
        }),
        {
            name: 'workout-composer-darts-game',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
