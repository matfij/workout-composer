import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';
import ExerciseBoard from '../components/exercise-board';
import { BoardData, useSetBoardDataContext } from '../context/BoardContext';
import { BaseContext } from 'next/dist/shared/lib/utils';
import ActionBar from '../components/action-bar';
import { ToastContainer } from 'react-toastify';
import FirebaseService from '../services/FirebaseService';
import UtilService from '../services/UtilService';

interface Props {
  workoutData?: string;
}

const Home: FunctionComponent<Props> = (props: Props) => {
  const updateBoardData = useSetBoardDataContext();
  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    if (props.workoutData) {
      try {
        const loadedBoardData = JSON.parse(props.workoutData) as Partial<BoardData>;

        if (loadedBoardData.days && loadedBoardData.standby) {
          const savedBoardData: BoardData = {
            days: loadedBoardData.days.map((day) => ({
              day: day.day,
              exercises: day.exercises.map((exercise) => ({ ...exercise, id: UtilService.generateId() })),
            })),
            standby: loadedBoardData.standby.map((exercise) => ({ ...exercise, id: UtilService.generateId() })),
            locked: loadedBoardData.locked || false,
          };
          updateBoardData(savedBoardData);
        }
      } catch (e) {}
    }
  }, [props.workoutData]);

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
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <ToastContainer />

      <h1 className="w-full text-center p-3 sm:p-6 text-2xl sm:text-3xl text-yellow-300">Workout Composer</h1>
      <div className="flex flex-col">
        {winReady ? <ExerciseBoard /> : null}
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
    workoutData: data,
  };
  return {
    props: props,
  };
};

export default Home;
