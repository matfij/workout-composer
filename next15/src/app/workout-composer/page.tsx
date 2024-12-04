'use client';

import style from './page.module.scss';
import { useState } from 'react';
import { MenuComponent } from './components/menu-component';
import { TaskFormComponent } from './components/task-form-component';
import { useWorkoutStore } from './workout-store';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { TaskCardComponent } from './components/task-card-component';

export default function WorkoutComposerPage() {
    const { freeTasks } = useWorkoutStore();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showDayForm, setShowDayForm] = useState(false);

    const onMoveTask = (e: DropResult) => {
        console.log(e);
    };

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Workout Composer
                </h1>
                <DragDropContext onDragEnd={onMoveTask}>
                    <Droppable droppableId="freeTasks">
                        {(dropProvider) => (
                            <div {...dropProvider.droppableProps} ref={dropProvider.innerRef}>
                                {freeTasks.map((task, taskIndex) => (
                                    <TaskCardComponent key={task.id} task={task} index={taskIndex} />
                                ))}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </main>
            <MenuComponent showAddForm={() => setShowTaskForm(true)} />
            {showTaskForm && (
                <TaskFormComponent
                    onAddDay={() => setShowDayForm(true)}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </>
    );
}
