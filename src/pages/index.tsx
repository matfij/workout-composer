import Head from 'next/head';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import ExerciseAdd from '../components/exercise-add';
import ExerciseBoard from '../components/exercise-board';
import { BoardData, useBoardData, useSetBoardDataContext } from '../context/BoardContext';
import { v4 as uuidv4 } from 'uuid';
import pako from 'pako';
import { addDoc, collection, CollectionReference, doc, DocumentReference, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import { BaseContext } from 'next/dist/shared/lib/utils';

interface Props {
  workoutData: string
}

const Home: FunctionComponent<Props> = (props: Props) => {
  const boardData = useBoardData();
  const updateBoardData = useSetBoardDataContext();
  const [winReady, setwinReady] = useState(false);
  const [displayExerciseAdd, setDisplayExerciseAdd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setwinReady(true);

    const { bdata } = router.query;
    try {
      const bdataTempArr = new Uint8Array(
        (bdata || '')
          .toString()
          .split(',')
          .map((x: string) => +x)
      );
      const decompressedBoardData = pako.inflate(bdataTempArr, { to: 'string' });
      const loadedBoardData = JSON.parse(decompressedBoardData) as BoardData;

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

    const compressedBoardData = pako.deflate(JSON.stringify(minBoardData));
    navigator.clipboard.writeText(
      `${window.location.href}?bdata=${encodeURIComponent(compressedBoardData.toString())}`
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

export const getServerSideProps = async () => {
  const clientCredentials: FirebaseOptions = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  initializeApp(clientCredentials, 'workout-composer');
  const firestore = getFirestore(getApp('workout-composer'));
  const colRef = collection(firestore, 'workouts');
  const docRef = doc(firestore, 'workouts', '5QUmEegrn8aQfZ60oNU3');

  const docSnap = await (getDoc(docRef));
  console.log(docSnap.data())



  // getDocs(colRef).then(e => console.log(e.docs));
  // (await getDoc(colRef)).data
  
  // addDoc(colRef, {data: 'test data'})


  const props: Props = {
    workoutData: 'colRef',
  }
  return {
    props: props,
  };
}

export default Home;
