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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {boardData.days.map((day) => (
          <div key={day.day}>
            <h2>{day.day}</h2>
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
        <h1>
          <b>Standby</b>
        </h1>
        <Droppable droppableId={STANDBY_ID}>
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {boardData.standby.map((exercise, index) => (
                <ExerciseItem {...exercise} index={index} key={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ExerciseBoard;
