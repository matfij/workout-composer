import React, { useContext } from 'react';
import Image from 'next/image';
import style from './action-bar.module.scss';
import { useState } from 'react';
import ExerciseAddEdit from './exercise-add-edit.component';
import ToastService from '../../../common/services/toast-service';
import LoadinIndicator from '../../../common/components/loading-indicator.component';
import { useRouter } from 'next/router';
import DayAdd from './day-add.component';
import { StorageService } from '../../../common/services/storage-service';
import { WorkoutContext } from '../contexts/exercise-board.context';

export default function ActionBar() {
  const router = useRouter();
  const { workout, setWorkout } = useContext(WorkoutContext);
  const [displayDayAdd, setDisplayDayAdd] = useState(false);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const navigateHome = () => {
    router.push('/');
  };

  const toggleBoardLock = (locked: boolean) => {
    setWorkout((prev) => ({ ...prev, locked: locked }));
  };

  const toggleExerciseAdd = () => {
    setDisplayExerciseAdd(!displayExerciseAdd);
  };

  const toggleDayAdd = () => {
    setDisplayDayAdd(!displayDayAdd);
  };

  const copyLink = async () => {
    if (isCopying) return;
    setIsCopying(true);

    const res = await fetch('/api/workout-save', {
      method: 'POST',
      body: JSON.stringify(workout),
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

    StorageService.write('workoutData', workout);

    window.history.pushState({}, document.title, '/');
    navigator.clipboard.writeText(`${window.location.href}workout-composer?id=${workoutId}`);
    window.history.pushState({}, document.title, `workout-composer?id=${workoutId}`);
    ToastService.showInfo('💫 Workout link copied!');
  };

  return (
    <div className={style.actionBarWrapper}>
      <button onClick={navigateHome} className={style.navItem}>
        <Image src="/icons/home-icon.svg" alt="unlock" width={28} height={28} />
        <p>Home</p>
      </button>
      {!workout.locked && (
        <button onClick={toggleExerciseAdd} className={style.navItem}>
          <Image src="/icons/add-icon.svg" alt="unlock" width={28} height={28} />
          <p>Add</p>
        </button>
      )}
      {workout.locked && (
        <>
          {!isCopying ? (
            <button onClick={copyLink} className={style.navItem}>
              <Image src="/icons/share-icon.svg" alt="unlock" width={28} height={28} />
              <p>Share</p>
            </button>
          ) : (
            <button className={style.navItem}>
              <LoadinIndicator />
              <p>Saving</p>
            </button>
          )}
        </>
      )}
      {!workout.locked ? (
        <button onClick={() => toggleBoardLock(true)} className={style.navItem}>
          <Image src="/icons/lock-icon.svg" alt="lock" width={28} height={28} />
          <p>Lock</p>
        </button>
      ) : (
        <button onClick={() => toggleBoardLock(false)} className={style.navItem}>
          <Image src="/icons/unlock-icon.svg" alt="unlock" width={28} height={28} />
          <p>Unlock</p>
        </button>
      )}

      {(displayExerciseAdd || workout.editedExercise) && (
        <ExerciseAddEdit
          exercise={workout.editedExercise}
          toggleDayAdd={toggleDayAdd}
          onCancel={toggleExerciseAdd}
        />
      )}

      {displayDayAdd && <DayAdd onCancel={toggleDayAdd}></DayAdd>}
    </div>
  );
}
