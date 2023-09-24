import { DartsScoreboard } from '../definitions';

const DARTS_SCOREBOARD_KEY = 'wc-darts-scoreboard';

export const loadDartsScoreboardData = (): DartsScoreboard | null => {
  try {
    const rawData = localStorage.getItem(DARTS_SCOREBOARD_KEY);
    if (!rawData) {
      return null;
    }
    return JSON.parse(rawData);
  } catch {
    return null;
  }
};

export const saveDartsScoreboardData = (data: DartsScoreboard | null) => {
  if (!data) {
    localStorage.removeItem(DARTS_SCOREBOARD_KEY);
  }
  localStorage.setItem(DARTS_SCOREBOARD_KEY, JSON.stringify(data));
};
