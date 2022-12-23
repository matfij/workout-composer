import React from 'react';
import style from './day-add.module.css';
import { useForm } from 'react-hook-form';
import { DayFormFields } from '../definitions';
import { useExerciseBoardContext, useSetExerciseBoardContext } from '../contexts/exercise-board.context';

type Props = {
  onCancel: () => void;
};

export default function DayAdd(props: Props) {
  const exerciseBoard = useExerciseBoardContext();
  const setExerciseBoard = useSetExerciseBoardContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DayFormFields>();

  const addDay = (data: DayFormFields) => {
    setExerciseBoard({
      ...exerciseBoard,
      days: [...exerciseBoard.days, { day: data.name, exercises: [] }],
    });
    props.onCancel();
  };

  return (
    <section className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <div className="flex items-center p-4 ml-4">
          <h3 className="text-xl font-semibold text-gray-900">Add a new day</h3>
        </div>
        <form onSubmit={handleSubmit(addDay)} className={style.formWrapper}>
          <fieldset className="mb-4">
            <label htmlFor="name" className={style.formLabel}>
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
          <div className="flex items-center pt-4 space-x-2">
            <button className={style.formBtnSubmit}>Add</button>
            <button onClick={props.onCancel} type="button" className={style.formBtnCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
