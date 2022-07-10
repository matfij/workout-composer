import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ExerciseAdd from '../components/exercise-add';
import ExerciseItem, { Exercise } from '../components/exercise-item';

export const BASE_EXERCISES: Exercise[] = [
  { name: 'push-ups', sets: 4, reps: 12, rest: '2min' },
  { name: 'pull-ups', sets: 4, reps: 4 },
  { name: 'dips', sets: 4, reps: 8 },
  { name: 'squats', sets: 4, reps: 16 },
];

const Home: NextPage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);

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

      {BASE_EXERCISES.map((exercise) => (
        <ExerciseItem key={exercise.name} {...exercise} />
      ))}

      <button onClick={toggleExerciseAdd} className="btnBase">
        Add exercise
      </button>

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
    </>
  );
};

export default Home;
