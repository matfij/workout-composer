import { createContext } from 'react';
import { DartsBoard } from '../definitions/index';

const initialBoard: DartsBoard = { users: [], currentUserIndex: 0 };
const setInitialBoard = () => undefined;

export const DartsContext = createContext<{
  board: DartsBoard;
  setBoard: (data: DartsBoard) => void;
}>({ board: initialBoard, setBoard: setInitialBoard });
