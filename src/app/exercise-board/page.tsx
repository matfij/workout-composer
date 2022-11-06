'use client';

import '../../styles/globals.css';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import ActionBar from '../../components/common/action-bar';
import { BoardData, useBoardDataContext, useSetBoardDataContext } from '../../context/BoardContext';
import FirebaseService from '../../services/FirebaseService';
import UtilsService from '../../services/UtilsService';
import { ToastContainer } from 'react-toastify';

const getExerciseBoardData = async (id?: string) => {
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
      {JSON.stringify(boardData)}
      <ToastContainer />
      <ActionBar />
    </div>
  );
}
