import { NextApiRequest, NextApiResponse } from 'next';
import FirebaseService from '../../services/FirebaseService';

const firebaseService = FirebaseService.getInstance();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const workoutData = req.body;

  const result = await firebaseService.saveWorkoutData(workoutData);

  res.status(201).json(result);
};

export default handler;
