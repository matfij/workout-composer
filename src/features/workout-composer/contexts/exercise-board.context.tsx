import { createContext, Dispatch, SetStateAction } from 'react';
import { ExerciseBoard } from '../definitions';
import { initialBoardData } from '../definitions/constants';

export const WorkoutContext = createContext<{
  workout: ExerciseBoard;
  setWorkout: Dispatch<SetStateAction<ExerciseBoard>>;
}>({ workout: initialBoardData, setWorkout: () => undefined });
