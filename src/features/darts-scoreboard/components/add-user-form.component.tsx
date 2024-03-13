import React, { useContext } from 'react';
import style from './add-user-form.module.css';
import { useForm } from 'react-hook-form';
import { AddUserFormFields, DartsUser } from '../definitions';
import { DEFAULT_STARTING_SCORES } from '../definitions/constants';
import { DartsContext } from '../contexts/darts-scoreboard.context';

type Props = {
  onCancel: () => void;
};

export default function AddUserForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormFields>();
  const { board, setBoard } = useContext(DartsContext);

  const addUser = (data: AddUserFormFields) => {
    const newUser: DartsUser = {
      name: data.name,
      scores: data.scores,
      startingScores: data.scores,
      throws: [],
    };
    setBoard({ users: [...board.users, newUser] });
    props.onCancel();
  };

  return (
    <section className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <div className="flex items-center p-4 ml-4">
          <h3 className="text-xl font-semibold text-gray-900">Add a new user</h3>
        </div>
        <form onSubmit={handleSubmit(addUser)} className={style.formWrapper}>
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
          <fieldset className="mb-4">
            <label htmlFor="scores" className={style.formLabel}>
              Starting scores
            </label>
            <input
              {...register('scores', { required: true })}
              defaultValue={DEFAULT_STARTING_SCORES}
              className={style.formInput}
              type="number"
              id="scores"
            />
          </fieldset>
          <div className="flex items-center pt-4 space-x-2">
            <button type="submit" className={style.formBtnSubmit}>
              Add
            </button>
            <button onClick={props.onCancel} type="button" className={style.formBtnCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
