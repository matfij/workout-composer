import { kv } from '@vercel/kv';
import UtilService from '../../../common/services/utils-service';
import { ExerciseBoard } from '../definitions';

export class PersistenceService {
  static async getWorkoutData(id: string): Promise<ExerciseBoard> {
    const board = await kv.hget<ExerciseBoard>(id, 'board');
    if (!board) {
      throw Error('Workout not found!');
    }
    return board;
  }

  static async saveWorkoutData(board: ExerciseBoard) {
    const id = UtilService.generateId();
    await kv.hset(id, { board });
    return id;
  }
}
