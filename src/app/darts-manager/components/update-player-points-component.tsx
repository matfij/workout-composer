'use client';

import style from './update-player-points-component.module.scss';
import { useForm } from 'react-hook-form';
import { dartsConfig, DartsPlayer, DartsPlayerPlace, PlayerUpdatePointsInput } from '../types';
import { useDartsStore } from '../darts-store';
import { MusicManager } from '../../../shared/managers/music-manager';
import { ToastManager } from '../../../shared/managers/toast-manager';

type UpdatePlayerPointsProps = {
    player: DartsPlayer;
    onCancel: () => void;
};

export const UpdatePlayerPoints = (props: UpdatePlayerPointsProps) => {
    const { players, updatePlayer, incrementPlayerIndex } = useDartsStore();
    const { register, handleSubmit, watch, setValue } = useForm<PlayerUpdatePointsInput>({
        defaultValues: {
            factor1: 1,
            factor2: 1,
            factor3: 1,
        },
    });

    const updatePoints = (data: PlayerUpdatePointsInput) => {
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

        if (pointsLeft === 0) {
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
                MusicManager.playSound('victory-sound');
                ToastManager.showInfo(`${props.player.name} has won!`);
            }
        }

        updatePlayer(updatedPlayer);

        incrementPlayerIndex();

        props.onCancel();
    };

    return (
        <section className="modalBackdrop">
            <div className="modalWrapper">
                <form onSubmit={handleSubmit(updatePoints)} className="formWrapper">
                    <h3 className="subtitle left dark" style={{ marginBottom: '1rem' }}>
                        Update <b>{props.player.name}</b>&apos;s points
                    </h3>
                    {dartsConfig.throws.map((throwIndex) => (
                        <fieldset key={throwIndex} className={style.formFieldset}>
                            <input
                                {...register(`throw${throwIndex}`, { pattern: /^(1[0-9]|20|[0-9]|25)$/ })}
                                onKeyUp={() => setValue(`factor${throwIndex}`, 1)}
                                className="formInput"
                                type="number"
                                placeholder="0"
                                min={0}
                                max={25}
                            />
                            {dartsConfig.factors.map((factorIndex) => (
                                <button
                                    key={`factor-btn-${factorIndex}`}
                                    type="button"
                                    className={`${style.factorBtn} ${style[`factorBtn${factorIndex}`]} ${
                                        watch(`factor${throwIndex}`) === factorIndex
                                            ? style.factorBtnActive
                                            : ''
                                    }`}
                                    onClick={() => setValue(`factor${throwIndex}`, factorIndex)}
                                    disabled={
                                        factorIndex === dartsConfig.factorsNumber &&
                                        watch(`throw${throwIndex}`) >= dartsConfig.maximumPoint
                                    }>
                                    ×{factorIndex}
                                </button>
                            ))}
                        </fieldset>
                    ))}
                    <div className="formActionsWrapper">
                        <button type="submit" className="formBtnSubmit">
                            Confirm
                        </button>
                        <button type="button" onClick={props.onCancel} className="formBtnCancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
