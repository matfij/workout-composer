import { kv } from '@vercel/kv';
import { Day } from '../../app/workout-composer/types';
import { UtilityManger } from './utility-manager';

export class DatabaseManager {
    static async saveWorkout(days: Day[]) {
        const id = UtilityManger.generateId();
        await kv.hset(id, { days });
        return id;
    }
}
