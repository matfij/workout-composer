import style from './action-bar.module.css';
import { FunctionComponent, useState } from 'react';
import { useBoardData } from '../context/BoardContext';
import ExerciseAdd from './exercise-add';

const ActionBar: FunctionComponent = () => {
  const boardData = useBoardData();

  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);

  const toggleExerciseAdd = () => {
    setDisplayExerciseAdd(!displayExerciseAdd);
  };

  const copyLink = async () => {
    const res = await fetch('/api/workout-save', {
      method: 'POST',
      body: JSON.stringify(JSON.stringify(boardData)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const workoutId = await res.json();

    window.history.pushState({}, document.title, '/');
    navigator.clipboard.writeText(`${window.location.href}?id=${workoutId}`);
  };

  return (
    <div className={style.actionBarWrapper}>
      <button onClick={toggleExerciseAdd} className="w-24 bg">
        <p className="text-3xl">🤸🏻‍♂️</p> New
      </button>
      <button onClick={copyLink} className="w-24">
        <p className="text-3xl">🔗</p> Share
      </button>
      <button onClick={copyLink} className="w-24">
        <p className="text-3xl">🔒</p> Lock
      </button>

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
    </div>
  );
};

export default ActionBar;
