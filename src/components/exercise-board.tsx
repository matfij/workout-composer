import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { useBoardData } from '../context/BoardContext';
import ExerciseItem from './exercise-item';

const ExerciseBoard: FunctionComponent = () => {
  const boardData = useBoardData();
  // const setExercises = useBoardDataUpdate();

  // useEffect(() => {
  //   setExercises(props.exercises);
  // }, [props.exercises]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // const items = Array.from(exercises);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // setExercises(items);
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
