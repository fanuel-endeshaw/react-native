import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Buttons from "./Buttons";
import { s, vs } from "react-native-size-matters";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons name="material-design" size={24} color="black" />
      <View>
        <Text style={styles.title}>Your cart is empty</Text>
        <Text style={styles.subtitle}> please browse and add items u like</Text>
      </View>
      <Buttons
        height={48}
        width={s(160)}
        onpress={() => navigation.navigate("Home")}
      >
        Start Browsing
      </Buttons>
    </SafeAreaView>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    // color: "grey",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "grey",
  },
});
