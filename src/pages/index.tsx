import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';
import ExerciseAdd from '../components/exercise-add';
import ExerciseBoard from '../components/exercise-board';
import { BoardData, useBoardData, useSetBoardDataContext } from '../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';
import { getWorkoutData, initializeFirebaseApp } from '../firebase/firebase-utils';
import { BaseContext } from 'next/dist/shared/lib/utils';

interface Props {
  workoutData?: string;
}

const Home: FunctionComponent<Props> = (props: Props) => {
  const boardData = useBoardData();
  const updateBoardData = useSetBoardDataContext();
  const [winReady, setwinReady] = useState(false);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);

  useEffect(() => {
    if (props.workoutData) {
      try {
        const loadedBoardData = JSON.parse(props.workoutData) as BoardData;
      
        const savedBoardData: BoardData = {
          days: loadedBoardData.days.map((day) => ({
            day: day.day,
            exercises: day.exercises.map((exercise) => ({ ...exercise, id: uuidv4() })),
          })),
          standby: loadedBoardData.standby.map((exercise) => ({ ...exercise, id: uuidv4() })),
        };
        updateBoardData(savedBoardData);
      } catch (e) {}
    }
  }, [props.workoutData])

  useEffect(() => {
    setwinReady(true);
  }, []);

  const toggleExerciseAdd = () => {
    setDisplayExerciseAdd(!displayExerciseAdd);
  };

  const copyLink = async () => {
    const minBoardData: BoardData = {
      days: boardData.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.map((exercise) => ({ ...exercise, id: '' })),
      })),
      standby: boardData.standby.map((exercise) => ({ ...exercise, id: '' })),
    };

    const res = await fetch('/api/workout-save', {
      method: 'POST',
      body: JSON.stringify(JSON.stringify(minBoardData)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const workoutId = await res.json();

    window.history.pushState({}, document.title, '/');
    navigator.clipboard.writeText(`${window.location.href}?id=${workoutId}`);
  };

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

        <div className="w-full max-w-sm m-auto pt-6">
          <button onClick={toggleExerciseAdd} className="btnPrimary btnFloat sm:w-72">
            New
          </button>
          <button onClick={copyLink} className="btnPrimary btnFloat sm:w-72 mb-20 sm:mb-16">
            Copy link
          </button>
        </div>
      </div>

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
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
