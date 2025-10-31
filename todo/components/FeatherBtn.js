import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
const FeatherBtn = ({ styles,size=19,name,onpress,color="rgb(163,144,216)"}) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <Feather style={styles} name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default FeatherBtn;

const styles = StyleSheet.create({});
