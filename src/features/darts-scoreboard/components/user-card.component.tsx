import style from './user-card.module.css';
import Image from 'next/image';
import { DartsUser } from '../definitions';
import UpdateScoresForm from './update-scores-form.component';
import { useContext, useState } from 'react';
import { DartsContext } from '../contexts/darts-scoreboard.context';

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
    return board.currentUserIndex === displayedUserIndex;
  };

  const getWrapperClass = () => {
    if (isActive()) {
      return `${style.cardWrapper} ${style.active}`;
    }
    return style.cardWrapper;
  };

  return (
    <>
      <div className={getWrapperClass()}>
        <div className="mr-6">
          <h3 className="text-white text-xl font-semibold">
            {props.user.scores === 0 && '🏆'} {props.user.name}
          </h3>
          <hr />
          <p className="text-2xl text-yellow-300">{props.user.scores}</p>
          <hr />
          <p>{getLatestThrow(props.user.throws)}</p>
        </div>
        {isActive() && (
          <button
            onClick={() => setDisplayUpdateForm(true)}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <Image src="/icons/dart.svg" className="fill-white" alt="add" width={18} height={18} />
          </button>
        )}
      </div>
      {displayUpdateForm && (
        <UpdateScoresForm user={props.user} onCancel={() => setDisplayUpdateForm(false)} />
      )}
    </>
  );
}
