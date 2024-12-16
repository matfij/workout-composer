import { kv } from '@vercel/kv';
import { Day } from '../../app/workout-composer/types';
import { UtilityManger } from './utility-manager';

export class DatabaseManager {
    static async saveWorkout({ id, days }: { id?: string; days: Day[] }) {
        const key = id?.trim().length ? id : UtilityManger.generateId();
        await kv.hset(key, { days });
        return key;
    }

    static async getWorkout(id: string) {
        const workout = await kv.hget<Day[]>(id, 'days');
        return workout;
    }
}
