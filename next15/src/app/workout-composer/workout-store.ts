import { createJSONStorage, persist } from 'zustand/middleware';
import { Day, Plan } from './types';
import { create } from 'zustand';

const initialState: Plan = {
    days: [],
    freeTasks: [],
    isLocked: false,
};

type WorkoutStore = Plan & {
    setPlan: (plan: Plan) => void;
    setDays: (days: Day[]) => void;
    lock: () => void;
    unlock: () => void;
};

export const useWorkoutStore = create(
    persist<WorkoutStore>(
        (set, get) => ({
            ...initialState,
            setPlan: (plan: Plan) => set(plan),
            setDays: (days: Day[]) => set({ days }),
            lock: () => set({ isLocked: true }),
            unlock: () => set({ isLocked: false }),
        }),
        {
            name: 'workout-composer-workout',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
