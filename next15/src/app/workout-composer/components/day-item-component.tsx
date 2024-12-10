'use client';

import style from './day-item-component.module.scss';
import { KeyboardEvent, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Day } from '../types';
import { TaskItemComponent } from './task-item-component';
import { TaskFormComponent } from './task-form-component';
import Image from 'next/image';
import { useWorkoutStore } from '../workout-store';

type DayItemComponentProps = {
    day: Day;
};

export const DayItemComponent = (props: DayItemComponentProps) => {
    const { isLocked, isDragging, editDay } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [name, setName] = useState(props.day.name);
    const [isEditingName, setIseEditingName] = useState(false);

    const showAddButton = !isLocked && !isDragging;

    const onEditNameKeyDown = (event: KeyboardEvent) => {
        console.log(event.key);
        if (event.key === 'Escape') {
            onEditNameBlur();
            return;
        }
        if (event.key !== 'Enter' || !name) {
            return;
        }
        editDay({ ...props.day, name });
        setIseEditingName(false);
    };

    const onEditNameBlur = () => {
        setName(props.day.name);
        setIseEditingName(false);
    };

    return (
        <>
            <section className={style.dayWrapper} onBlur={onEditNameBlur}>
                {!isEditingName && (
                    <h3 onDoubleClick={() => setIseEditingName(true)} className="subtitle center">
                        {props.day.name}
                    </h3>
                )}
                {isEditingName && (
                    <input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(event) => onEditNameKeyDown(event)}
                        onBlur={onEditNameBlur}
                        className={`${style.dayInput} subtitle light`}
                    />
                )}
                <Droppable droppableId={props.day.name}>
                    {(dropProvider) => (
                        <div {...dropProvider.droppableProps} ref={dropProvider.innerRef}>
                            {props.day.tasks.map((task, taskIndex) => (
                                <TaskItemComponent key={task.id} index={taskIndex} task={task} />
                            ))}
                        </div>
                    )}
                </Droppable>
                {showAddButton && (
                    <div onClick={() => setShowTaskForm(true)} className={style.addBtn}>
                        <Image src="/icons/add-icon-light.svg" alt="add" width={40} height={40} />
                    </div>
                )}
            </section>
            {showTaskForm && (
                <TaskFormComponent dayName={props.day.name} onCancel={() => setShowTaskForm(false)} />
            )}
        </>
    );
};
