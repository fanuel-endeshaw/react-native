import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const MaterialIcon = ({ name,onpress }) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <MaterialIcons name={name} size={19} color={"rgb(163,144,216)"} />
    </TouchableOpacity>
  );
};

export default MaterialIcon;

const styles = StyleSheet.create({});
