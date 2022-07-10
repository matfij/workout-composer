import style from './exercise-add.module.css';
import { FunctionComponent } from 'react';

const ExerciseAdd: FunctionComponent = () => {
  return (
    <section className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <div className="flex items-center p-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add a new exercise
          </h3>
        </div>

        <form className={style.formWrapper}>
          <div className="mb-4">
            <label className={style.formLabel} htmlFor="name">
              Name
            </label>
            <input className={style.formInput} id="name" type="text" />
          </div>
          <div className="flex mb-4 gap-2">
            <div className="w-1/2">
              <label className={style.formLabel} htmlFor="sets">
                Sets
              </label>
              <input className={style.formInput} id="sets" type="number" />
            </div>

            <div className="w-1/2">
              <label className={style.formLabel} htmlFor="reps">
                Reps
              </label>
              <input className={style.formInput} id="reps" type="number" />
            </div>
          </div>
          <div className="mb-4">
            <label className={style.formLabel} htmlFor="rest">
              Rest time (optional)
            </label>
            <input className={style.formInput} id="rest" type="text" />
          </div>
        </form>

        <div className="flex items-center p-4 space-x-2">
          <button type="button" className={style.formBtnCancel}>
            Cancel
          </button>
          <button type="button" className={style.formBtnSubmit}>
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExerciseAdd;
