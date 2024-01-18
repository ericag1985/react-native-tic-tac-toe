import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export type Player = "X" | "O" | "";

type CellProps = {
  player: Player;
  row: number;
  col: number;
  handleCellSelection: () => void;
};

const Cell: FC<CellProps> = ({ row, col, player, handleCellSelection }) => {
  let cellContent;

  switch (player) {
    case "X":
      cellContent = (
        <View testID={`${player}-cell`}>
          <FontAwesome5 name="times" size={32} color="black" />
        </View>
      );
      break;
    case "O":
      cellContent = (
        <View testID={`${player}-cell`}>
          <FontAwesome5 name="circle" size={32} color="black" />
        </View>
      );
      break;
    default:
      cellContent = <Text testID="empty-cell">Select</Text>;
      break;
  }

  return (
    <View style={styles.cell}>
      <Pressable
        onPress={handleCellSelection}
        style={({ pressed }) =>
          pressed ? [styles.pressable, styles.pressed] : styles.pressable
        }
        testID={`cell-${row}-${col}`}
      >
        <View>{cellContent}</View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    aspectRatio: 1,
  },
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  pressed: {
    backgroundColor: "lavender",
  },
});

export default Cell;
