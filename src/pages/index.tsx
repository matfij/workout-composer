import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ExerciseAdd from '../components/exercise-add';
import ExerciseBoard from '../components/exercise-board';
import { BoardDataProvider } from '../context/BoardContext';

const Home: NextPage = () => {
  const [winReady, setwinReady] = useState(false);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);

  useEffect(() => {
    setwinReady(true);
  }, []);

  const toggleExerciseAdd = () => {
    setDisplayExerciseAdd(!displayExerciseAdd);
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
      <BoardDataProvider>
        <div className="flex flex-col">
          {winReady ? <ExerciseBoard /> : null}

          <div className="w-full max-w-sm m-auto pt-6">
            <button onClick={toggleExerciseAdd} className="btnPrimary btnFloat sm:w-72">
              New
            </button>
          </div>
        </div>

        {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
      </BoardDataProvider>
    </>
  );
};

export default Home;
