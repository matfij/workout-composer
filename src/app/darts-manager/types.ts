export const dartsConfig = {
    startingPoints: 501,
    allowedPoints: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25],
    maximumPoint: 25,
    throws: [1, 2, 3],
    throwsNumber: 3,
    factors: [1, 2, 3],
    factorsNumber: 3,
} as const;

export type DartsGame = {
    players: DartsPlayer[];
    currentPlayerIndex: number;
    currentTurn: number;
};

export type DartsPlayer = {
    name: string;
    points: number;
    startingPoints: number;
    throws: number[];
    place: DartsPlayerPlace;
};

export enum DartsPlayerPlace {
    None = 'None',
    First = 'First',
    Second = 'Second',
    Third = 'Third',
}

export type PlayerUpdatePointsInput = {
    throw1: number;
    throw2: number;
    throw3: number;
    factor1: number;
    factor2: number;
    factor3: number;
};
