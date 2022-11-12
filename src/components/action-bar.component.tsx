import React from 'react';
import Image from 'next/image';
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
        <Image src="/icons/add-icon.svg" alt="unlock" width={30} height={30} className="m-auto" />
        <p>Add</p>
      </button>
      {!isCopying ? (
        <button onClick={copyLink} className="w-24">
          <Image src="/icons/share-icon.svg" alt="unlock" width={30} height={30} className="m-auto" />
          <p>Share</p>
        </button>
      ) : (
        <button className="w-24">
          <div className={style.loadingItem}></div>
          <p>Saving</p>
        </button>
      )}
      {!exerciseBoard.locked ? (
        <button onClick={() => toggleBoardLock(true)} className="w-24">
          <Image src="/icons/lock-icon.svg" alt="unlock" width={30} height={30} className="m-auto" />
          <p>Lock</p>
        </button>
      ) : (
        <button onClick={() => toggleBoardLock(false)} className="w-24">
          <Image src="/icons/unlock-icon.svg" alt="unlock" width={30} height={30} className="m-auto" />
          <p>Unlock</p>
        </button>
      )}

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
    </div>
  );
}
