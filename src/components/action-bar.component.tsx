import React from 'react';
import style from './action-bar.module.css';
import { useState } from 'react';
import { useExerciseBoardContext, useSetExerciseBoardContext } from '../contexts/exercise-board.context';
import ExerciseAdd from './exercise-add.component';
import ToastService from '../services/ToastService';

export default function ActionBar() {
  const exerciseBoard = useExerciseBoardContext();
  const setExerciseBoard = useSetExerciseBoardContext();

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
      body: JSON.stringify(JSON.stringify(exerciseBoard)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsCopying(false);

    if (res.status !== 201) {
      ToastService.showError('Failed to save the workout, please try again later');
      return;
    }
    const workoutId = await res.json();

    window.history.pushState({}, document.title, '/');
    navigator.clipboard.writeText(`${window.location.href}?id=${workoutId}`);
    ToastService.showInfo('✨ Workout link copied!');
  };

  const toggleBoardLock = (locked: boolean) => {
    setExerciseBoard({ ...exerciseBoard, locked: locked });
  };

  return (
    <div className={style.actionBarWrapper}>
      <button onClick={toggleExerciseAdd} className="w-24 bg">
        <p data-testid="new-icon" className="text-3xl">🤸🏻‍♂️</p> New
      </button>
      {!isCopying ? (
        <button onClick={copyLink} className="w-24">
          <p data-testid="share-icon" className="text-3xl">🔗</p> Share
        </button>
      ) : (
        <button className="w-24">
          <p data-testid="loading-icon" className="text-3xl">⏳</p> Saving...
        </button>
      )}
      {!exerciseBoard.locked ? (
        <button onClick={() => toggleBoardLock(true)} className="w-24">
          <p data-testid="lock-icon" className="text-3xl">🔒</p> Lock
        </button>
      ) : (
        <button onClick={() => toggleBoardLock(false)} className="w-24">
          <p data-testid="unlock-icon" className="text-3xl">🔓</p> Unlock
        </button>
      )}

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
    </div>
  );
};
