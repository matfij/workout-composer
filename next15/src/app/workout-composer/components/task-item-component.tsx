'use client';

import style from './task-item-component.module.scss';
import { Draggable } from '@hello-pangea/dnd';
import { Day, Task } from '../types';
import { useWorkoutStore } from '../workout-store';
import Image from 'next/image';
import { useState } from 'react';
import { TaskFormComponent } from './task-form-component';

type TaskItemComponentProps = {
    task: Task;
    dayName: string;
    index: number;
};

export const TaskItemComponent = (props: TaskItemComponentProps) => {
    const { isLocked, removeTask } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);

    return (
        <>
            <Draggable draggableId={props.task.id} index={props.index} isDragDisabled={isLocked}>
                {(dragProvider) => (
                    <div
                        ref={dragProvider.innerRef}
                        {...dragProvider.draggableProps}
                        {...dragProvider.dragHandleProps}
                        className={style.taskItem}>
                        <p className="bold primary">{props.task.name}</p>
                        <p>
                            {props.task.sets} x {props.task.reps}
                        </p>
                        <p className="thin">{props.task.description || <br />}</p>
                        {!isLocked && (
                            <>
                                <div
                                    onClick={() => setShowTaskForm(true)}
                                    className={style.actionIcon}
                                    style={{ top: '3px', right: '4px' }}>
                                    <Image src="/icons/edit-icon.svg" alt="edit" width={23} height={23} />
                                </div>
                                <div
                                    onDoubleClick={() => removeTask(props.task.id)}
                                    className={style.actionIcon}
                                    style={{ bottom: '3px', right: '3px' }}>
                                    <Image src="/icons/remove-icon.svg" alt="remove" width={24} height={24} />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Draggable>
            {showTaskForm && (
                <TaskFormComponent
                    task={props.task}
                    dayName={props.dayName}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </>
    );
};
