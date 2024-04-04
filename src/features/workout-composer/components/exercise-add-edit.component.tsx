import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UtilService from '../../../common/services/utils-service';
import { Exercise, ExerciseBoard } from '../definitions';
import { WorkoutContext } from '../contexts/exercise-board.context';

type Props = {
  exercise?: Exercise;
  toggleDayAdd: () => void;
  onCancel: () => void;
};

export default function ExerciseAddEdit(props: Props) {
  const [editMode, setEditMode] = useState(false);
  const { workout, setWorkout } = useContext(WorkoutContext);
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
    const newBoardData = workout;
    newBoardData.standby.push(exercise);
    setWorkout({ ...newBoardData, editedExercise: undefined });
    onCancel(false);
  };

  const editExercise = (editedExercise: Exercise) => {
    if (!props.exercise) return onCancel(false);
    const newBoardData: ExerciseBoard = {
      days: workout.days.map((day) => ({
        day: day.day,
        exercises: [
          ...day.exercises.map((exercise) => (exercise.id === editedExercise.id ? editedExercise : exercise)),
        ],
      })),
      standby: [
        ...workout.standby.map((exercise) =>
          exercise.id === editedExercise.id ? editedExercise : exercise
        ),
      ],
      locked: workout.locked,
    };
    setWorkout({ ...newBoardData, editedExercise: undefined });
  };

  const toggleDayAdd = () => {
    props.toggleDayAdd();
    onCancel(false);
  };

  const onCancel = (reset: boolean) => {
    if (reset) setWorkout({ ...workout, editedExercise: undefined });
    else props.onCancel();
  };

  return (
    <section className="modalBackdrop">
      <div onClick={(e) => e.stopPropagation()} className="modalWrapper">
        <form onSubmit={handleSubmit(addEditExercise)} className="formWrapper">
          <h3 className="subtitle left dark">{editMode ? 'Edit exercise' : 'Add a new exercise'}</h3>
          <fieldset>
            <label className="formLabel" htmlFor="name">
              Name
            </label>
            <input {...register('name', { required: true })} className="formInput" id="name" type="text" />
            {errors.name && <span className="formError">Name required</span>}
          </fieldset>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <fieldset>
              <label className="formLabel" htmlFor="sets">
                Sets
              </label>
              <input
                {...register('sets', { required: true })}
                className="formInput"
                id="sets"
                type="number"
              />
              {errors.sets && <span className="formError">Sets required</span>}
            </fieldset>

            <fieldset>
              <label className="formLabel" htmlFor="reps">
                Reps
              </label>
              <input
                {...register('reps', { required: true })}
                className="formInput"
                id="reps"
                type="number"
              />
              {errors.reps && <span className="formError">Reps required</span>}
            </fieldset>
          </div>
          <fieldset>
            <label className="formLabel" htmlFor="rest">
              Description (optional)
            </label>
            <input {...register('description')} className="formInput" id="rest" type="text" />
          </fieldset>

          <div className="formActionsWrapper">
            <button className="formBtnSubmit">{editMode ? 'Update' : 'Add'}</button>
            {editMode ? (
              <button onClick={() => onCancel(true)} type="button" className="formBtnCancel">
                Cancel
              </button>
            ) : (
              <button onClick={() => onCancel(false)} type="button" className="formBtnCancel">
                Cancel
              </button>
            )}
          </div>
        </form>
        {!editMode && (
          <div className="formWrapper">
            <hr />
            <div className="subtitle dark">or</div>
            <button onClick={toggleDayAdd} className="formBtnSubmit">
              Add new day
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
