'use client';

import style from './task-item-component.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useWorkoutStore } from '../workout-store';
import { TaskFormComponent } from './task-form-component';
import { TaskVideoModalComponent } from './task-video-modal-component';
import { Task } from '../types';

type TaskItemComponentProps = {
    index: number;
    task: Task;
};

export const TaskItemComponent = (props: TaskItemComponentProps) => {
    const { isLocked, removeTask } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const showVideoButton = isLocked && props.task.videoUrl;

    return (
        <>
            {showTaskForm && <TaskFormComponent task={props.task} onCancel={() => setShowTaskForm(false)} />}
            {showVideoModal && (
                <TaskVideoModalComponent
                    videoUrl={props.task.videoUrl!}
                    options={{ autoplay: true, loop: true }}
                    onCancel={() => setShowVideoModal(false)}
                />
            )}
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
                        {showVideoButton && (
                            <div
                                onClick={() => setShowVideoModal(true)}
                                className={style.actionIcon}
                                style={{ top: '3px', right: '3px' }}>
                                <Image src="/icons/video-icon.svg" alt="edit" width={30} height={30} />
                            </div>
                        )}
                        {!isLocked && (
                            <>
                                <div
                                    onClick={() => setShowTaskForm(true)}
                                    className={style.actionIcon}
                                    style={{ top: '6px', right: '36px' }}>
                                    <Image src="/icons/edit-icon.svg" alt="edit" width={25} height={25} />
                                </div>
                                <div
                                    onDoubleClick={() => removeTask(props.task.id)}
                                    className={style.actionIcon}
                                    style={{ top: '3px', right: '3px' }}>
                                    <Image src="/icons/remove-icon.svg" alt="remove" width={28} height={28} />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Draggable>
        </>
    );
};
