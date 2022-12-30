import { BaseContext } from 'next/dist/shared/lib/utils';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import UtilService from '../common/services/utils-service';
import ActionBar from '../features/workout-composer/components/action-bar.component';
import ExerciseList from '../features/workout-composer/components/exercise-list.component';
import { useSetExerciseBoardContext } from '../features/workout-composer/contexts/exercise-board.context';
import { ExerciseBoard } from '../features/workout-composer/definitions';
import FirebaseService from '../features/workout-composer/services/firebase-service';

type Props = {
  exerciseBoardRaw?: string;
};

export default function WorkoutComposer(props: Props) {
  const updateBoardData = useSetExerciseBoardContext();
  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    if (props.exerciseBoardRaw) {
      try {
        const exerciseBoardParsed = JSON.parse(props.exerciseBoardRaw) as Partial<ExerciseBoard>;
        if (exerciseBoardParsed.days && exerciseBoardParsed.standby) {
          updateBoardData({
            days: exerciseBoardParsed.days.map((day) => ({
              day: day.day,
              exercises: day.exercises.map((exercise) => ({ ...exercise, id: UtilService.generateId() })),
            })),
            standby: exerciseBoardParsed.standby.map((exercise) => ({
              ...exercise,
              id: UtilService.generateId(),
            })),
            locked: exerciseBoardParsed.locked || false,
          });
        }
      } catch (e) {}
    }
  }, [props.exerciseBoardRaw]);

  useEffect(() => {
    setwinReady(true);
  }, []);
  return (
    <>
      <main className='mainWrapper'>
        <h1 className="w-full text-center p-3 mt-8 sm:p-6 text-2xl sm:text-3xl text-yellow-300">
          Workout Composer
        </h1>
        <div className="flex flex-col">
          {winReady ? <ExerciseList /> : null}
          <ActionBar />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export const getServerSideProps = async (context: BaseContext) => {
  const firebaseService = FirebaseService.getInstance();
  firebaseService.initializeFirebaseApp();

  const id = context.query.id;
  let data = '';
  if (id) {
    data = (await firebaseService.getWorkoutData(id)) ?? '';
  }

  const props: Props = {
    exerciseBoardRaw: data,
  };
  return {
    props: props,
  };
};
