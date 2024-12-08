'use client';

import style from './page.module.scss';
import { useState } from 'react';
import { MenuComponent } from './components/menu-component';
import { useWorkoutStore } from './workout-store';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { DayItemComponent } from './components/day-item-component';

export default function WorkoutComposerPage() {
    const { days, moveTask } = useWorkoutStore();
    const [showDayForm, setShowDayForm] = useState(false);

    const onMoveTask = (result: DropResult) => {
        if (result.destination) {
            moveTask(
                result.draggableId,
                result.source.droppableId,
                result.destination.droppableId,
                result.source.index,
                result.destination.index,
            );
        }
    };

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Workout Composer
                </h1>
                <DragDropContext onDragEnd={onMoveTask}>
                    <section className={style.daysWrapper}>
                        {days.map((day) => (
                            <DayItemComponent key={day.name} day={day} />
                        ))}
                    </section>
                </DragDropContext>
            </main>
            <MenuComponent showAddForm={() => setShowDayForm(true)} />
        </>
    );
}
