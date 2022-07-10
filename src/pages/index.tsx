import type { NextPage } from 'next';
import Head from 'next/head';
import ExerciseAdd from '../components/exercise-add';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Workout Composer</title>
        <meta name="description" content="This app will allow you to create a training plan in just a few seconds." />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <ExerciseAdd></ExerciseAdd>
    </>
  );
};

export default Home;
