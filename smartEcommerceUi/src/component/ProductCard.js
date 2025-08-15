import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const ProductCard = ({ onCartPress, price, title, imageUrl }) => {
  const navigation = useNavigation();

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
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate("Checkout")}
        onPress={onCartPress}
        style={styles.button}
      >
        <Ionicons size={20} color={"white"} name="cart"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: s(160),
    height: vs(205),
    borderRadius: s(12),
    // margin: 10,
    borderColor: "grey",
    borderWidth: 0.8,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // elevation: 4,
    // overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    overflow: "hidden",
    borderTopRightRadius: s(10),
    borderTopLeftRadius: s(10),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  details: {
    marginLeft: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "black",
    height: 32,
    Width: 32,
    padding: 5,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 7,
    left: 7,
  },
});
