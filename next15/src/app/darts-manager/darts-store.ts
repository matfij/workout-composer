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
    incrementPlayerIndex: () => void;
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
            incrementPlayerIndex: () => {
                const state = get();
                let nextIndex = state.currentPlayerIndex + 1;
                let iteration = 0;
                while (true) {
                    if (nextIndex >= state.players.length) {
                        nextIndex = 0;
                    }
                    const nextPlayer = state.players[nextIndex];
                    if (nextPlayer.place === DartsPlayerPlace.None) {
                        break;
                    }
                    if (iteration > state.players.length) {
                        nextIndex = state.currentPlayerIndex;
                        break;
                    }
                    nextIndex++;
                    iteration++;
                }
                if (nextIndex <= state.currentPlayerIndex) {
                    set({ currentTurn: state.currentTurn + 1 });
                }
                set({ currentPlayerIndex: nextIndex });
            },
            clearPoints: () => {
                const state = get();
                const resetPlayers = state.players.map((player) => ({
                    ...player,
                    points: player.startingPoints,
                    place: DartsPlayerPlace.None,
                }));
                set({ ...initialState, players: resetPlayers });
            },
            clearGame: () => set({ ...get(), ...initialState }),
        }),
        {
            name: 'workout-composer-darts-game',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
