import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import { addDoc, collection, doc, Firestore, getDoc, getFirestore } from 'firebase/firestore';

export default class FirebaseService {
  static instance: FirebaseService;
  private firestore!: Firestore;

  static getInstance(): FirebaseService {
    if (!this.instance) this.instance = new FirebaseService();
    return this.instance;
  }

  initializeFirebaseApp() {
    const clientCredentials: FirebaseOptions = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    initializeApp(clientCredentials, 'workout-composer');
    this.firestore = getFirestore(getApp('workout-composer'));
  }

  async getWorkoutData(id?: string): Promise<string|null> {
    if (!this.firestore) this.initializeFirebaseApp();
    if (!id) return null;

    const docRef = doc(this.firestore, 'workouts', id);
    const docSnap = await getDoc(docRef);

    return docSnap.data()?.data;
  }

  async saveWorkoutData(data: string) {
    if (!this.firestore) this.initializeFirebaseApp();

    const colRef = collection(this.firestore, 'workouts');
    return (await addDoc(colRef, { data: data })).id;
  }
}
