import React from 'react';
import style from './exercise-list.module.css';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import ExerciseItem from './exercise-item';
import { useBoardDataContext, useSetBoardDataContext, BoardData } from '../../context/BoardContext';

export const STANDBY_ID = 'item-standby';

export default function ExerciseList() {
  const boardData = useBoardDataContext();
  const updateBoardData = useSetBoardDataContext();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const startDay = result.source.droppableId;
    const startIndex = result.source.index;
    const endDay = result.destination?.droppableId;
    const endIndex = result.destination.index;

    const movedExercise =
      startDay === STANDBY_ID
        ? boardData.standby[startIndex]
        : boardData.days.find((day) => day.day === startDay)?.exercises[startIndex];

    startDay === STANDBY_ID ? boardData.standby.splice(startIndex, 1) : null;
    endDay === STANDBY_ID && movedExercise ? boardData.standby.splice(endIndex, 0, movedExercise) : null;

    const newBoardData: BoardData = {
      days: [
        ...boardData.days.map((day) => {
          if (day.day === startDay) {
            day.exercises.splice(startIndex, 1);
          }
          if (day.day === endDay && movedExercise) {
            day.exercises.splice(endIndex, 0, movedExercise);
          }
          return day;
        }),
      ],
      standby: boardData.standby,
      locked: boardData.locked,
    };

    updateBoardData(newBoardData);
  };

  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className={style.daysWrapper}>
          {boardData.days.map((day) => (
            <div key={day.day} className={style.dayWrapper}>
              <h3 className="text-center p-2 text-lg font-semibold text-neutral-100">{day.day}</h3>
              <Droppable droppableId={day.day}>
                {(provided: DroppableProvided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {day.exercises.map((exercise, index) => (
                      <ExerciseItem {...exercise} index={index} key={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </section>
        <section className={style.standbyWrapper}>
          <h3 className="text-center text-lg font-semibold text-neutral-100">Standby</h3>
          <Droppable droppableId={STANDBY_ID} direction="horizontal">
            {(provided: DroppableProvided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={style.standbyListWrapper}>
                {boardData.standby.map((exercise, index) => (
                  <div key={index} className={style.standbyItem}>
                    <ExerciseItem {...exercise} index={index} />
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
};
