import React from 'react';
import { createContext, useContext, useState } from 'react';
import { ExerciseBoard } from '../definitions';
import { initialBoardData } from '../definitions/constants';

const setInitialBoardData = (data: ExerciseBoard) => {
  console.log('setting', data);
};

const ExerciseBoardContext = createContext<ExerciseBoard>(initialBoardData);
const SetExerciseBoardContext = createContext<(data: ExerciseBoard) => void>(setInitialBoardData);

export const ExerciseBoardProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [exerciseBoard, setExerciseBoard] = useState<ExerciseBoard>(initialBoardData);

  const updateBoard = (data: ExerciseBoard) => {
    setExerciseBoard(data);
  };

  return (
    <ExerciseBoardContext.Provider value={exerciseBoard}>
      <SetExerciseBoardContext.Provider value={updateBoard}>{children}</SetExerciseBoardContext.Provider>
    </ExerciseBoardContext.Provider>
  );
};

export const useExerciseBoardContext = (): ExerciseBoard => {
  return useContext(ExerciseBoardContext);
};

export const useSetExerciseBoardContext = () => {
  return useContext(SetExerciseBoardContext);
};
