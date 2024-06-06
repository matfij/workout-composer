import { ExerciseBoard } from '.';
import UtilService from '../../../common/services/utils-service';

export const STANDBY_ID = 'item-standby';

export const initialBoardData: ExerciseBoard = {
  days: [
    {
      day: 'Monday',
      exercises: [
        { id: UtilService.generateId(), name: 'Push-up', sets: '5', reps: '20' },
        { id: UtilService.generateId(), name: 'Pull-up', sets: '4', reps: '8' },
      ],
    },
    {
      day: 'Wednesday',
      exercises: [
        { id: UtilService.generateId(), name: 'Hollow body', sets: '5', reps: '1' },
        { id: UtilService.generateId(), name: 'Plank', sets: '5', reps: '1' },
      ],
    },
    {
      day: 'Friday',
      exercises: [
        { id: UtilService.generateId(), name: 'Pistol squats', sets: '5', reps: '5' },
        { id: UtilService.generateId(), name: 'Sprints', sets: '5', reps: '1' },
      ],
    },
  ],
  standby: [
    { id: UtilService.generateId(), name: 'Front lever', sets: '1', reps: '1' },
    { id: UtilService.generateId(), name: 'Straddle planche', sets: '1', reps: '1' },
    { id: UtilService.generateId(), name: 'Back lever', sets: '1', reps: '1' },
    { id: UtilService.generateId(), name: 'Supine planche', sets: '1', reps: '1' },
  ],
  locked: false,
};
