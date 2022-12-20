import React, { useEffect, useState } from 'react';
import style from './exercise-add-edit.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useExerciseBoardContext, useSetExerciseBoardContext } from '../contexts/exercise-board.context';
import UtilService from '../../../common/services/utils-service';
import { Exercise } from '../definitions';

type Props = {
  exercise?: Exercise;
  onCancel: () => void;
};

export default function ExerciseAddEdit(props: Props) {
  const [editMode, setEditMode] = useState(false);
  const exerciseBoard = useExerciseBoardContext();
  const setExerciseBoard = useSetExerciseBoardContext();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Exercise>>();

  useEffect(() => {
    if (!props.exercise) return;
    setEditMode(true);
    setValue('id', props.exercise.id);
    setValue('name', props.exercise.name);
    setValue('sets', props.exercise.sets);
    setValue('reps', props.exercise.reps);
    setValue('description', props.exercise.description);
  }, [props.exercise, setValue]);

  const addEditExercise: SubmitHandler<Partial<Exercise>> = (data: Partial<Exercise>) => {
    if (!data.name || !data.sets || !data.reps) return;
    const exercise: Exercise = {
      id: props.exercise ? props.exercise.id : UtilService.generateId(),
      name: data.name,
      sets: data.sets,
      reps: data.reps,
      description: data.description,
    };
    editMode ? editExercise(exercise) : addExercise(exercise);
  };

  const addExercise = (exercise: Exercise) => {
    const newBoardData = exerciseBoard;
    newBoardData.standby.push(exercise);
    setExerciseBoard({ ...newBoardData, editedExercise: undefined });
    onCancel(false);
  };

  const editExercise = (editedExercise: Exercise) => {
    if (!props.exercise) return;
    setExerciseBoard({
      days: exerciseBoard.days.map((day) => ({
        day: day.day,
        exercises: [
          ...day.exercises.map((exercise) => (exercise.id === editedExercise.id ? editedExercise : exercise)),
        ],
      })),
      standby: [
        ...exerciseBoard.standby.map((exercise) =>
          exercise.id === editedExercise.id ? editedExercise : exercise
        ),
      ],
      locked: exerciseBoard.locked,
      editedExercise: undefined,
    });
    onCancel(false);
  };

  const onCancel = (reset: boolean) => {
    if (reset) setExerciseBoard({ ...exerciseBoard, editedExercise: undefined });
    props.onCancel();
  };

  return (
    <section onClick={props.onCancel} className={style.modalBackdrop}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalWrapper}>
        <div className="flex items-center p-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editMode ? 'Edit exercise' : 'Add a new exercise'}
          </h3>
        </div>

        <form onSubmit={handleSubmit(addEditExercise)} className={style.formWrapper}>
          <fieldset className="mb-4">
            <label className={style.formLabel} htmlFor="name">
              Name
            </label>
            <input
              {...register('name', { required: true })}
              className={style.formInput}
              id="name"
              type="text"
            />
            {errors.name && <span className="px-2 text-sm text-red-600">Name required</span>}
          </fieldset>
          <div className="flex mb-4 gap-2">
            <fieldset className="w-1/2">
              <label className={style.formLabel} htmlFor="sets">
                Sets
              </label>
              <input
                {...register('sets', { required: true })}
                className={style.formInput}
                id="sets"
                type="number"
              />
              {errors.sets && <span className="px-2 text-sm text-red-600">Sets required</span>}
            </fieldset>

            <fieldset className="w-1/2">
              <label className={style.formLabel} htmlFor="reps">
                Reps
              </label>
              <input
                {...register('reps', { required: true })}
                className={style.formInput}
                id="reps"
                type="number"
              />
              {errors.reps && <span className="px-2 text-sm text-red-600">Reps required</span>}
            </fieldset>
          </div>
          <fieldset className="mb-4">
            <label className={style.formLabel} htmlFor="rest">
              Description (optional)
            </label>
            <input {...register('description')} className={style.formInput} id="rest" type="text" />
          </fieldset>

          <div className="flex items-center pt-4 space-x-2">
            <button onClick={() => onCancel(true)} type="button" className={style.formBtnCancel}>
              Cancel
            </button>
            <button className={style.formBtnSubmit}>{editMode ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
