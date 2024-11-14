export type DartsGame = {
    players: DartsPlayer[];
    currentPlayerIndex: number;
    currentTurn: number;
};

export type DartsPlayer = {
    name: string;
    points: number;
    throws: number[];
    place: DartsPlayerPlace;
};

export enum DartsPlayerPlace {
    None = 'None',
    First = 'First',
    Second = 'Second',
    Third = 'Third',
}

export type PlayerScoreForm = {
    throw1: number;
    throw2: number;
    throw3: number;
    factor1: number;
    factor2: number;
    factor3: number;
};
