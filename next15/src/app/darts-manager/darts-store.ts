import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DartsGame, DartsPlayer } from './types';

type DartsStore = DartsGame & {
    appendPlayer: (player: DartsPlayer) => void;
};

export const useDartsStore = create(
    persist<DartsStore>(
        (set, get) => ({
            players: [],
            currentPlayerIndex: 0,
            currentTurn: 0,
            appendPlayer: (player: DartsPlayer) => set({ players: [...get().players, player] }),
        }),
        {
            name: 'workout-composer-darts-game',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
