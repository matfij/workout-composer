import { DartsPlayerPlace } from './types';

export const validateScore = (score: number) => {
    const ALLOWED_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25];
    return ALLOWED_SCORES.includes(+score);
};

export const getPlaceIcon = (place: DartsPlayerPlace) => {
    switch (place) {
        case DartsPlayerPlace.First:
            return '🥇';
        case DartsPlayerPlace.Second:
            return '🥈';
        case DartsPlayerPlace.Third:
            return '🥉';
        default:
            return '';
    }
};
