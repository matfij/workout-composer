export type Plan = {
    days: Day[];
    isLocked: boolean;
    isDragging: boolean;
    editedTaskId?: string;
};

export type Day = {
    id: string;
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
