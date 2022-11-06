'use client';

import React from 'react';
import style from './action-bar.module.css';
import { useState } from 'react';
import { useBoardDataContext, useSetBoardDataContext } from '../../context/BoardContext';
import ToastService from '../../services/ToastService';
import ExerciseAdd from '../exercise-board/exercise-add';
import { NextApiRequest, NextApiResponse } from 'next';
import FirebaseService from '../../services/FirebaseService';

const saveWorkout = async (workoutData: string): Promise<string> => {
  const firebaseService = FirebaseService.getInstance();
  return await firebaseService.saveWorkoutData(workoutData);
};

export default function ActionBar() {
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
    const res = await saveWorkout(JSON.stringify(JSON.stringify(boardData)));
    setIsCopying(false);

    console.log(res);

    // if (res.status !== 201) {
    //   ToastService.showError('Failed to save the workout, please try again later');
    //   return;
    // }
    // const workoutId = await res.json();

    // window.history.pushState({}, document.title, '/');
    // navigator.clipboard.writeText(`${window.location.href}?id=${workoutId}`);
    // ToastService.showInfo('✨ Workout link copied!');
  };

  const toggleBoardLock = (locked: boolean) => {
    setBoardData({ ...boardData, locked: locked });
  };

  return (
    <div className={style.actionBarWrapper}>
      <button onClick={toggleExerciseAdd} className="w-24 bg">
        <p data-testid="new-icon" className="text-3xl">
          🤸🏻‍♂️
        </p>{' '}
        New
      </button>
      {!isCopying ? (
        <button onClick={copyLink} className="w-24">
          <p data-testid="share-icon" className="text-3xl">
            🔗
          </p>{' '}
          Share
        </button>
      ) : (
        <button className="w-24">
          <p data-testid="loading-icon" className="text-3xl">
            ⏳
          </p>{' '}
          Saving...
        </button>
      )}
      {!boardData.locked ? (
        <button onClick={() => toggleBoardLock(true)} className="w-24">
          <p data-testid="lock-icon" className="text-3xl">
            🔒
          </p>{' '}
          Lock
        </button>
      ) : (
        <button onClick={() => toggleBoardLock(false)} className="w-24">
          <p data-testid="unlock-icon" className="text-3xl">
            🔓
          </p>{' '}
          Unlock
        </button>
      )}

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
    </div>
  );
}
