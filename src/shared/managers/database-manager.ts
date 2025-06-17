import { Redis } from '@upstash/redis';
import { Day } from '../../app/workout-composer/types';
import { UtilityManger } from './utility-manager';

const redis = Redis.fromEnv();

export class DatabaseManager {
    static async saveWorkout({ id, days }: { id?: string; days: Day[] }) {
        const key = id?.trim().length ? id : UtilityManger.generateId();
        await redis.set(key, days);
        return key;
    }

    static async getWorkout(id: string) {
        const workout = await redis.get<Day[]>(id);
        return workout;
    }
}
