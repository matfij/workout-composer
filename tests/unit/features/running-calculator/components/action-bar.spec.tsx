import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ActionBar from '../../../../../src/common/components/action-bar.component';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

describe('Action Bar', () => {
  let mockRouter: { push: () => void };

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<ActionBar />);
  });

  it('Redirects to home directory', () => {
    const homeButton = screen.getByTestId('home-button');

    fireEvent.click(homeButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
