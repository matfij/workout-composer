import { Day } from '../../app/workout-composer/types';
import { UtilityManger } from './utility-manager';
import { createClient } from '@supabase/supabase-js';

const dbTable = 'workouts';
const dbUrl = UtilityManger.getEnvVar<string>('DB_URL');
const dbKey = UtilityManger.getEnvVar<string>('DB_KEY');
const dbclient = createClient(dbUrl, dbKey);

export class DatabaseManager {
    static async saveWorkout({ id, days }: { id?: string; days: Day[] }) {
        const key = id?.length ? id : UtilityManger.generateId();
        const { data } = await dbclient.from(dbTable).select('workout').eq('id', id).maybeSingle();
        if (data) {
            await dbclient.from(dbTable).update({ workout: days }).eq('id', key);
        } else {
            await dbclient.from(dbTable).insert({ id: key, workout: days });
        }
        return key;
    }

    static async getWorkout(id: string): Promise<Day[] | null> {
        const { data } = await dbclient.from(dbTable).select('workout').eq('id', id).maybeSingle();
        return data?.workout;
    }
}
