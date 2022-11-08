import Head from 'next/head';
import { useEffect, useState } from 'react';
import ExerciseList from '../components/exercise-list.component';
import { useSetExerciseBoardContext } from '../contexts/exercise-board.context';
import { BaseContext } from 'next/dist/shared/lib/utils';
import ActionBar from '../components/action-bar.component';
import { ToastContainer } from 'react-toastify';
import FirebaseService from '../services/FirebaseService';
import UtilService from '../services/UtilService';
import { ExerciseBoard } from '../definitions';

type Props = {
  exerciseBoardRaw?: string;
}

export default function Index(props: Props) {
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
            standby: exerciseBoardParsed.standby.map((exercise) => ({ ...exercise, id: UtilService.generateId() })),
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
      <Head>
        <title>Workout Composer</title>
        <meta
          name="description"
          content="This app will allow you to create a training plan in just a few seconds."
        />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <ToastContainer />

      <h1 data-testid="app-title" className="w-full text-center p-3 sm:p-6 text-2xl sm:text-3xl text-yellow-300">Workout Composer</h1>
      <div className="flex flex-col">
        {winReady ? <ExerciseList /> : null}
        <ActionBar />
      </div>
    </>
  );
};

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
