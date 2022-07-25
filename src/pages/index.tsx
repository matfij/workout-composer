import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ExerciseAdd from '../components/exercise-add';
import ExerciseBoard from '../components/exercise-board';
import { BoardData, useBoardData, useSetBoardDataContext } from '../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const boardData = useBoardData();
  const updateBoardData = useSetBoardDataContext();
  const [winReady, setwinReady] = useState(false);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setwinReady(true);

    const { bdata } = router.query;
    try {
      const loadedBoardData = JSON.parse(decodeURIComponent(bdata as string)) as BoardData;
      const savedBoardData: BoardData = {
        days: loadedBoardData.days.map((day) => ({
          day: day.day,
          exercises: day.exercises.map((exercise) => ({ ...exercise, id: uuidv4() })),
        })),
        standby: loadedBoardData.standby.map((exercise) => ({ ...exercise, id: uuidv4() })),
      };
      updateBoardData(savedBoardData);

      window.history.pushState({}, document.title, '/');
    } catch (ex) {}
  }, [router.query]);

  const toggleExerciseAdd = () => {
    setDisplayExerciseAdd(!displayExerciseAdd);
  };

  const copyLink = () => {
    const minBoardData: BoardData = {
      days: boardData.days.map((day) => ({
        day: day.day,
        exercises: day.exercises.map((exercise) => ({ ...exercise, id: '' })),
      })),
      standby: boardData.standby.map((exercise) => ({ ...exercise, id: '' })),
    };
    navigator.clipboard.writeText(
      `${window.location.href}?bdata=${encodeURIComponent(JSON.stringify(minBoardData))}`
    );
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
}

export default Home;
