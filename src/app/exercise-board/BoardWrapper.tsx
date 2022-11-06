'use client';

import { ToastContainer } from 'react-toastify';
import ActionBar from '../../components/common/action-bar';
import ExerciseList from '../../components/exercise-board/exercise-list';
import { BoardData, BoardDataProvider } from '../../context/BoardContext';

export default function BoardWrapper(boardData: BoardData) {
  return (
    <>
      <h1 className="w-full text-center p-3 sm:p-6 text-2xl sm:text-3xl text-yellow-300">Workout Composer</h1>
      <BoardDataProvider>
        <ExerciseList {...boardData}></ExerciseList>
        <ActionBar />
      </BoardDataProvider>
      <ToastContainer />
    </>
  );
}
