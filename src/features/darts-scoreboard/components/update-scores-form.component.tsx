import { useForm } from 'react-hook-form';
import { DartsUser, UpdateScoresFields } from '../definitions';
import style from './update-scores-form.module.css';
import {
  useDartsScoreboardContext,
  useSetDartsScoreboardContext,
} from '../contexts/darts-scoreboard.context';
import ToastService from '../../../common/services/toast-service';

type Props = {
  user: DartsUser;
  onCancel: () => void;
};

export default function UpdateScoresForm(props: Props) {
  const { register, handleSubmit } = useForm<UpdateScoresFields>();
  const board = useDartsScoreboardContext();
  const updateBoard = useSetDartsScoreboardContext();

  const updateScores = (data: UpdateScoresFields) => {
    data.throw1 = +data.throw1 ?? 0;
    data.throw2 = +data.throw2 ?? 0;
    data.throw3 = +data.throw3 ?? 0;

    let newScores = props.user.scores;
    if (newScores - data.throw1 >= 0) {
      newScores -= data.throw1;
    }
    if (newScores - data.throw2 >= 0) {
      newScores -= data.throw2;
    }
    if (newScores - data.throw3 >= 0) {
      newScores -= data.throw3;
    }
    if (newScores === 0) {
      ToastService.showInfo(`${props.user.name} has won!`);
    }
    updateBoard({
      users: board.users.map((user) => {
        if (user.name !== props.user.name) {
          return user;
        }
        return {
          ...user,
          scores: newScores,
          throws: [...user.throws, data.throw1, data.throw2, data.throw3],
        };
      }),
    });
    props.onCancel();
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
                {...register('throw1', { min: 0, max: 60 })}
                className={style.formInput}
                id="throw1"
                type="number"
              />
              <input
                {...register('throw2', { min: 0, max: 60 })}
                className={style.formInput}
                id="throw2"
                type="number"
              />
              <input
                {...register('throw3', { min: 0, max: 60 })}
                className={style.formInput}
                id="throw3"
                type="number"
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
