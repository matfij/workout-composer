import style from './exercise-board.module.css';
import { FunctionComponent } from 'react';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { BoardData, useBoardData, useSetBoardDataContext } from '../context/BoardContext';
import ExerciseItem from './exercise-item';

export const STANDBY_ID = 'item-standby';

const ExerciseBoard: FunctionComponent = () => {
  const boardData = useBoardData();
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
    };

    updateBoardData(newBoardData);
  };

  return (
    <section className="">
      <DragDropContext onDragEnd={onDragEnd}>
        <section className={style.daysWrapper}>
          {boardData.days.map((day) => (
            <div key={day.day} className={style.dayWrapper}>
              <h3 className="text-center p-2 text-lg font-bold">{day.day}</h3>
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
        <section>
          <div className="w-full">
            <h3 className="text-center text-lg font-bold">Standby</h3>
            <Droppable droppableId={STANDBY_ID}>
              {(provided: DroppableProvided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={style.standbyWrapper}>
                  {boardData.standby.map((exercise, index) => (
                    <div key={index} className="w-full m-auto block">
                      <ExerciseItem {...exercise} index={index} />
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </section>
      </DragDropContext>
    </section>
  );
};

export default ExerciseBoard;
