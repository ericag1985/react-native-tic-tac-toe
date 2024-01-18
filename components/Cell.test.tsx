import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Cell from "./Cell";

describe("Cell Tests", () => {
  const handleCellSelectionMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("calls handleCellSelection when pressed", () => {
    const { getByTestId } = render(
      <Cell
        player="X"
        row={0}
        col={0}
        handleCellSelection={handleCellSelectionMock}
      />
    );

    fireEvent.press(getByTestId("cell-0-0"));
    expect(handleCellSelectionMock).toHaveBeenCalled();
  });
});
