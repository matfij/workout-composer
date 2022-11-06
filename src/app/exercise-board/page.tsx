import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import BoardWrapper from './BoardWrapper';
import { initialBoardData } from '../../context/exercise-data';

export default async function ExerciseBoardPage() {
  return (
    <BoardWrapper {...initialBoardData} />
  );
}
