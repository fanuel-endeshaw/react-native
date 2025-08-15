import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, sv } from "react-native-size-matters";
const TotalView = () => {
  return (
    <View>
      <View style={styles.total}>
        <Text style={styles.title}>Total Order</Text>
        <Text style={styles.title}>1200</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.title}>Tax</Text>
        <Text style={styles.title}>180</Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.title}>Shipping</Text>
        <Text style={styles.title}>40</Text>
      </View>
    </View>
  );
};

export default TotalView;

const styles = StyleSheet.create({
  total: {
    width: "100%",
    paddingVertical: s(10),
    paddingHorizontal: s(10),
    // backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
  },
});
