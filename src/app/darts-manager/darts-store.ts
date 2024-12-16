import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { dartsConfig, DartsGame, DartsPlayer, DartsPlayerPlace } from './types';

const MAX_ITERATION = 10_000;

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
    undoAction: () => void;
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
                while (iteration < MAX_ITERATION) {
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
            undoAction: () => {
                const state = get();
                if (!state.players.length) {
                    return;
                }
                let lastIndex = state.currentPlayerIndex - 1;
                let iteration = 0;
                while (iteration < MAX_ITERATION) {
                    if (lastIndex < 0) {
                        lastIndex = state.players.length - 1;
                    }
                    const lastPlayer = state.players[lastIndex];
                    if (lastPlayer.place === DartsPlayerPlace.None) {
                        break;
                    }
                    if (iteration > state.players.length) {
                        lastIndex = state.currentPlayerIndex;
                        break;
                    }
                    lastIndex--;
                    iteration++;
                }
                const lastPlayer = state.players[lastIndex];
                if (lastPlayer && lastPlayer.throws.length >= dartsConfig.throwsNumber) {
                    const pointsToAdd = lastPlayer.throws
                        .splice(lastPlayer.throws.length - dartsConfig.throwsNumber)
                        .reduce((sum, curr) => sum + curr, 0);
                    lastPlayer.points += pointsToAdd;
                    set({
                        currentPlayerIndex: lastIndex,
                        players: [...get().players.map((p) => (p.name === lastPlayer.name ? lastPlayer : p))],
                    });
                }
            },
        }),
        {
            name: 'workout-composer-darts-game',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
