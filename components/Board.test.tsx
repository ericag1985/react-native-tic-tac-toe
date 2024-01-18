import React from "react";
import { render, userEvent } from "@testing-library/react-native";
import Board from "./Board";

describe("Board", () => {
  it("renders an empty board on intialization", () => {
    const { queryAllByTestId } = render(<Board />);

    const emptyCells = queryAllByTestId("empty-cell");

    expect(emptyCells.length).toBe(9);
  });

  it("updates the grid and current player when a cell is pressed", async () => {
    const { getByTestId } = render(<Board />);

    await userEvent.press(getByTestId("cell-0-0"));

    expect(getByTestId("X-cell")).toBeOnTheScreen();
  });

  it("does not update the grid or current player when a filled cell is pressed", async () => {
    const { getByTestId } = render(<Board />);

    await userEvent.press(getByTestId("cell-0-0"));
    await userEvent.press(getByTestId("cell-0-0"));

    expect(getByTestId("X-cell")).toBeOnTheScreen();
  });

  it("declares the correct winner when a winning combination is selected", async () => {
    const { getByTestId } = render(<Board />);

    await userEvent.press(getByTestId("cell-0-0")); // X
    await userEvent.press(getByTestId("cell-1-0")); // O
    await userEvent.press(getByTestId("cell-0-1")); // X
    await userEvent.press(getByTestId("cell-1-1")); // O
    await userEvent.press(getByTestId("cell-0-2")); // X

    expect(getByTestId("winning-text").props.children).toBe("X wins!");
  });

  it("declares a draw when all blocks have been clicked and there is no winner", async () => {
    const { getByTestId } = render(<Board />);

    await userEvent.press(getByTestId("cell-0-0")); // X
    await userEvent.press(getByTestId("cell-0-1")); // O
    await userEvent.press(getByTestId("cell-0-2")); // X
    await userEvent.press(getByTestId("cell-1-1")); // O
    await userEvent.press(getByTestId("cell-2-1")); // X
    await userEvent.press(getByTestId("cell-1-0")); // O
    await userEvent.press(getByTestId("cell-1-2")); // X
    await userEvent.press(getByTestId("cell-2-2")); // O
    await userEvent.press(getByTestId("cell-2-0")); // X

    expect(getByTestId("winning-text").props.children).toBe(
      "The game is a draw!"
    );
  });

  it("resets the game when resetGame is called", async () => {
    const { getByTestId, queryAllByTestId } = render(<Board />);

    await userEvent.press(getByTestId("cell-0-0")); // X
    await userEvent.press(getByTestId("cell-1-0")); // O
    await userEvent.press(getByTestId("cell-0-1")); // X
    await userEvent.press(getByTestId("cell-1-1")); // O
    await userEvent.press(getByTestId("cell-0-2")); // X

    const resetButton = getByTestId("reset-button");
    expect(resetButton).toBeOnTheScreen();
    await userEvent.press(resetButton);

    const emptyCells = queryAllByTestId("empty-cell");
    expect(emptyCells.length).toBe(9);
    expect(resetButton).not.toBeOnTheScreen();
  });
});
