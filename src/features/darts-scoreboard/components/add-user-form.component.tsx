import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AddUserFormFields, DartsUser } from '../definitions';
import { DEFAULT_STARTING_SCORES, Place } from '../definitions/constants';
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
      place: Place.None,
    };
    setBoard({
      users: [...board.users, newUser],
      currentUserIndex: board.currentUserIndex,
      turnsPassed: board.turnsPassed,
    });
    props.onCancel();
  };

  return (
    <section className="modalBackdrop">
      <div className="modalWrapper">
        <h3 className="subtitle bold dark">Add a new user</h3>
        <form onSubmit={handleSubmit(addUser)} className="formWrapper">
          <fieldset>
            <label htmlFor="name" className="formLabel">
              Name
            </label>
            <input
              {...register('name', { required: true })}
              className="formInput"
              id="name"
              type="text"
            />
            {errors.name && <span className="formError">Name required</span>}
          </fieldset>
          <fieldset>
            <label htmlFor="scores" className="formLabel">
              Starting scores
            </label>
            <input
              {...register('scores', { required: true })}
              defaultValue={DEFAULT_STARTING_SCORES}
              className="formInput"
              type="number"
              id="scores"
            />
          </fieldset>
          <div className="formActionsWrapper">
            <button type="submit" className="formBtnSubmit">
              Add
            </button>
            <button onClick={props.onCancel} type="button" className="formBtnCancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
