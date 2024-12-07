import { createJSONStorage, persist } from 'zustand/middleware';
import { Day, Plan, Task } from './types';
import { create } from 'zustand';
import { UtilityManger } from '../../shared/managers/utility-manager';

const initialState: Plan = {
    days: [
        {
            name: 'KoksDat',
            tasks: [
                { id: 'heavy-press', name: 'Heavy Press', sets: '3', reps: '9' },
                { id: 'long-stretch', name: 'Long Stretch', sets: '2', reps: '12' },
            ],
        },
        {
            name: 'RunDay',
            tasks: [
                { id: 'hill-sprint', name: 'Hill Sprint', sets: '4', reps: '120' },
                { id: 'bike-squat', name: 'Bike Squat', sets: '3', reps: '10' },
            ],
        },
    ],
    isLocked: false,
};

type WorkoutStore = Plan & {
    setPlan: (plan: Plan) => void;
    setDays: (days: Day[]) => void;
    lock: () => void;
    unlock: () => void;
    addTask: (dayName: string, task: Task) => void;
    moveTask: (
        taskId: string,
        oldDayName: string,
        newDayName: string,
        oldNameIndex: number,
        newDayIndex: number,
    ) => void;
};

export const useWorkoutStore = create(
    persist<WorkoutStore>(
        (set, get) => ({
            ...initialState,
            setPlan: (plan: Plan) => set(plan),
            setDays: (days: Day[]) => set({ days }),
            lock: () => set({ isLocked: true }),
            unlock: () => set({ isLocked: false }),
            addTask: (dayName: string, task: Omit<Task, 'id'>) => {
                const days = get().days;
                const newTask = {
                    ...task,
                    id: UtilityManger.generateId(),
                };
                set({
                    days: days.map((day) =>
                        day.name === dayName ? { ...day, tasks: [...day.tasks, newTask] } : day,
                    ),
                });
            },
            moveTask: (
                taskId: string,
                oldDayName: string,
                newDayName: string,
                oldDayIndex: number,
                newDayIndex: number,
            ) => {
                const days = get().days;
                const task = days
                    .map((d) => d.tasks)
                    .flatMap((t) => t)
                    .find((t) => t.id === taskId);
                if (!task) {
                    throw new Error(`Task ${taskId} not found`);
                }
                set({
                    days: days.map((day) => {
                        if (day.name === oldDayName) {
                            day.tasks.splice(oldDayIndex, 1);
                        }
                        if (day.name === newDayName) {
                            day.tasks.splice(newDayIndex, 0, task);
                        }
                        return day;
                    }),
                });
            },
        }),
        {
            name: 'workout-composer-workout',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
