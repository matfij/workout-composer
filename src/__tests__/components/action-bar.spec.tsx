import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ActionBar from '../../components/action-bar';

describe('Exercise Item', () => {
  it('Renders correct icons in initial state', () => {
    render(<ActionBar></ActionBar>);

    const newIconContainer = screen.getByTestId('new-icon');
    const shareIconContainer = screen.getByTestId('share-icon');
    const lockIconContainer = screen.getByTestId('lock-icon');

    expect(newIconContainer.textContent).toContain('🤸🏻‍♂️');
    expect(shareIconContainer.textContent).toContain('🔗');
    expect(lockIconContainer.textContent).toContain('🔒');
  });
});
