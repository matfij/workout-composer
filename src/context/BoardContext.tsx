import { createContext, ReactNode, useContext, useState } from 'react';
import { Exercise } from '../components/exercise-item';

export interface DayData {
  day: string;
  exercises: Exercise[];
}

export interface BoardData {
  days: DayData[];
}

const initialBoardData: BoardData = {
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
};
const setInitialBoardData = (data: BoardData) => { console.log(data); };

const BoardDataContext = createContext<BoardData>(initialBoardData);
const SetBoardDataContext = createContext<(data: BoardData) => void>(setInitialBoardData);

export const BoardDataProvider = ({ children }: any): JSX.Element => {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);

  const updateBoard = (data: BoardData) => {
    console.log(data)
    setBoardData(data);
  };

  return (
    <BoardDataContext.Provider value={boardData}>
      <SetBoardDataContext.Provider value={updateBoard}>
        {children}
      </SetBoardDataContext.Provider>
    </BoardDataContext.Provider>
  );
};

export const useBoardData = (): BoardData => {
  return useContext(BoardDataContext);
};

export const useSetBoardDataContext = () => {
  return useContext(SetBoardDataContext);
}
