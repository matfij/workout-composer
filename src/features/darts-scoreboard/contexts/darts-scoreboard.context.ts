import { createContext } from 'react';
import { DartsBoard } from '../definitions/index';

const initialBoard = { users: [] };
const setInitialBoard = () => undefined;

export const DartsContext = createContext<{
  board: DartsBoard;
  setBoard: (data: DartsBoard) => void;
}>({ board: initialBoard, setBoard: setInitialBoard });
