import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index from '../../pages';

describe('Links in Index (Home) Component', () => {
  beforeEach(() => {
    render(<Index />);
  });

  it('Renders proper text in workout-composer link', () => {
    const link = screen.getByTestId('workout-composer-link');
    expect(link.textContent).toBe('Workout Composer');
  });

  it('Renders proper text in running-calculator link', () => {
    const link = screen.getByTestId('running-calculator-link');
    expect(link.textContent).toBe('Running Calculator');
  });
});
