import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Board from "./Board";

describe("Board", () => {
  it("renders an empty board on intialization", () => {
    const board = render(<Board />);

    const emptyCells = board.queryAllByTestId("empty-cell");

    expect(emptyCells.length).toBe(9);
  });

  it("updates the grid and current player when a cell is pressed", () => {
    const { getByTestId } = render(<Board />);

    fireEvent.press(getByTestId("cell-0-0"));

    expect(getByTestId("X-cell")).toBeOnTheScreen();
  });

  it("does not update the grid or current player when a filled cell is pressed", () => {
    const { getByTestId } = render(<Board />);

    fireEvent.press(getByTestId("cell-0-0"));
    fireEvent.press(getByTestId("cell-0-0"));

    expect(getByTestId("X-cell")).toBeOnTheScreen();
  });

  it("declares the correct winner when a winning combination is selected", () => {
    const { getByTestId } = render(<Board />);

    fireEvent.press(getByTestId("cell-0-0")); // X
    fireEvent.press(getByTestId("cell-1-0")); // O
    fireEvent.press(getByTestId("cell-0-1")); // X
    fireEvent.press(getByTestId("cell-1-1")); // O
    fireEvent.press(getByTestId("cell-0-2")); // X

    expect(getByTestId("winning-text").props.children).toBe("X wins!");
  });

  it("declares a draw when all blocks have been clicked and there is no winner", () => {
    const { getByTestId } = render(<Board />);

    fireEvent.press(getByTestId("cell-0-0")); // X
    fireEvent.press(getByTestId("cell-0-1")); // O
    fireEvent.press(getByTestId("cell-0-2")); // X
    fireEvent.press(getByTestId("cell-1-1")); // O
    fireEvent.press(getByTestId("cell-2-1")); // X
    fireEvent.press(getByTestId("cell-1-0")); // O
    fireEvent.press(getByTestId("cell-1-2")); // X
    fireEvent.press(getByTestId("cell-2-2")); // O
    fireEvent.press(getByTestId("cell-2-0")); // X

    expect(getByTestId("winning-text").props.children).toBe(
      "The game is a draw!"
    );
  });

  it("resets the game when resetGame is called", () => {
    const board = render(<Board />);

    fireEvent.press(board.getByTestId("cell-0-0")); // X
    fireEvent.press(board.getByTestId("cell-1-0")); // O
    fireEvent.press(board.getByTestId("cell-0-1")); // X
    fireEvent.press(board.getByTestId("cell-1-1")); // O
    fireEvent.press(board.getByTestId("cell-0-2")); // X

    const resetButton = board.getByTestId("reset-button");
    expect(resetButton).toBeOnTheScreen();
    fireEvent.press(resetButton);

    const emptyCells = board.queryAllByTestId("empty-cell");
    expect(emptyCells.length).toBe(9);
    expect(resetButton).not.toBeOnTheScreen();
  });
});
