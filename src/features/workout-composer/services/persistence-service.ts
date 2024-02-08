import { kv } from '@vercel/kv';
import UtilService from '../../../common/services/utils-service';
import { ExerciseBoard } from '../definitions';

export class PersistenceService {
  static async getWorkoutData(id: string): Promise<ExerciseBoard | null> {
    const board = await kv.hget<ExerciseBoard>(id, 'board');
    return board;
  }

  static async saveWorkoutData(board: ExerciseBoard) {
    const id = UtilService.generateId();
    await kv.hset(id, { board });
    return id;
  }
}
