export type DartsGame = {
    players: DartsPlayer[];
    currentPlayerIndex: number;
    currentTurn: number;
};

export type DartsPlayer = {
    name: string;
    scores: number;
    startingScores: number;
    throws: number[];
    place: DartsPlayerPlace;
};

export enum DartsPlayerPlace {
    None = 'None',
    First = 'First',
    Second = 'Second',
    Third = 'Third',
}
