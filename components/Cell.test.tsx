import React from "react";
import { render, userEvent } from "@testing-library/react-native";
import Cell from "./Cell";

describe("Cell Tests", () => {
  const handleCellSelectionMock = jest.fn();

  it('renders "times" icon when player is "X"', () => {
    const { getByTestId } = render(
      <Cell
        player="X"
        row={0}
        col={0}
        handleCellSelection={handleCellSelectionMock}
      />
    );

    expect(getByTestId("X-cell")).toBeOnTheScreen();
  });

  it('renders "circle" icon when player is "O"', () => {
    const { getByTestId } = render(
      <Cell
        player="O"
        row={0}
        col={0}
        handleCellSelection={handleCellSelectionMock}
      />
    );

    expect(getByTestId("O-cell")).toBeOnTheScreen();
  });

  it('renders "Select" text when player is not "X" or "O"', () => {
    const { getByTestId } = render(
      <Cell
        player=""
        row={0}
        col={0}
        handleCellSelection={handleCellSelectionMock}
      />
    );

    expect(getByTestId("empty-cell")).toBeOnTheScreen();
  });

  it("calls handleCellSelection when pressed", async () => {
    const { getByTestId } = render(
      <Cell
        player="X"
        row={0}
        col={0}
        handleCellSelection={handleCellSelectionMock}
      />
    );

    await userEvent.press(getByTestId("cell-0-0"));
    expect(handleCellSelectionMock).toHaveBeenCalled();
  });
});
