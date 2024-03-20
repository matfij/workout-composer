import { Place } from "./constants";

export interface AddUserFormFields {
  name: string;
  scores: number;
}

export interface DartsUser {
  name: string;
  scores: number;
  startingScores: number;
  throws: number[];
  place: Place;
}

export interface DartsBoard {
  users: DartsUser[];
  currentUserIndex: number;
  turnsPassed: number;
}

export interface UpdateScoresFields {
  throw1: number;
  throw1Factor: number;
  throw2: number;
  throw2Factor: number;
  throw3: number;
  throw3Factor: number;
}
