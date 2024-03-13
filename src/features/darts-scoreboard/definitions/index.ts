export interface AddUserFormFields {
  name: string;
  scores: number;
}

export interface DartsUser {
  name: string;
  scores: number;
  startingScores: number;
  throws: number[];
}

export interface DartsBoard {
  users: DartsUser[];
}

export interface UpdateScoresFields {
  throw1: number;
  throw2: number;
  throw3: number;
}
