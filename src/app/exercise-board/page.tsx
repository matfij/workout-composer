'use client';

import '../../styles/globals.css';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import ActionBar from '../../components/common/action-bar';
import { BoardData, BoardDataProvider, useBoardDataContext, useSetBoardDataContext } from '../../context/BoardContext';
import FirebaseService from '../../services/FirebaseService';
import UtilsService from '../../services/UtilsService';
import { ToastContainer } from 'react-toastify';
import ExerciseList from '../../components/exercise-board/exercise-list';

const getExerciseBoardData = async (id?: string): Promise<string|null> => {
  const firebaseService = FirebaseService.getInstance();
  firebaseService.initializeFirebaseApp();
  return await firebaseService.getWorkoutData(id);
};

export default function ExerciseBoardPage() {
  const boardData = useBoardDataContext();
  const updateBoardData = useSetBoardDataContext();
  const [winReady, setwinReady] = useState(false);

  getExerciseBoardData().then((boardData) => {
    if (!boardData) return;
    const loadedBoardData = JSON.parse(boardData!) as Partial<BoardData>;

    if (loadedBoardData && loadedBoardData.days && loadedBoardData.standby) {
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
  });

  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <div>
      <h1 data-testid="app-title" className="w-full text-center p-3 sm:p-6 text-2xl sm:text-3xl text-yellow-300">Workout Composer</h1>
      <BoardDataProvider>
        <ExerciseList></ExerciseList>
        <ActionBar />
      </BoardDataProvider>
      <ToastContainer />
    </div>
  );
}
