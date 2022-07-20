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

      <h1>Workout Composer</h1>
      <BoardDataProvider>
        {winReady ? <ExerciseBoard /> : null}

        <button onClick={toggleExerciseAdd} className="btnBase">
          Add exercise
        </button>

        {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
      </BoardDataProvider>
    </>
  );
};

export default Home;
