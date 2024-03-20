import { useForm } from 'react-hook-form';
import { DartsUser, UpdateScoresFields } from '../definitions';
import style from './update-scores-form.module.css';
import ToastService from '../../../common/services/toast-service';
import { ALLOWED_FACTORS, ALLOWED_SCORES, Place } from '../definitions/constants';
import UtilService from '../../../common/services/utils-service';
import { ChangeEvent, useContext } from 'react';
import { DartsContext } from '../contexts/darts-scoreboard.context';

type Props = {
  user: DartsUser;
  onCancel: () => void;
};

export default function UpdateScoresForm(props: Props) {
  const { register, handleSubmit, watch } = useForm<UpdateScoresFields>({
    defaultValues: {
      throw1Factor: 1,
      throw2Factor: 1,
      throw3Factor: 1,
    },
  });
  const { board, setBoard } = useContext(DartsContext);

  const validateScore = (score: number) => {
    return ALLOWED_SCORES.includes(+score);
  };

  const validateFactor = (factor: number) => {
    return ALLOWED_FACTORS.includes(+factor);
  };

  const updateScores = (data: UpdateScoresFields) => {
    const scores = calculateScores(data);
    updateUser(scores, [data.throw1, data.throw2, data.throw3]);
    props.onCancel();
  };

  const calculateScores = (data: UpdateScoresFields) => {
    data.throw1 = (+data.throw1Factor ?? 1) * +data.throw1 ?? 0;
    data.throw2 = (+data.throw2Factor ?? 1) * +data.throw2 ?? 0;
    data.throw3 = (+data.throw3Factor ?? 1) * +data.throw3 ?? 0;
    let scoresLeft = props.user.scores;
    const scores = data.throw1 + data.throw2 + data.throw3;
    if (scoresLeft - scores >= 0) {
      scoresLeft -= scores;
    }
    return scoresLeft;
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

  const getFactorInputClass = (factor: number) => {
    switch (+factor) {
      case 1: {
        return `${style.factorField} ${style.factorField1}`;
      }
      case 2: {
        return `${style.factorField} ${style.factorField2}`;
      }
      case 3: {
        return `${style.factorField} ${style.factorField3}`;
      }
    }
  };

  const getFactorLabel = (factor: number) => {
    switch (+factor) {
      case 1: {
        return <p className={`${style.factorLabel} ${style.factorLabel1}`}>×1</p>;
      }
      case 2: {
        return <p className={`${style.factorLabel} ${style.factorLabel2}`}>×2</p>;
      }
      case 3: {
        return <p className={`${style.factorLabel} ${style.factorLabel3}`}>×3</p>;
      }
    }
  };

  const getMaxFactor = (score: number) => {
    if (+score < 25) {
      return 3;
    }
    return 2;
  };

  return (
    <section className={style.modalBackdrop}>
      <div className={style.modalWrapper}>
        <div className="flex items-center flex-col p-4">
          <h3 className="w-full max-w-2/5 text-xl font-semibold px-8 pb-4 text-gray-900">
            Update <span className="font-bold">{props.user.name}&apos;s</span> scores
          </h3>
          <form onSubmit={handleSubmit(updateScores)} className={style.formWrapper + ' mb-0'}>
            <fieldset className={style.formField}>
              <input
                {...register('throw1', { validate: (x) => validateScore(x) })}
                className={style.formInput}
                type="number"
                min={0}
                max={25}
              />
              <input
                {...register('throw1Factor', { validate: (x) => validateFactor(x) })}
                className={getFactorInputClass(watch('throw1Factor'))}
                type="range"
                min="1"
                max={getMaxFactor(watch('throw1'))}
              />
              {getFactorLabel(watch('throw1Factor'))}
            </fieldset>
            <fieldset className={style.formField}>
              <input
                {...register('throw2', { validate: (x) => validateScore(x) })}
                className={style.formInput}
                id="throw2"
                type="number"
                min={0}
                max={25}
              />
              <input
                {...register('throw2Factor', { validate: (x) => validateFactor(x) })}
                className={getFactorInputClass(watch('throw2Factor'))}
                type="range"
                min="1"
                max={getMaxFactor(watch('throw2'))}
              />
              {getFactorLabel(watch('throw2Factor'))}
            </fieldset>
            <fieldset className={style.formField}>
              <input
                {...register('throw3', { validate: (x) => validateScore(x) })}
                className={style.formInput}
                type="number"
                min={0}
                max={25}
              />
              <input
                {...register('throw3Factor', { validate: (x) => validateFactor(x) })}
                className={getFactorInputClass(watch('throw3Factor'))}
                type="range"
                min="1"
                max={getMaxFactor(watch('throw3'))}
              />
              {getFactorLabel(watch('throw3Factor'))}
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
