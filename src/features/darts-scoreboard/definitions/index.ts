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
  throw2: number;
  throw3: number;
}
