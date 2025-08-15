import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Buttons = ({
  children,
  backgroundColor = "black",
  color = "white",
  height = 46,
  width = "100%",
  onpress,
}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      activeOpacity={0.6}
      style={[
        styles.buttons,
        { backgroundColor: backgroundColor, width: width, height: height },
      ]}
    >
      <Text style={{ color: color }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttons: {
    marginVertical: 10,

    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
