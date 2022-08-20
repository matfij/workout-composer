import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';
import ExerciseBoard from '../components/exercise-board';
import { BoardData, useSetBoardDataContext } from '../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';
import { getWorkoutData, initializeFirebaseApp } from '../firebase/firebase-utils';
import { BaseContext } from 'next/dist/shared/lib/utils';
import ActionBar from '../components/action-bar';

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
              exercises: day.exercises.map((exercise) => ({ ...exercise, id: uuidv4() })),
            })),
            standby: loadedBoardData.standby.map((exercise) => ({ ...exercise, id: uuidv4() })),
            locked: loadedBoardData.locked || false,
          };
          updateBoardData(savedBoardData);
        }
      } catch (e) {}
    }
  }, [props.workoutData])

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

      <h1 className="w-full text-center p-3 sm:p-6 text-xl sm:text-3xl text-teal-600">Workout Composer</h1>
      <div className="flex flex-col">
        {winReady ? <ExerciseBoard /> : null}

        <ActionBar />
      </div>
    </>
  );
};

export const getServerSideProps = async (context: BaseContext) => {
  initializeFirebaseApp();

  const id = context.query.id;
  let data = '';
  if (id) {
    data = await getWorkoutData(id) ?? '';
  }

  const props: Props = {
    workoutData: data,
  };
  return {
    props: props,
  };
};

export default Home;
