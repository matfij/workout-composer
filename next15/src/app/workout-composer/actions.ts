'use server';

import { DatabaseManager } from '../../shared/managers/database-manager';
import { Day } from './types';

export const saveWorkout = async (days: Day[]) => {
    const workoutId = await DatabaseManager.saveWorkout(days);
    return workoutId;
};
