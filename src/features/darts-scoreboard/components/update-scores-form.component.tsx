import { useForm } from 'react-hook-form';
import { DartsUser, UpdateScoresFields } from '../definitions';
import style from './update-scores-form.module.scss';
import ToastService from '../../../common/services/toast-service';
import { ALLOWED_SCORES, Place } from '../definitions/constants';
import UtilService from '../../../common/services/utils-service';
import { useContext } from 'react';
import { DartsContext } from '../contexts/darts-scoreboard.context';

type Props = {
  user: DartsUser;
  onCancel: () => void;
};

export default function UpdateScoresForm(props: Props) {
  const { register, handleSubmit, watch, setValue } = useForm<UpdateScoresFields>({
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

  return (
    <section className="modalBackdrop">
      <div className="modalWrapper">
        <form onSubmit={handleSubmit(updateScores)} className="formWrapper">
          <h3 className="subtitle dark left">
            Update <span className="bold">{props.user.name}&apos;s</span> scores
          </h3>
          {([1, 2, 3] as const).map((throwIndex) => (
            <fieldset key={throwIndex} className={style.formFieldset}>
              <input
                {...register(`throw${throwIndex}`, { validate: (x) => validateScore(x) })}
                onKeyUp={() => setValue(`throw${throwIndex}Factor`, 1)}
                className="formInput"
                type="number"
                min={0}
                max={25}
              />
              <button
                type="button"
                className={`${style.factorBtn} ${style.factorBtn1} ${
                  watch(`throw${throwIndex}Factor`) === 1 ? style.factorBtnActive : ''
                }`}
                onClick={() => setValue(`throw${throwIndex}Factor`, 1)}
              >
                ×1
              </button>
              <button
                type="button"
                className={`${style.factorBtn} ${style.factorBtn2} ${
                  watch(`throw${throwIndex}Factor`) === 2 ? style.factorBtnActive : ''
                }`}
                onClick={() => setValue(`throw${throwIndex}Factor`, 2)}
              >
                ×2
              </button>
              <button
                type="button"
                className={`${style.factorBtn} ${style.factorBtn3} ${
                  watch(`throw${throwIndex}Factor`) === 3 ? style.factorBtnActive : ''
                }`}
                onClick={() => watch(`throw${throwIndex}`) < 25 && setValue(`throw${throwIndex}Factor`, 3)}
                disabled={watch(`throw${throwIndex}`) >= 25}
              >
                ×3
              </button>
            </fieldset>
          ))}

          <div className="formActionsWrapper">
            <button type="submit" className="formBtnSubmit">
              Confirm
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
