import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
} from "react-native";
import React from "react";
import CheckoutItems from "../component/CheckoutItems";
import TotalView from "../component/TotalView";
import Buttons from "../component/Buttons";
import data from "../data/data";
const CheckoutPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CheckoutItems
            title={item.title}
            imageUrl={item.imageURL}
            price={item.price}
          ></CheckoutItems>
        )}
      ></FlatList>

      <TotalView></TotalView>
      <Buttons>Continue</Buttons>
    </SafeAreaView>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // paddingTop: Platform.os == "ios" ? 0 : 24,
    backgroundColor: "green",
  },
});
