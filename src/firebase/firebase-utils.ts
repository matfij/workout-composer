import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import { addDoc, collection, doc, Firestore, getDoc, getFirestore } from 'firebase/firestore';

export let firestore: Firestore;

export const initializeFirebaseApp = () => {
  const clientCredentials: FirebaseOptions = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  initializeApp(clientCredentials, 'workout-composer');
  firestore = getFirestore(getApp('workout-composer'));
};

export const getWorkoutData = async (id: string): Promise<string> => {
  const docRef = doc(firestore, 'workouts', id);
  const docSnap = await getDoc(docRef);

  return docSnap.data()?.data;
};

export const saveWorkoutData = async (data: string) => {
  if (!firestore) initializeFirebaseApp();

  const colRef = collection(firestore, 'workouts');
  return (await addDoc(colRef, { data: data })).id;
};
