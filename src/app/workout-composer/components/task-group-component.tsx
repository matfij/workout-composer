'use client';

import { TaskGroup } from '../types';
import { TaskItemComponent } from './task-item-component';

type TaskGroupComponentProps = {
    index: number;
    taskGroup: TaskGroup;
};

export const TaskGroupComponent = (props: TaskGroupComponentProps) => {
    return (
        <>
            {props.taskGroup.tasks.map((task, taskIndex) => (
                <TaskItemComponent key={task.id} index={taskIndex} task={task} />
            ))}
        </>
    );
};
