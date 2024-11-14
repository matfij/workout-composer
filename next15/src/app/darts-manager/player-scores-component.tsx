'use client';

import style from './player-scores-component.module.scss';
import { useForm } from 'react-hook-form';
import { DartsPlayer, DartsPlayerPlace, PlayerScoreForm } from './types';
import { useDartsStore } from './darts-store';

type PlayerScoresComponentProps = {
    player: DartsPlayer;
};

export const PlayerScoresComponent = (props: PlayerScoresComponentProps) => {
    const { players, updatePlayer } = useDartsStore();

    const { register, handleSubmit, watch, setValue } = useForm<PlayerScoreForm>({
        defaultValues: {
            factor1: 1,
            factor2: 1,
            factor3: 1,
        },
    });

    const updateScores = (data: PlayerScoreForm) => {
        const point1 = data.factor1 * data.throw1;
        const point2 = data.factor2 * data.throw2;
        const point3 = data.factor3 * data.throw3;
        const pointsTotal = point1 + point2 + point3;
        let pointsLeft = props.player.points;
        if (pointsLeft - pointsTotal >= 0) {
            pointsLeft -= pointsTotal;
        }
        const updatedPlayer = props.player;
        updatedPlayer.points = pointsLeft;
        updatedPlayer.throws = [...updatedPlayer.throws, ...[point1, point2, point3]];

        let place = DartsPlayerPlace.None;
        const currentWinners = players.filter((p) => p.place !== DartsPlayerPlace.None).length;
        switch (currentWinners) {
            case 0:
                place = DartsPlayerPlace.First;
                break;
            case 1:
                place = DartsPlayerPlace.Second;
                break;
            case 2:
                place = DartsPlayerPlace.Third;
                break;
        }
        updatedPlayer.place = place;
        if (place !== DartsPlayerPlace.None) {
            // TODO - notify new winner
        }

        updatePlayer(updatedPlayer);

        // TODO - switch to next user index

        // TODO - increment turn count
    };

    return (
        <section className="modalBackdrop">
            <div className="modalWrapper">
                <form onSubmit={handleSubmit(updateScores)} className="formWrapper">
                    <h3 className="subtitle left dark">
                        Update <b>{props.player.name}</b>&apos;s scores
                    </h3>
                    {([1, 2, 3] as const).map((throwIndex) => (
                        <fieldset key={throwIndex} className={style.formFieldset}>
                            <input
                                {...register(`throw${throwIndex}`, { validate: (x) => validateScore(x) })}
                                onKeyUp={() => setValue(`factor${throwIndex}`, 1)}
                                className="formInput"
                                type="number"
                                min={0}
                                max={25}
                            />
                            <button
                                type="button"
                                className={`${style.factorBtn} ${style.factorBtn1} ${
                                    watch(`factor${throwIndex}`) === 1 ? style.factorBtnActive : ''
                                }`}
                                onClick={() => setValue(`factor${throwIndex}`, 1)}>
                                ×1
                            </button>
                            <button
                                type="button"
                                className={`${style.factorBtn} ${style.factorBtn2} ${
                                    watch(`factor${throwIndex}`) === 2 ? style.factorBtnActive : ''
                                }`}
                                onClick={() => setValue(`factor${throwIndex}`, 2)}>
                                ×2
                            </button>
                            <button
                                type="button"
                                className={`${style.factorBtn} ${style.factorBtn3} ${
                                    watch(`factor${throwIndex}`) === 3 ? style.factorBtnActive : ''
                                }`}
                                onClick={() =>
                                    watch(`throw${throwIndex}`) < 25 && setValue(`factor${throwIndex}`, 3)
                                }
                                disabled={watch(`throw${throwIndex}`) >= 25}>
                                ×3
                            </button>
                        </fieldset>
                    ))}
                    <div className="formActionsWrapper">
                        <button type="submit" className="formBtnSubmit">
                            Confirm
                        </button>
                        <button type="button" className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
