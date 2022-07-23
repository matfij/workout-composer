import { BoardData } from "./BoardContext";
import { v4 as uuidv4 } from 'uuid';

export const initialBoardData: BoardData = {
  days: [
    {
      day: 'Monday',
      exercises: [
        { id: uuidv4(), name: 'Push-up', sets: 5, reps: 20 },
        { id: uuidv4(), name: 'Pull-up', sets: 4, reps: 8 },
      ],
    },
    {
      day: 'Wednesday',
      exercises: [
        { id: uuidv4(), name: 'Hollow body', sets: 5, reps: 1 },
        { id: uuidv4(), name: 'Plank', sets: 5, reps: 1 },
      ],
    },
    {
      day: 'Friday',
      exercises: [
        { id: uuidv4(), name: 'Pistol squats', sets: 5, reps: 5 },
        { id: uuidv4(), name: 'Sprints', sets: 5, reps: 1 },
      ],
    },
  ],
  standby: [
    { id: uuidv4(), name: 'Front lever I', sets: 1, reps: 1 },
    { id: uuidv4(), name: 'Front lever I', sets: 1, reps: 1 },
    { id: uuidv4(), name: 'Front lever III', sets: 1, reps: 1 },
    { id: uuidv4(), name: 'Front lever IV', sets: 1, reps: 1 },
    { id: uuidv4(), name: 'Front lever V', sets: 1, reps: 1 },
    { id: uuidv4(), name: 'Front lever VI', sets: 1, reps: 1 },
  ],
};
