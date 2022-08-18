import { FunctionComponent } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { BoardData, useBoardData, useSetBoardDataContext } from '../context/BoardContext';

export interface Exercise {
  id: string;
  name: string;
  reps?: number;
  sets?: number;
  rest?: string;
}

interface Props extends Exercise {
  index: number;
}

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  const boardData = useBoardData();
  const updateBoardData = useSetBoardDataContext();

  const removeExercise = () => {
    const newBoardData: BoardData = {
      days: boardData.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.filter((exercise) => exercise.id !== props.id),
      })),
      standby: boardData.standby.filter((exercise) => exercise.id !== props.id),
      locked: boardData.locked,
    };
    updateBoardData(newBoardData);
  };

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="relative"
        >
          <div className="p-4 w-full m-auto bg-white border shadow-sm flex flex-col items-center font-semibold">
            <p className="text-xl text-teal-600">{props.name}</p>
            <p>
              {props.sets} x {props.reps}
            </p>
            <p>{props.rest ? `${props.rest} rest` : ''}</p>
            <div onDoubleClick={removeExercise} className="absolute top-2 right-2 cursor-pointer">
              ❌
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseItem;
