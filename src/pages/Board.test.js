import { render, screen } from "@testing-library/react";
import Board from "./Board";

test('Render component', async () => {
    render(<Board />);

    expect(screen.getByText('Monday')).toBeInTheDocument();
});

test('Render exercise list', async () => {
    render(<Board />);

    console.log(screen)

    expect(screen.getByText('Squat')).toBeInTheDocument();
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Deadlift')).toBeInTheDocument();
    expect(screen.getByText('Overhead Press')).toBeInTheDocument();
});
