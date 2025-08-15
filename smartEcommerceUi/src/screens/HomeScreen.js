import { StatusBar } from "expo-status-bar";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ViewComponent,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import ProductCard from "../component/ProductCard";
import { data } from "../data/data";
import { addItemsToCart } from "../store/Cartslice";
export function HomeScreen() {
  const navigation = useNavigation();
  const dispach = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      {/* <AppButton></AppButton> */}
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            imageUrl={item.imageURL}
            price={item.price}
            title={item.title}
            onCartPress={() => dispach(addItemsToCart(item))}
          ></ProductCard>
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          padding: 10,
        }}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.os == "ios" ? 0 : 24,
    backgroundColor: "white",
    // backgroundColor: "tomato",
  },
  card: {
    height: 130,
    borderRadius: 8,
    backgroundColor: "white",
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    borderRadius: 6,
  },
  details: {
    flex: 1,
    padding: 17,

    // backgroundColor: "green",
  },
  image1: {
    height: 110,
    width: 100,
    borderRadius: 6,
  },
  delED: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
  },
  circleBtn: {
    backgroundColor: "grey",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
////////////////////////////////////
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import { IS_Android, IS_IOS } from "../../constants/constants";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";

const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm({});

  const saveOrder = (formData) => {
    console.log(formData);
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder="Full Name"
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder="Phone Number"
          />
          <AppTextInputController
            control={control}
            name={"detailedAddress"}
            placeholder="Detailed Address"
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : undefined,
    paddingTop: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_Android ? vs(15) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});
