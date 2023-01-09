import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ActionBar from '../../features/workout-composer/components/action-bar.component';
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

describe('Home button', () => {
  it('Redirects to home directory', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<ActionBar />);

    const homeButton = screen.getByTestId('home-button');
    fireEvent.click(homeButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
