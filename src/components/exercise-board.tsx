import { FunctionComponent, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import ExerciseItem from './exercise-item';

export interface Exercise {
  name: string;
  reps?: number;
  sets?: number;
  rest?: string;
}

type Props = {
  exercises: Exercise[];
};

const ExerciseBoard: FunctionComponent<Props> = (props: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    setExercises(props.exercises);
  }, [props.exercises]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(exercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExercises(items);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="exercises">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {exercises.map((exercise, index) => (
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
