import { createJSONStorage, persist } from 'zustand/middleware';
import { Day, Plan, Task } from './types';
import { create } from 'zustand';
import { UtilityManger } from '../../shared/managers/utility-manager';

const initialState: Plan = {
    days: [
        {
            id: 'koks-day',
            name: 'KoksDat',
            tasks: [
                { id: 'heavy-press', name: 'Heavy Press', sets: '3', reps: '9' },
                { id: 'long-stretch', name: 'Long Stretch', sets: '2', reps: '12' },
            ],
        },
        {
            id: 'run-day',
            name: 'RunDay',
            tasks: [
                { id: 'hill-sprint', name: 'Hill Sprint', sets: '4', reps: '120' },
                { id: 'bike-squat', name: 'Bike Squat', sets: '3', reps: '10' },
            ],
        },
    ],
    isLocked: false,
    isDragging: false,
};

type WorkoutStore = Plan & {
    setPlan: (plan: Plan) => void;
    setDays: (days: Day[]) => void;
    addDay: (day: Omit<Day, 'id'>) => void;
    editDay: (day: Day) => void;
    setIsLocked: (isLocked: boolean) => void;
    setIsDragging: (isDragging: boolean) => void;
    addTask: (dayName: string, task: Task) => void;
    moveTask: (
        taskId: string,
        oldDayName: string,
        newDayName: string,
        oldNameIndex: number,
        newDayIndex: number,
    ) => void;
    removeTask: (taskId: string) => void;
    editTask: (task: Task) => void;
};

export const useWorkoutStore = create(
    persist<WorkoutStore>(
        (set, get) => ({
            ...initialState,
            setPlan: (plan: Plan) => set(plan),
            setDays: (days: Day[]) => set({ days }),
            addDay: (day: Omit<Day, 'id'>) =>
                set({ days: [...get().days, { ...day, id: UtilityManger.generateId() }] }),
            editDay: (day: Day) => set({ days: get().days.map((d) => (d.id === day.id ? day : d)) }),
            setIsLocked: (isLocked: boolean) => set({ isLocked }),
            setIsDragging: (isDragging: boolean) => set({ isDragging }),
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
            removeTask: (taskId: string) => {
                const days = get().days;
                set({
                    days: days.map((day) => ({
                        ...day,
                        tasks: day.tasks.filter((t) => t.id !== taskId),
                    })),
                });
            },
            editTask: (task: Task) => {
                const days = get().days;
                set({
                    days: days.map((day) => ({
                        ...day,
                        tasks: day.tasks.map((t) => (t.id === task.id ? task : t)),
                    })),
                });
            },
        }),
        {
            name: 'workout-composer-workout',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
