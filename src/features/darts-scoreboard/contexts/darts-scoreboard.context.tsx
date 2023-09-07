import React, { useContext, useState } from 'react';
import { createContext } from 'react';
import { DartsScoreboard } from '../definitions';

const initialDartsScoreboard: DartsScoreboard = {
  users: [],
};

const DartsScoreboardContext = createContext<DartsScoreboard>(initialDartsScoreboard);
const SetDartsScoreboardContext = createContext<(data: DartsScoreboard) => void>(() => null);

export const DartsScoreboardProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [dartsScoreboard, setDartsScoreboard] = useState<DartsScoreboard>(initialDartsScoreboard);

  const updateDartsScoreboard = (data: DartsScoreboard) => {
    setDartsScoreboard(data);
  };

  return (
    <DartsScoreboardContext.Provider value={dartsScoreboard}>
      <SetDartsScoreboardContext.Provider value={updateDartsScoreboard}>
        {children}
      </SetDartsScoreboardContext.Provider>
    </DartsScoreboardContext.Provider>
  );
};

export const useDartsScoreboardContext = (): DartsScoreboard => {
  return useContext(DartsScoreboardContext);
};

export const useSetDartsScoreboardContext = () => {
  return useContext(SetDartsScoreboardContext);
};
