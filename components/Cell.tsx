import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type CellProps = {
  player: string;
  handleCellSelection: () => void;
};

const Cell: FC<CellProps> = ({ player, handleCellSelection }) => {
  let cellContent;

  switch (player) {
    case "X":
      cellContent = (
        <FontAwesome5
          name="times"
          size={32}
          color="black"
          data-testid={`${player}-cell`}
        />
      );
      break;
    case "O":
      cellContent = (
        <FontAwesome5
          name="circle"
          size={32}
          color="black"
          data-testid={`${player}-cell`}
        />
      );
      break;
    default:
      cellContent = <Text>Select</Text>;
      break;
  }

  return (
    <View style={styles.cell}>
      <Pressable
        onPress={handleCellSelection}
        style={({ pressed }) =>
          pressed ? [styles.pressable, styles.pressed] : styles.pressable
        }
        data-testid="pressable-wrapper"
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
