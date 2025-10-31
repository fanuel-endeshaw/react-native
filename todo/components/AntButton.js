import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const AntButton = ({ name,onpress }) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <AntDesign name={name} size={19} color={"rgb(163,144,216)"} />
    </TouchableOpacity>
  );
};

export default AntButton;

const styles = StyleSheet.create({});
