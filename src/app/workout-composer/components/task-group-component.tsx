'use client';

import style from './task-item-component.module.scss';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';
import { TaskGroup } from '../types';
import { useWorkoutStore } from '../workout-store';
import { useState } from 'react';
import { TaskFormComponent } from './task-form-component';
import { TaskVideoModalComponent } from './task-video-modal-component';

type TaskGroupComponentProps = {
    index: number;
    taskGroup: TaskGroup;
};

export const TaskGroupComponent = (props: TaskGroupComponentProps) => {
    const { isLocked, removeTaskGroup } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const task = props.taskGroup.tasks[0];

    const showVideoButton = isLocked && task.videoUrl;

    return (
        <>
            {showTaskForm && <TaskFormComponent task={task} onCancel={() => setShowTaskForm(false)} />}
            {showVideoModal && (
                <TaskVideoModalComponent
                    videoUrl={task.videoUrl!}
                    options={{ autoplay: true, loop: true }}
                    onCancel={() => setShowVideoModal(false)}
                />
            )}
            <Draggable draggableId={props.taskGroup.id} index={props.index} isDragDisabled={isLocked}>
                {(dragProvider) => (
                    <div
                        ref={dragProvider.innerRef}
                        {...dragProvider.draggableProps}
                        {...dragProvider.dragHandleProps}
                        className={style.taskItem}>
                        <p className="bold primary">{task.name}</p>
                        <p>
                            {task.sets} x {task.reps}
                        </p>
                        <p className="thin">{task.description || <br />}</p>
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
                                    onDoubleClick={() => removeTaskGroup(props.taskGroup.id)}
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
