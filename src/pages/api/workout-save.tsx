import { NextApiRequest, NextApiResponse } from 'next';
import { PersistenceService } from '../../features/workout-composer/services/persistence-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await PersistenceService.saveWorkoutData(req.body);
  res.status(201).json(result);
}
