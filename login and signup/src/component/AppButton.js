import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const AppButton = ({ backgroundColor = "black", color = "white" }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        width: "100%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17,
      }}
    >
      <Text style={{ color: "white" }}>hello</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
