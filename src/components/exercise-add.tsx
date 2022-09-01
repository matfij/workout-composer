import style from './exercise-add.module.css';
import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Exercise } from './exercise-item';
import { useBoardDataContext, useSetBoardDataContext } from '../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onCancel: () => void;
};

const ExerciseAdd: FunctionComponent<Props> = (props: Props) => {
  const boardData = useBoardDataContext();
  const updateBoardData = useSetBoardDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Exercise>>();

  const addExercise: SubmitHandler<Partial<Exercise>> = (data: Partial<Exercise>) => {
    if (!data.name || !data.sets || !data.reps) return;

    const newExercise: Exercise = {
      id: uuidv4(),
      name: data.name,
      sets: data.sets,
      reps: data.reps,
      description: data.description,
    };
    const newBoardData = boardData;
    newBoardData.standby.push(newExercise);

    updateBoardData({ ...newBoardData });
  };

  return (
    <section onClick={props.onCancel} className={style.modalBackdrop}>
      <div onClick={(e) => e.stopPropagation()} className={style.modalWrapper}>
        <div className="flex items-center p-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add a new exercise</h3>
        </div>

        <form onSubmit={handleSubmit(addExercise)} className={style.formWrapper}>
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
            <button onClick={props.onCancel} type="button" className={style.formBtnCancel}>
              Cancel
            </button>
            <button className={style.formBtnSubmit}>Add</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ExerciseAdd;
