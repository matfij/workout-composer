'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { BoardData, useBoardDataContext, useSetBoardDataContext } from '../../context/BoardContext';
import FirebaseService from '../../services/FirebaseService';
import UtilsService from '../../services/UtilsService';

const getExerciseBoardData = async (id?: string) => {
  const firebaseService = FirebaseService.getInstance();
  firebaseService.initializeFirebaseApp();
  return (await firebaseService.getWorkoutData(id ?? '')) ?? '';
};

export default function ExerciseBoardPage() {
  const boardData = useBoardDataContext();
  const updateBoardData = useSetBoardDataContext();
  const [winReady, setwinReady] = useState(false);

  try {
    const loadedBoardData = JSON.parse('') as Partial<BoardData>;

    if (loadedBoardData.days && loadedBoardData.standby) {
      const savedBoardData: BoardData = {
        days: loadedBoardData.days.map((day) => ({
          day: day.day,
          exercises: day.exercises.map((exercise) => ({ ...exercise, id: UtilsService.generateId() })),
        })),
        standby: loadedBoardData.standby.map((exercise) => ({ ...exercise, id: UtilsService.generateId() })),
        locked: loadedBoardData.locked || false,
      };
      updateBoardData(savedBoardData);
    }
  } catch (e) {}

  useEffect(() => {
    setwinReady(true);
  }, []);

  return <div>{JSON.stringify(boardData)}</div>;
}
