import style from './exercise-item.module.css';
import { FunctionComponent } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { BoardData, useBoardDataContext, useSetBoardDataContext } from '../context/BoardContext';

export interface Exercise {
  id: string;
  name: string;
  reps?: number;
  sets?: number;
  description?: string;
}

interface Props extends Exercise {
  index: number;
}

const ExerciseItem: FunctionComponent<Props> = (props: Props) => {
  const boardData = useBoardDataContext();
  const updateBoardData = useSetBoardDataContext();

  const removeExercise = () => {
    if (boardData.locked) return;

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
    <Draggable key={props.id} draggableId={props.id} index={props.index} isDragDisabled={boardData.locked}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="relative"
        >
          <div className={style.exerciseItem}>
            <p className="text-md text-yellow-300">{props.name}</p>
            <p>
              {props.sets} x {props.reps}
            </p>
            <p className="font-thin">{props.description ? `${props.description}` : ''}</p>
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
