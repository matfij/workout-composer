import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react'
import ExerciseItem, { Exercise } from '../components/exercise-item';

describe('Exercise Item', () => {

    it.only('should render exercise name', () => {
        const exerciseInd = 1;
        const exercise: Exercise = {
            id: 'eid1010',
            name: 'Pistol squats',
        };

        const { getByTestId } = render(<ExerciseItem {...exercise} index={exerciseInd} />);

        const exerciseItem = getByTestId('exercise-name');
        expect(exerciseItem.textContent).toContain(exercise.name);
    })
});
