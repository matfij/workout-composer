import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../pages';

describe('Index (Home) Component', () => {
  it('Renders app title', () => {
    render(<Home></Home>);
    
    const title = screen.getByTestId('app-title');
    
    expect(title.textContent).toBe('Workout Composer');
  });
});
