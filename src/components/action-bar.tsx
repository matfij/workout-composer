import style from './action-bar.module.css';
import { FunctionComponent, useState } from 'react';
import { useBoardDataContext, useSetBoardDataContext } from '../context/BoardContext';
import ExerciseAdd from './exercise-add';
import { toast } from 'react-toastify';

const ActionBar: FunctionComponent = () => {
  const boardData = useBoardDataContext();
  const setBoardData = useSetBoardDataContext();

  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const toggleExerciseAdd = () => {
    setDisplayExerciseAdd(!displayExerciseAdd);
  };

  const copyLink = async () => {
    if (isCopying) return;
    setIsCopying(true);

    const res = await fetch('/api/workout-save', {
      method: 'POST',
      body: JSON.stringify(JSON.stringify(boardData)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsCopying(false);

    if (res.status !== 201) {
      toast.error('Failed to save the workout, please try again later', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const workoutId = await res.json();

    window.history.pushState({}, document.title, '/');
    navigator.clipboard.writeText(`${window.location.href}?id=${workoutId}`);

    toast('✨ Workout link copied!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toggleBoardLock = (locked: boolean) => {
    setBoardData({ ...boardData, locked: locked });
  };

  return (
    <div className={style.actionBarWrapper}>
      <button onClick={toggleExerciseAdd} className="w-24 bg">
        <p className="text-3xl">🤸🏻‍♂️</p> New
      </button>
      {!isCopying ? (
        <button onClick={copyLink} className="w-24">
          <p className="text-3xl">🔗</p> Share
        </button>
      ) : (
        <button className="w-24">
          <p className="text-3xl">⏳</p> Saving...
        </button>
      )}
      {!boardData.locked ? (
        <button onClick={() => toggleBoardLock(true)} className="w-24">
          <p className="text-3xl">🔒</p> Lock
        </button>
      ) : (
        <button onClick={() => toggleBoardLock(false)} className="w-24">
          <p className="text-3xl">🔓</p> Unlock
        </button>
      )}

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}

      
    </div>
  );
};

export default ActionBar;
