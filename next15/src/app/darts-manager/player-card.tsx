import style from './page.module.scss';
import { useDartsStore } from './darts-store';
import { DartsPlayer, DartsPlayerPlace } from './types';
import Image from 'next/image';

export const PlayerCardComponent = ({ player }: { player: DartsPlayer }) => {
    const { players, currentPlayerIndex } = useDartsStore();

    const latestThrows = player.throws.length ? player.throws.slice(-3) : '---';

    const isActive =
        player.place === DartsPlayerPlace.None &&
        players.findIndex((p) => p.name === player.name) === currentPlayerIndex;

    const wrapperClass = isActive
        ? `${style.playerCardWrapper} ${style.playerCardWrapperActive}`
        : `${style.playerCardWrapper}`;

    const getPlaceIcon = () => {
        switch (player.place) {
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
                        {getPlaceIcon()} {player.name}
                    </h3>
                    <hr />
                    <p className="subtitle primary">{player.scores}</p>
                    <hr />
                    <p>{latestThrows}</p>
                </div>
                {isActive && (
                    <button className={style.updateScoresBtn}>
                        <Image src="/icons/dart.svg" alt="score" width={18} height={18} />
                    </button>
                )}
            </div>
        </>
    );
};
