import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DayFormFields } from '../definitions';
import { WorkoutContext } from '../contexts/exercise-board.context';

type Props = {
  onCancel: () => void;
};

export default function DayAdd(props: Props) {
  const { setWorkout } = useContext(WorkoutContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DayFormFields>();

  const addDay = (data: DayFormFields) => {
    setWorkout((prev) => ({
      ...prev,
      days: [...prev.days, { day: data.name, exercises: [] }],
    }));
    props.onCancel();
  };

  return (
    <section className="modalBackdrop">
      <div className="modalWrapper">
        <form onSubmit={handleSubmit(addDay)} className="formWrapper">
          <h3 className="subtitle dark left">Add a new day</h3>
          <fieldset>
            <label htmlFor="name" className="formLabel">
              Name
            </label>
            <input {...register('name', { required: true })} className="formInput" id="name" type="text" />
            {errors.name && <span className="formError">Name required</span>}
          </fieldset>
          <div className="formActionsWrapper">
            <button className="formBtnSubmit">Add</button>
            <button onClick={props.onCancel} type="button" className="formBtnCancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
