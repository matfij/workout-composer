import React from 'react';
import Image from 'next/image';
import style from './exercise-item.module.css';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { useExerciseBoardContext, useSetExerciseBoardContext } from '../contexts/exercise-board.context';
import { Exercise } from '../definitions';

type Props = {
  exercise: Exercise;
  index: number;
};

export default function ExerciseItem(props: Props) {
  const exerciseBoard = useExerciseBoardContext();
  const setExerciseBoard = useSetExerciseBoardContext();

  const editExercise = () => {
    setExerciseBoard({
      ...exerciseBoard,
      editedExercise: props.exercise,
    });
  };

  const removeExercise = () => {
    if (exerciseBoard.locked) return;
    setExerciseBoard({
      days: exerciseBoard.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.filter((exercise) => exercise.id !== props.exercise.id),
      })),
      standby: exerciseBoard.standby.filter((exercise) => exercise.id !== props.exercise.id),
      locked: exerciseBoard.locked,
    });
  };

  return (
    <Draggable
      key={props.exercise.id}
      draggableId={props.exercise.id}
      index={props.index}
      isDragDisabled={exerciseBoard.locked}
    >
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="relative"
        >
          <div className={style.exerciseItem}>
            <p data-testid="exercise-name" className="text-md text-yellow-300">
              {props.exercise.name}
            </p>
            <p>
              {props.exercise.sets} x {props.exercise.reps}
            </p>
            <p className="font-thin">{props.exercise.description ? `${props.exercise.description}` : ''}</p>

            {!exerciseBoard.locked ? (
              <div onClick={editExercise} className="absolute top-2 right-8 cursor-pointer">
                <Image src="/icons/edit-icon.svg" alt="unlock" width={18} height={18} className="m-auto" />
              </div>
            ) : null}
            {!exerciseBoard.locked ? (
              <div onDoubleClick={removeExercise} className="absolute top-2 right-2 cursor-pointer">
                <Image src="/icons/remove-icon.svg" alt="unlock" width={20} height={20} className="m-auto" />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Draggable>
  );
}
