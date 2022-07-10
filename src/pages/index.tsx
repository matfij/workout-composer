import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import ExerciseAdd from '../components/exercise-add';
import ExerciseBoard from '../components/exercise-board';
import { Exercise } from '../components/exercise-item';

export const BASE_EXERCISES: Exercise[] = [
  { name: 'push-ups', sets: 4, reps: 12, rest: '2min' },
  { name: 'pull-ups', sets: 4, reps: 4 },
  { name: 'dips', sets: 4, reps: 8 },
  { name: 'squats', sets: 4, reps: 16 },
];

type Props = {
  exercises: Exercise[];
};

const Home: NextPage<Props> = (props: Props) => {
  // const [exercises, setExercises] = useState<Exercise[]>([]);
  const [winReady, setwinReady] = useState(false);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);

  // useEffect(() => {
  //   setExercises(BASE_EXERCISES);
  // }, []);

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

      {winReady ? <ExerciseBoard exercises={props.exercises} /> : null}

      <button onClick={toggleExerciseAdd} className="btnBase">
        Add exercise
      </button>

      {displayExerciseAdd && <ExerciseAdd onCancel={toggleExerciseAdd} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { exercises: BASE_EXERCISES } };
};

export default Home;
