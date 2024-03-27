import React from 'react';
import Image from 'next/image';
import style from './exercise-item.module.scss';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { useExerciseBoardContext, useSetExerciseBoardContext } from '../contexts/exercise-board.context';
import { Exercise } from '../definitions';
import UtilService from '../../../common/services/utils-service';

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
    setExerciseBoard({
      days: exerciseBoard.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.filter((exercise) => exercise.id !== props.exercise.id),
      })),
      standby: exerciseBoard.standby.filter((exercise) => exercise.id !== props.exercise.id),
      locked: exerciseBoard.locked,
    });
  };

  const copyExercise = () => {
    setExerciseBoard({
      days: exerciseBoard.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.flatMap((exercise) => {
          if (exercise.id === props.exercise.id)
            return [exercise, { ...exercise, id: UtilService.generateId() }];
          return exercise;
        }),
      })),
      standby: exerciseBoard.standby.flatMap((exercise) => {
        if (exercise.id === props.exercise.id)
          return [exercise, { ...exercise, id: UtilService.generateId() }];
        return exercise;
      }),
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
            <p className="bold primary">{props.exercise.name}</p>
            <p>
              {props.exercise.sets} x {props.exercise.reps}
            </p>
            <p className="thin">{props.exercise.description ? `${props.exercise.description}` : ''}</p>

            {!exerciseBoard.locked && (
              <>
                <div onClick={copyExercise} className={style.actionIcon} style={{ top: '27px', right: '3px' }}>
                  <Image src="/icons/copy-icon.svg" alt="copy" width={18} height={18} />
                </div>
                <div onClick={editExercise} className={style.actionIcon} style={{ top: '3px', right: '25px' }}>
                  <Image src="/icons/edit-icon.svg" alt="edit" width={16} height={16} />
                </div>
                <div onDoubleClick={removeExercise} className={style.actionIcon} style={{ top: '2px', right: '2px' }}>
                  <Image src="/icons/remove-icon.svg" alt="remove" width={22} height={22} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
