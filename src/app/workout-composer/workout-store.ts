import { createJSONStorage, persist } from 'zustand/middleware';
import { Day, Plan, Task } from './types';
import { create } from 'zustand';
import { UtilityManger } from '../../shared/managers/utility-manager';

const initialState: Plan = {
    days: [],
    isLocked: false,
    isDragging: false,
};

type WorkoutStore = Plan & {
    setPlan: (plan: Plan) => void;
    setDays: (days: Day[]) => void;
    addDay: (day: Omit<Day, 'id'>) => void;
    editDay: (day: Day) => void;
    removeDay: (dayId: string) => void;
    setIsLocked: (isLocked: boolean) => void;
    setIsDragging: (isDragging: boolean) => void;
    addTaskGroup: (dayName: string, task: Task) => void;
    moveTask: (taskId: string, targetGroupId: string, targetIndex: number) => void;
    moveTaskGroup: (
        groupId: string,
        oldDayName: string,
        newDayName: string,
        oldNameIndex: number,
        newDayIndex: number,
    ) => void;
    removeTask: (id: string) => void;
    removeTaskGroup: (id: string) => void;
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
            removeDay: (dayId: string) => set({ days: get().days.filter((d) => d.id !== dayId) }),
            setIsLocked: (isLocked: boolean) => set({ isLocked }),
            setIsDragging: (isDragging: boolean) => set({ isDragging }),
            addTaskGroup: (dayName: string, task: Omit<Task, 'id'>) => {
                const days = get().days;
                const newTask = {
                    ...task,
                    id: UtilityManger.generateId(),
                };
                set({
                    days: days.map((day) =>
                        day.name === dayName
                            ? {
                                  ...day,
                                  taskGroups: [
                                      ...day.taskGroups,
                                      { id: UtilityManger.generateId(), tasks: [newTask] },
                                  ],
                              }
                            : day,
                    ),
                });
            },
            moveTask: (taskId: string, targetGroupId: string, targetIndex: number) => {
                const taskToMove = get()
                    .days.flatMap((day) => day.taskGroups.flatMap((group) => group.tasks))
                    .find((task) => task.id === taskId);
                if (!taskToMove) {
                    return;
                }
                const updatedDays = get().days.map((day) => ({
                    ...day,
                    taskGroups: day.taskGroups.map((group) => ({
                        ...group,
                        tasks: group.tasks.filter((task) => task.id !== taskId),
                    })),
                }));
                updatedDays.forEach((day) => {
                    day.taskGroups.forEach(
                        (group) =>
                            group.id === targetGroupId && group.tasks.splice(targetIndex, 0, taskToMove),
                    );
                    day.taskGroups = day.taskGroups.filter((group) => group.tasks.length > 0);
                });
                set({
                    days: updatedDays,
                });
            },
            moveTaskGroup: (
                taskGroupId: string,
                oldDayName: string,
                newDayName: string,
                oldDayIndex: number,
                newDayIndex: number,
            ) => {
                const days = get().days;
                const taskGroup = days
                    .map((day) => day.taskGroups)
                    .flatMap((group) => group)
                    .find((group) => group.id === taskGroupId);
                if (!taskGroup) {
                    throw new Error(`Task group ${taskGroupId} not found`);
                }
                set({
                    days: days.map((day) => {
                        if (day.name === oldDayName) {
                            day.taskGroups.splice(oldDayIndex, 1);
                        }
                        if (day.name === newDayName) {
                            day.taskGroups.splice(newDayIndex, 0, taskGroup);
                        }
                        return day;
                    }),
                });
            },
            removeTask: (id: string) => {
                const days = get().days;
                set({
                    days: days.map((day) => ({
                        ...day,
                        taskGroups: day.taskGroups
                            .map((group) => ({
                                ...group,
                                tasks: group.tasks.filter((task) => task.id !== id),
                            }))
                            .filter((group) => group.tasks.length > 0),
                    })),
                });
            },
            removeTaskGroup: (id: string) => {
                const days = get().days;
                set({
                    days: days.map((day) => ({
                        ...day,
                        taskGroups: day.taskGroups.filter((group) => group.id !== id),
                    })),
                });
            },
            editTask: (editedTask: Task) => {
                const days = get().days;
                set({
                    days: days.map((day) => ({
                        ...day,
                        taskGroups: day.taskGroups.map((group) => ({
                            ...group,
                            tasks: group.tasks.map((task) => (task.id === editedTask.id ? editedTask : task)),
                        })),
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
