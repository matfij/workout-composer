import { BoardData } from "./BoardContext";

export const initialBoardData: BoardData = {
  days: [
    {
      day: 'Monday',
      exercises: [
        { name: 'Push-up', sets: 5, reps: 20 },
        { name: 'Pull-up', sets: 4, reps: 8 },
      ],
    },
    {
      day: 'Wednesday',
      exercises: [
        { name: 'Hollow body', sets: 5, reps: 1 },
        { name: 'Plank', sets: 5, reps: 1 },
      ],
    },
    {
      day: 'Friday',
      exercises: [
        { name: 'Pistol squats', sets: 5, reps: 5 },
        { name: 'Sprints', sets: 5, reps: 1 },
      ],
    },
  ],
  standby: [
    { name: 'Front lever I', sets: 1, reps: 1 },
    { name: 'Front lever II', sets: 1, reps: 1 },
    { name: 'Front lever III', sets: 1, reps: 1 },
    { name: 'Front lever IV', sets: 1, reps: 1 },
    { name: 'Front lever V', sets: 1, reps: 1 },
    { name: 'Front lever VI', sets: 1, reps: 1 },
  ],
};
