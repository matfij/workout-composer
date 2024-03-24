import style from './user-card.module.scss';
import Image from 'next/image';
import { DartsUser } from '../definitions';
import UpdateScoresForm from './update-scores-form.component';
import { useContext, useState } from 'react';
import { DartsContext } from '../contexts/darts-scoreboard.context';
import { Place } from '../definitions/constants';

type Props = {
  user: DartsUser;
};

export default function UserCard(props: Props) {
  const { board } = useContext(DartsContext);
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);

  const getLatestThrow = (scores: number[]): string => {
    if (!scores.length) {
      return '---';
    }
    return `${scores.slice(-3)}`;
  };

  const isActive = () => {
    const displayedUserIndex = board.users.findIndex((u) => u.name === props.user.name);
    return board.currentUserIndex === displayedUserIndex && props.user.place === Place.None;
  };

  const getWrapperClass = () => {
    if (isActive()) {
      return `${style.cardWrapper} ${style.active}`;
    }
    return style.cardWrapper;
  };

  const getPlaceIcon = () => {
    if (props.user.name)
      switch (props.user.place) {
        case Place.First: {
          return '🥇';
        }
        case Place.Second: {
          return '🥈';
        }
        case Place.Third: {
          return '🥉';
        }
        default: {
          return '';
        }
      }
  };

  return (
    <>
      <div className={getWrapperClass()}>
        <div style={{ marginRight: '1.75rem' }}>
          <h3 className="subtitle left bold" style={{ margin: '0.25rem 0' }}>
            {getPlaceIcon()} {props.user.name}
          </h3>
          <hr />
          <p className="bold primary" style={{ fontSize: '20px' }}>
            {props.user.scores}
          </p>
          <hr />
          <p>{getLatestThrow(props.user.throws)}</p>
        </div>
        {isActive() && (
          <button onClick={() => setDisplayUpdateForm(true)} className={style.updateScoreIcon}>
            <Image src="/icons/dart.svg" alt="score" width={18} height={18} />
          </button>
        )}
      </div>
      {displayUpdateForm && (
        <UpdateScoresForm user={props.user} onCancel={() => setDisplayUpdateForm(false)} />
      )}
    </>
  );
}
