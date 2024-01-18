import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Cell from "./Cell";

const Board = () => {
  const [grid, setGrid] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [results, setResults] = useState<string>("");

  // Adds the current players mark to the cell press
  const handleCellPress = (row: number, col: number) => {
    if (grid[row][col] === "") {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Renders a cell in the tic-tac-toe grid
  const renderCell = (row: number, col: number) => {
    return (
      <Cell
        key={`${row}-${col}`}
        row={row}
        col={col}
        player={grid[row][col]}
        handleCellSelection={() => handleCellPress(row, col)}
      />
    );
  };

  // Check is there is a game result based on selected cells and winning combinations
  const checkWinner = () => {
    const winningCombinations = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const combination of winningCombinations) {
      const [firstCell, secondCell, thirdCell] = combination;
      const [row1, col1] = firstCell;
      const [row2, col2] = secondCell;
      const [row3, col3] = thirdCell;

      if (
        grid[row1][col1] &&
        grid[row1][col1] === grid[row2][col2] &&
        grid[row1][col1] === grid[row3][col3]
      ) {
        return grid[row1][col1];
      }
    }

    // Check if all blocks have been clicked
    const flattenedGrid = grid.flat();
    if (flattenedGrid.every((cell) => cell !== "")) {
      return "draw";
    }

    return null;
  };

  // Check for a result after each turn
  useEffect(() => {
    const result = checkWinner();
    if (result) {
      setResults(result);
    }
  }, [grid]);

  // Resets the game when there is a winner
  const resetGame = (): void => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentPlayer("X");
    setResults("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map((col) => renderCell(row, col))}
          </View>
        ))}

        {results && (
          <View>
            <Text style={styles.winningText} testID="winning-text">
              {results === "draw" ? "The game is a draw!" : `${results} wins!`}
            </Text>
            <Button
              title="Reset Game"
              onPress={resetGame}
              testID="reset-button"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    gap: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  winningText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Board;
