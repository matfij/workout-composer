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
