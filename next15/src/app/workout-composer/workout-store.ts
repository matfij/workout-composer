import { createJSONStorage, persist } from 'zustand/middleware';
import { Day, Plan, Task } from './types';
import { create } from 'zustand';
import { UtilityManger } from '../../shared/managers/utility-manager';

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
    addTask: (task: Task) => void;
};

export const useWorkoutStore = create(
    persist<WorkoutStore>(
        (set, get) => ({
            ...initialState,
            setPlan: (plan: Plan) => set(plan),
            setDays: (days: Day[]) => set({ days }),
            lock: () => set({ isLocked: true }),
            unlock: () => set({ isLocked: false }),
            addTask: (task: Omit<Task, 'id'>) => {
                const freeTasks = get().freeTasks;
                const newTask = {
                    ...task,
                    id: UtilityManger.generateId(),
                };
                set({ freeTasks: [...freeTasks, newTask] });
            },
        }),
        {
            name: 'workout-composer-workout',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
