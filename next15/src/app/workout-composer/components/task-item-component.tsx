'use client';

import style from './task-item-component.module.scss';
import { Draggable, DraggableProvided } from '@hello-pangea/dnd';
import { Task } from '../types';
import { useWorkoutStore } from '../workout-store';
import Image from 'next/image';

type TaskItemComponentProps = {
    task: Task;
    index: number;
};

export const TaskItemComponent = (props: TaskItemComponentProps) => {
    const { isLocked } = useWorkoutStore();

    return (
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
                                // onClick={editExercise}
                                className={style.actionIcon}
                                style={{ top: '3px', right: '4px' }}>
                                <Image src="/icons/edit-icon.svg" alt="edit" width={23} height={23} />
                            </div>
                            <div
                                // onDoubleClick={removeExercise}
                                className={style.actionIcon}
                                style={{ bottom: '3px', right: '3px' }}>
                                <Image src="/icons/remove-icon.svg" alt="remove" width={24} height={24} />
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};
