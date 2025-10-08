'use client';

import style from './page.module.scss';
import { MenuComponent } from './components/menu-component';
import { useWorkoutStore } from './workout-store';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { DayItemComponent } from './components/day-item-component';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getWorkout } from './actions';
import { ToastContainer } from 'react-toastify';
import { SAMPLE_WORKOUT } from './data/sample-workout';

export default function WorkoutComposerPage() {
    const { days, setDays, setIsLocked, moveTaskGroup, setIsDragging } = useWorkoutStore();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        void setupWorkout();
    }, []);

    const setupWorkout = async () => {
        if (!searchParams) {
            if (days.length === 0) {
                setDays(SAMPLE_WORKOUT);
            }
            return;
        }
        const workoutId = searchParams[1];
        if (!workoutId) {
            return;
        }
        const workout = await getWorkout(workoutId);
        if (!workout) {
            return;
        }
        setDays(workout);
        setIsLocked(true);
    };

    const onMoveTask = (result: DropResult) => {
        if (result.destination) {
            moveTaskGroup(
                result.draggableId,
                result.source.droppableId,
                result.destination.droppableId,
                result.source.index,
                result.destination.index,
            );
        }
        setIsDragging(false);
    };

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: '0.5rem' }}>
                    Workout Composer
                </h1>
                <DragDropContext onDragStart={() => setIsDragging(true)} onDragEnd={onMoveTask}>
                    <section className={style.daysWrapper}>
                        {days.map((day) => (
                            <DayItemComponent key={day.name} day={day} />
                        ))}
                    </section>
                </DragDropContext>
            </main>
            <MenuComponent />
            <ToastContainer />
        </>
    );
}
