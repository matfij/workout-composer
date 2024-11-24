export type Plan = {
    days: Day[];
    freeTasks: Task[];
    isLocked: boolean;
    editedTaskId?: string;
};

export type Day = {
    name: string;
    tasks: Task[];
};

export type Task = {
    id: string;
    name: string;
    reps?: string;
    sets?: string;
    description?: string;
};
