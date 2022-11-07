import React from 'react';
import { createContext, useContext, useState } from 'react';
import { Exercise } from '../components/exercise-item';
import { initialBoardData } from './exercise-data';

export interface DayData {
  day: string;
  exercises: Exercise[];
}

export interface BoardData {
  days: DayData[];
  standby: Exercise[];
  locked: boolean;
}

const setInitialBoardData = (data: BoardData) => {
  console.log('setting', data);
};

const BoardDataContext = createContext<BoardData>(initialBoardData);
const SetBoardDataContext = createContext<(data: BoardData) => void>(setInitialBoardData);

export const BoardDataProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);

  const updateBoard = (data: BoardData) => {
    setBoardData(data);
  };

  return (
    <BoardDataContext.Provider value={boardData}>
      <SetBoardDataContext.Provider value={updateBoard}>{children}</SetBoardDataContext.Provider>
    </BoardDataContext.Provider>
  );
};

export const useBoardDataContext = (): BoardData => {
  return useContext(BoardDataContext);
};

export const useSetBoardDataContext = () => {
  return useContext(SetBoardDataContext);
};
