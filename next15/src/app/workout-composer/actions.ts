'use server';

import { DatabaseManager } from '../../shared/managers/database-manager';
import { UtilityManger } from '../../shared/managers/utility-manager';
import { Day } from './types';

export const saveWorkout = async ({ id, secret, days }: { id?: string; secret: string; days: Day[] }) => {
    if (secret !== UtilityManger.getEnvVar('MASTER_KEY')) {
        throw new Error('Incorrect master key');
    }
    const workoutId = await DatabaseManager.saveWorkout({ id, days });
    return workoutId;
};

export const getWorkout = async (id: string) => {
    const workout = await DatabaseManager.getWorkout(id);
    return workout;
};
