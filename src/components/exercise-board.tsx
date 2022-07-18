import { FunctionComponent } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import {
  BoardData,
  useBoardData,
  useSetBoardDataContext,
} from '../context/BoardContext';
import ExerciseItem from './exercise-item';

const ExerciseBoard: FunctionComponent = () => {
  const boardData = useBoardData();
  const updateBoardData = useSetBoardDataContext();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // get change
    console.log(result.source.droppableId);
    const startDay = result.source.droppableId;
    const startIndex = result.source.index;
    const endDay = result.destination?.droppableId;
    const endIndex = result.destination.index;

    const changedExercise = boardData.days.find((day) => day.day === startDay)
      ?.exercises[startIndex];

    const newBoardData: BoardData = {
      days: [
        ...boardData.days.map((day) => {
          if (day.day === startDay) {
            day.exercises.splice(startIndex, 1);
          } 
          if (day.day === endDay && changedExercise) {
            day.exercises.splice(endIndex, 0, changedExercise);
          }
          return day;
        }),
      ],
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
      </DragDropContext>
    </>
  );
};

export default ExerciseBoard;
