import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
const CheckoutItems = ({ imageUrl, title, price, onDeletePress, qty }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        ></Image>
      </View>
      <View style={styles.details}>
        <Text>{title}</Text>
        <Text>{price}</Text>
        <View style={styles.buttonWrapper}>
          <Pressable onPress={onDeletePress} style={styles.buttons}>
            <FontAwesome name="plus" size={s(11)} color="black" />
          </Pressable>
          <Text style={styles.quantity}>{qty}</Text>
          <Pressable style={styles.buttons}>
            <FontAwesome name="minus" size={s(11)} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.deleteContainer}>
        <Pressable onPress={onDeletePress} style={styles.deleteButton}>
          <AntDesign name="delete" color="red" size={24}></AntDesign>
          <Text style={styles.delete}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CheckoutItems;

const styles = StyleSheet.create({
  card: {
    // height: s(100),
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: "white",
    flex: 1.5,
  },
  details: {
    backgroundColor: "white",
    flex: 3.5,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  deleteContainer: {
    flex: 1.4,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    // height: "100%",
    // width: "100%",
    height: s(90),
    width: s(90),
  },
  buttonWrapper: {
    // backgroundColor: "grey",
    // height: s(26),
    width: s(80),
    borderRadius: s(16),
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: s(5),
    paddingVertical: vs(5),
    borderWidth: s(1),
    borderColor: "#D3D3D3",
  },
  buttons: {
    // height: "100%",
    // width: "100%",
    height: s(20),
    width: s(20),
    backgroundColor: "#D3D3D3",
    borderRadius: s(10),
    padding: s(5),
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    flex: 1,
    textAlign: "center",
  },
  delete: {
    marginLeft: 4,
    color: "grey",
  },
});
