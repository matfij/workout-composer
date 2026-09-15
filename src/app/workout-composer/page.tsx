"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { getWorkout } from "./actions";
import { DayItemComponent } from "./components/day-item-component";
import { MenuComponent } from "./components/menu-component";
import { SAMPLE_WORKOUT } from "./data/sample-workout";
import { DroppableKind } from "./types";
import { useWorkoutStore } from "./workout-store";

import style from "./page.module.scss";

export default function WorkoutComposerPage() {
    const { days, setDays, setIsLocked, moveTask, moveTaskGroup, setIsDragging } =
        useWorkoutStore();
    const [searchParams] = useSearchParams();

    const setupWorkout = useCallback(async () => {
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
    }, [searchParams, days, setDays, setIsLocked]);

    useEffect(() => {
        void setupWorkout();
    }, [setupWorkout]);

    const onMoveTask = (result: DropResult) => {
        if (result.destination && result.type === DroppableKind.Day) {
            moveTaskGroup(
                result.draggableId,
                result.source.droppableId,
                result.destination.droppableId,
                result.source.index,
                result.destination.index,
            );
        } else if (result.destination && result.type === DroppableKind.Group) {
            moveTask(result.draggableId, result.destination.droppableId, result.destination.index);
        }
        setIsDragging(false);
    };

    return (
        <>
            <main className={style.mainWrapper}>
                <h1 className="title" style={{ marginBottom: "0.5rem" }}>
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
