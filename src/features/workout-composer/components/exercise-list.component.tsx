import React, { useContext, useState } from 'react';
import Image from 'next/image';
import style from './exercise-list.module.scss';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import ExerciseItem from './exercise-item.component';
import { STANDBY_ID } from '../definitions/constants';
import { WorkoutContext } from '../contexts/exercise-board.context';

export default function ExerciseList() {
  const [editDay, setEditDay] = useState(-1);
  const [dayName, setDayName] = useState('');
  const { workout, setWorkout } = useContext(WorkoutContext);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const startDay = result.source.droppableId;
    const startIndex = result.source.index;
    const endDay = result.destination?.droppableId;
    const endIndex = result.destination.index;

    const movedExercise =
      startDay === STANDBY_ID
        ? workout.standby[startIndex]
        : workout.days.find((day) => day.day === startDay)?.exercises[startIndex];

    startDay === STANDBY_ID ? workout.standby.splice(startIndex, 1) : null;
    endDay === STANDBY_ID && movedExercise ? workout.standby.splice(endIndex, 0, movedExercise) : null;

    setWorkout({
      days: [
        ...workout.days.map((day) => {
          if (day.day === startDay) {
            day.exercises.splice(startIndex, 1);
          }
          if (day.day === endDay && movedExercise) {
            day.exercises.splice(endIndex, 0, movedExercise);
          }
          return day;
        }),
      ],
      standby: workout.standby,
      locked: workout.locked,
    });
  };

  const startEditDay = (index: number, name: string) => {
    if (workout.locked) return;
    setEditDay(index);
    setDayName(name);
  };

  const submitEditDay = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || !dayName) return;
    editDayName();
  };

  const editDayName = () => {
    setWorkout({
      ...workout,
      days: workout.days.map((day, index) => (index === editDay ? { ...day, day: dayName } : day)),
    });
    setEditDay(-1);
  };

  const removeDay = (removeIndex: number) => {
    setWorkout({
      ...workout,
      days: workout.days.filter((_, index) => index !== removeIndex),
    });
    setEditDay(-1);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className={style.daysWrapper}>
        {workout.days.map((day, index) => (
          <div key={day.day} className={style.dayWrapper}>
            {editDay === index ? (
              <>
                <input
                  type="text"
                  value={dayName}
                  onChange={(event) => setDayName(event.target.value)}
                  onKeyDown={(event) => submitEditDay(event as unknown as KeyboardEvent)}
                  onBlur={editDayName}
                  className={style.dayNameInput + ' inline'}
                />
                <div onDoubleClick={() => removeDay(index)} className={style.removeIcon}>
                  <Image src="/icons/remove-icon.svg" alt="remove" width={20} height={20} />
                </div>
              </>
            ) : (
              <h3 onDoubleClick={() => startEditDay(index, day.day)} className="subtitle">
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
      {!workout.locked && (
        <>
          <h3 className="subtitle">Standby</h3>
          <section className={style.standbyWrapper}>
            <Droppable droppableId={STANDBY_ID} direction="horizontal">
              {(provided: DroppableProvided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={style.standbyListWrapper}
                >
                  {workout.standby.map((exercise, index) => (
                    <div key={index} className={style.standbyItem}>
                      <ExerciseItem exercise={exercise} index={index} />
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>
        </>
      )}
    </DragDropContext>
  );
}
