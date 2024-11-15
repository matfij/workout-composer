import style from './page.module.scss';
import { useDartsStore } from './darts-store';
import { DartsPlayer, DartsPlayerPlace } from './types';
import Image from 'next/image';
import { PlayerScoresComponent } from './player-scores-component';
import { useState } from 'react';

type PlayerCardComponentProps = {
    player: DartsPlayer;
};

export const PlayerCardComponent = (props: PlayerCardComponentProps) => {
    const { players, currentPlayerIndex } = useDartsStore();
    const [showScoresForm, setShowScoresForm] = useState(false);

    const latestThrows = props.player.throws.length ? props.player.throws.slice(-3) : '---';

    const isActive =
        props.player.place === DartsPlayerPlace.None &&
        players.findIndex((p) => p.name === props.player.name) === currentPlayerIndex;

    console.log({ currentPlayerIndex });

    const wrapperClass = isActive
        ? `${style.playerCardWrapper} ${style.playerCardWrapperActive}`
        : `${style.playerCardWrapper}`;

    const getPlaceIcon = () => {
        switch (props.player.place) {
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

    return (
        <>
            <div className={wrapperClass}>
                <div style={{ marginRight: '1.75rem' }}>
                    <h3 className="subtitle left bold" style={{ margin: '0.25rem 0' }}>
                        {getPlaceIcon()} {props.player.name}
                    </h3>
                    <hr />
                    <p className="subtitle primary">{props.player.points}</p>
                    <hr />
                    <p>{latestThrows}</p>
                </div>
                {isActive && (
                    <button onClick={() => setShowScoresForm(true)} className={style.updateScoresBtn}>
                        <Image src="/icons/dart.svg" alt="score" width={18} height={18} />
                    </button>
                )}
            </div>
            {showScoresForm && (
                <PlayerScoresComponent player={props.player} onCancel={() => setShowScoresForm(false)} />
            )}
        </>
    );
};
