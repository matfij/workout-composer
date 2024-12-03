import style from './player-card-component.module.scss';
import { useDartsStore } from '../darts-store';
import { dartsConfig, DartsPlayer, DartsPlayerPlace } from '../types';
import Image from 'next/image';
import { UpdatePlayerPoints } from './update-player-points-component';
import { useState } from 'react';

type PlayerCardComponentProps = {
    player: DartsPlayer;
};

const getPlaceIcon = (place: DartsPlayerPlace) => {
    switch (place) {
        case DartsPlayerPlace.First:
            return '🥇';
        case DartsPlayerPlace.Second:
            return '🥈';
        case DartsPlayerPlace.Third:
            return '🥉';
        default:
            return '';
    }
};

export const PlayerCardComponent = (props: PlayerCardComponentProps) => {
    const { players, currentPlayerIndex } = useDartsStore();
    const [showPointsForm, setShowPointsForm] = useState(false);

    const latestThrows = props.player.throws.length ? props.player.throws.slice(-dartsConfig.throwsNumber).join(' ') : '---';

    const isActive =
        props.player.place === DartsPlayerPlace.None &&
        players.findIndex((p) => p.name === props.player.name) === currentPlayerIndex;

    const wrapperClass = isActive
        ? `${style.playerCardWrapper} ${style.playerCardWrapperActive}`
        : `${style.playerCardWrapper}`;

    return (
        <>
            <div className={wrapperClass}>
                <div style={{ marginRight: '1.75rem' }}>
                    <h3 className="subtitle left bold" style={{ margin: '0.25rem 0' }}>
                        {getPlaceIcon(props.player.place)} {props.player.name}
                    </h3>
                    <hr />
                    <p className="subtitle primary">{props.player.points}</p>
                    <hr />
                    <p>{latestThrows}</p>
                </div>
                {isActive && (
                    <button onClick={() => setShowPointsForm(true)} className={style.updatePointsBtn}>
                        <Image src="/icons/dart-icon.svg" alt="points" width={28} height={28} />
                    </button>
                )}
            </div>
            {showPointsForm && (
                <UpdatePlayerPoints player={props.player} onCancel={() => setShowPointsForm(false)} />
            )}
        </>
    );
};
