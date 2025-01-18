'use server';

import { revalidateTag, unstable_cacheTag as cacheTag } from 'next/cache';
import { DatabaseManager } from '../../shared/managers/database-manager';
import { UtilityManger } from '../../shared/managers/utility-manager';
import { Day } from './types';

export const saveWorkout = async ({ id, secret, days }: { id?: string; secret: string; days: Day[] }) => {
    if (secret !== UtilityManger.getEnvVar('MASTER_KEY')) {
        throw new Error('Incorrect master key');
    }

    revalidateTag(`workout-${id}`);

    const workoutId = await DatabaseManager.saveWorkout({ id, days });
    return workoutId;
};

export const getWorkout = async (id: string) => {
    'use cache';
    cacheTag(`workout-${id}`);

    const workout = await DatabaseManager.getWorkout(id);
    return workout;
};
