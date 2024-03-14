import { useForm } from 'react-hook-form';
import { DartsUser, UpdateScoresFields } from '../definitions';
import style from './update-scores-form.module.css';
import ToastService from '../../../common/services/toast-service';
import { ALLOWED_SCORES, Place } from '../definitions/constants';
import UtilService from '../../../common/services/utils-service';
import { ChangeEvent, useContext } from 'react';
import { DartsContext } from '../contexts/darts-scoreboard.context';

type Props = {
  user: DartsUser;
  onCancel: () => void;
};

export default function UpdateScoresForm(props: Props) {
  const { register, handleSubmit } = useForm<UpdateScoresFields>();
  const { board, setBoard } = useContext(DartsContext);

  const validateScore = (score: number): boolean => {
    return ALLOWED_SCORES.includes(+score);
  };

  const checkInputSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 2) {
      return;
    }
    (event.target.nextElementSibling as HTMLInputElement)?.focus();
  };

  const updateScores = (data: UpdateScoresFields) => {
    const scores = calculateScores(data);
    updateUser(scores, [data.throw1, data.throw2, data.throw3]);
    props.onCancel();
  };

  const calculateScores = (data: UpdateScoresFields) => {
    let scores = props.user.scores;
    data.throw1 = +data.throw1 ?? 0;
    data.throw2 = +data.throw2 ?? 0;
    data.throw3 = +data.throw3 ?? 0;
    if (scores - data.throw1 >= 0) {
      scores -= data.throw1;
    }
    if (scores - data.throw2 >= 0) {
      scores -= data.throw2;
    }
    if (scores - data.throw3 >= 0) {
      scores -= data.throw3;
    }
    return scores;
  };

  const updateUser = (newScores: number, throws: number[]) => {
    const updatedUser = { ...props.user };
    updatedUser.scores = newScores;
    updatedUser.throws = [...updatedUser.throws, ...throws];
    updatedUser.place = checkForWin(newScores);
    const updatedUsers = board.users.map((user) => (user.name === updatedUser.name ? updatedUser : user));
    const nextUserIndex = getNextUserIndex();
    const nextTurn = nextUserIndex <= board.currentUserIndex ? board.turnsPassed + 1 : board.turnsPassed;
    setBoard({
      users: updatedUsers,
      currentUserIndex: nextUserIndex,
      turnsPassed: nextTurn,
    });
  };

  const getPreviousWinnersCount = () => {
    return board.users.filter((user) => user.place !== Place.None).length;
  };

  const checkForWin = (scores: number) => {
    if (scores !== 0) {
      return Place.None;
    }
    switch (getPreviousWinnersCount()) {
      case 0: {
        notifyWinner();
        return Place.First;
      }
      case 1: {
        notifyWinner();
        return Place.Second;
      }
      case 2: {
        notifyWinner();
        return Place.Third;
      }
      default: {
        return Place.None;
      }
    }
  };

  const notifyWinner = () => {
    UtilService.playSound('/sounds/dart-win-sound.mp3');
    ToastService.showInfo(`${props.user.name} has won!`);
  };

  const getNextUserIndex = () => {
    let nextUserIndex = board.currentUserIndex + 1;
    let loopNo = 0;
    while (true) {
      if (nextUserIndex >= board.users.length) {
        nextUserIndex = 0;
      }
      const nextUser = board.users[nextUserIndex];
      console.log(nextUserIndex);
      if (nextUser.place === Place.None) {
        break;
      }
      if (loopNo > board.users.length) {
        nextUserIndex = board.currentUserIndex;
        break;
      }
      nextUserIndex++;
      loopNo++;
    }
    return nextUserIndex;
  };

  return (
    <section className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <div className="flex items-center flex-col p-4">
          <h3 className="w-full max-w-2/5 text-xl font-semibold px-8 pb-4 text-gray-900">
            Update <span className="font-bold">{props.user.name}&apos;s</span> scores
          </h3>
          <form onSubmit={handleSubmit(updateScores)} className={style.formWrapper + ' mb-0'}>
            <fieldset className="mb-4 flex gap-1">
              <input
                {...register('throw1', { validate: (x) => validateScore(x) })}
                onChange={(e) => checkInputSwitch(e)}
                className={style.formInput}
                id="throw1"
                type="number"
                min={0}
                max={60}
              />
              <input
                {...register('throw2', { validate: (x) => validateScore(x) })}
                onChange={(e) => checkInputSwitch(e)}
                className={style.formInput}
                id="throw2"
                type="number"
                min={0}
                max={60}
              />
              <input
                {...register('throw3', { validate: (x) => validateScore(x) })}
                onChange={(e) => checkInputSwitch(e)}
                className={style.formInput}
                id="throw3"
                type="number"
                min={0}
                max={60}
              />
            </fieldset>
            <div className="flex items-center pt-4 space-x-2">
              <button type="submit" className={style.formBtnSubmit}>
                Confirm
              </button>
              <button onClick={props.onCancel} type="button" className={style.formBtnCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
