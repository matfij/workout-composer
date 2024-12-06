export type Plan = {
    days: Day[];
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
