import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import FirebaseService from '../../../services/FirebaseService';
import BoardWrapper from '../BoardWrapper';
import { initialBoardData } from '../../../context/exercise-data';
import UtilsService from '../../../services/UtilsService';
import { BoardData } from '../../../context/BoardContext';

async function getExerciseBoardData(id: string | null): Promise<string | null> {
  const firebaseService = FirebaseService.getInstance();
  firebaseService.initializeFirebaseApp();
  return await firebaseService.getWorkoutData(id);
}

export default async function ExerciseBoardIdPage({ params }: any) {
  const rawBoardData = await getExerciseBoardData(params.id);

  let boardData: BoardData = initialBoardData;

  if (rawBoardData) {
    const loadedBoardData = JSON.parse(rawBoardData) as Partial<BoardData>;

    if (loadedBoardData && loadedBoardData.days && loadedBoardData.standby) {
      boardData = {
        days: loadedBoardData.days.map((day) => ({
          day: day.day,
          exercises: day.exercises.map((exercise) => ({ ...exercise, id: UtilsService.generateId() })),
        })),
        standby: loadedBoardData.standby.map((exercise) => ({ ...exercise, id: UtilsService.generateId() })),
        locked: loadedBoardData.locked || false,
      };
    }
  }

  return (
    <>
      <BoardWrapper {...boardData} />
    </>
  );
}
