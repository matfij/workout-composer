import React, { useState } from 'react';
import style from './exercise-list.module.css';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useExerciseBoardContext, useSetExerciseBoardContext } from '../contexts/exercise-board.context';
import ExerciseItem from './exercise-item.component';
import { STANDBY_ID } from '../definitions/constants';

export default function ExerciseList() {
  const [editDay, setEditDay] = useState(-1);
  const [dayName, setDayName] = useState('');
  const exerciseBoard = useExerciseBoardContext();
  const setExerciseBoard = useSetExerciseBoardContext();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const startDay = result.source.droppableId;
    const startIndex = result.source.index;
    const endDay = result.destination?.droppableId;
    const endIndex = result.destination.index;

    const movedExercise =
      startDay === STANDBY_ID
        ? exerciseBoard.standby[startIndex]
        : exerciseBoard.days.find((day) => day.day === startDay)?.exercises[startIndex];

    startDay === STANDBY_ID ? exerciseBoard.standby.splice(startIndex, 1) : null;
    endDay === STANDBY_ID && movedExercise ? exerciseBoard.standby.splice(endIndex, 0, movedExercise) : null;

    setExerciseBoard({
      days: [
        ...exerciseBoard.days.map((day) => {
          if (day.day === startDay) {
            day.exercises.splice(startIndex, 1);
          }
          if (day.day === endDay && movedExercise) {
            day.exercises.splice(endIndex, 0, movedExercise);
          }
          return day;
        }),
      ],
      standby: exerciseBoard.standby,
      locked: exerciseBoard.locked,
    });
  };

  const startEditDay = (index: number, name: string) => {
    setEditDay(index);
    setDayName(name);
  };

  const submitEditDay = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    setExerciseBoard({
      ...exerciseBoard,
      days: exerciseBoard.days.map((day, index) => (index === editDay ? { ...day, day: dayName } : day)),
    });
    setEditDay(-1);
  };

  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className={style.daysWrapper}>
          {exerciseBoard.days.map((day, index) => (
            <div key={day.day} className={style.dayWrapper}>
              {editDay === index ? (
                <input
                  type="text"
                  value={dayName}
                  onChange={(event) => setDayName(event.target.value)}
                  onKeyDown={(event) => submitEditDay(event as unknown as KeyboardEvent)}
                  className={style.dayNameInput}
                />
              ) : (
                <h3
                  onDoubleClick={() => startEditDay(index, day.day)}
                  className="text-center p-2 text-lg font-semibold text-neutral-100"
                >
                  {day.day}
                </h3>
              )}

              <Droppable droppableId={day.day}>
                {(provided: DroppableProvided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {day.exercises.map((exercise, index) => (
                      <ExerciseItem exercise={exercise} index={index} key={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </section>
        <h3 className="text-center mb-2 text-lg font-semibold text-neutral-100 mt-4">Standby</h3>
        <section className={style.standbyWrapper}>
          <Droppable droppableId={STANDBY_ID} direction="horizontal">
            {(provided: DroppableProvided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={style.standbyListWrapper}>
                {exerciseBoard.standby.map((exercise, index) => (
                  <div key={index} className={style.standbyItem}>
                    <ExerciseItem exercise={exercise} index={index} />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </section>
      </DragDropContext>
    </section>
  );
}
