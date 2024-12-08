'use client';

import style from './day-item-component.module.scss';
import { useState } from 'react';
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
    const { isLocked, isDragging } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);

    const showAddButton = !isLocked && !isDragging;

    return (
        <section className={style.dayWrapper}>
            <h3 className="subtitle center">{props.day.name}</h3>
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
            {showTaskForm && (
                <TaskFormComponent dayName={props.day.name} onCancel={() => setShowTaskForm(false)} />
            )}
        </section>
    );
};
