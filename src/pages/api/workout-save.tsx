import { NextApiRequest, NextApiResponse } from 'next';
import FirebaseService from '../../features/workout-composer/services/firebase-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const firebaseService = FirebaseService.getInstance();
  const workoutData = req.body;
  const result = await firebaseService.saveWorkoutData(workoutData);
  res.status(201).json(result);
}
