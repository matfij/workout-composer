import { render, screen } from "@testing-library/react";
import Board from "./Board";

describe("Board", () => {
  it("Render component", async () => {
    render(<Board />);

    expect(screen.getByText("Add Exercise")).toBeInTheDocument();
  });
});
