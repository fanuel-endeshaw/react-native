import { StatusBar } from "expo-status-bar";
import { Searchbar } from "react-native-paper";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import CheckoutItems from "../component/CheckoutItems";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EmptyCart from "../component/EmptyCart";
import TotalView from "../component/TotalView";
import { data } from "../data/data";
import Buttons from "../component/Buttons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeProductFromCart } from "../store/Cartslice";
export function CartScreen() {
  const { item } = useSelector((state) => state.cartslice);
  const navigation = useNavigation();
  console.log(item);
  const dispach = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      {/* <CheckoutItems></CheckoutItems> */}
      <FlatList
        data={item}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CheckoutItems
            title={item.title}
            imageUrl={item.imageURL}
            price={item.price}
            qty={item.qty}
            onDecrease={() => console.log("hllo")}
            onIncrease={() => console.log("ho")}
            onDeletePress={() => dispach(removeProductFromCart(item))}
          ></CheckoutItems>
        )}
      ></FlatList>
      <TotalView></TotalView>
      <Buttons>Continue</Buttons>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "black",
    height: 30,
    // height: s(30),;
    // Width: s(30),
    Width: 30,
    borderRadius: s(15),
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
  },
});
