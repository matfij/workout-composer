export interface AddUserFormFields {
  name: string;
}

export interface DartsUser {
  name: string;
  scores: number;
  throws: number[];
}

export interface DartsScoreboard {
  users: DartsUser[];
}

export interface UpdateScoresFields {
  throw1: number;
  throw2: number;
  throw3: number;
}
