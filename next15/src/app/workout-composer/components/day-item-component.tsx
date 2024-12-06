'use client';

import style from './day-item-component.module.scss';
import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Day } from '../types';
import { TaskItemComponent } from './task-item-component';
import { TaskFormComponent } from './task-form-component';

type DayItemComponentProps = {
    day: Day;
};

export const DayItemComponent = (props: DayItemComponentProps) => {
    const [showTaskForm, setShowTaskForm] = useState(false);

    return (
        <section className={style.dayWrapper}>
            <h3 className="subtitle center" style={{ marginBottom: '0.5rem' }}>
                {props.day.name}
            </h3>
            <Droppable droppableId={props.day.name}>
                {(dropProvider) => (
                    <div {...dropProvider.droppableProps} ref={dropProvider.innerRef}>
                        {props.day.tasks.map((task, taskIndex) => (
                            <TaskItemComponent key={task.id} index={taskIndex} task={task} />
                        ))}
                    </div>
                )}
            </Droppable>
            {showTaskForm && (
                <TaskFormComponent
                    dayName={props.day.name}
                    onAddDay={() => setShowTaskForm(true)}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </section>
    );
};
