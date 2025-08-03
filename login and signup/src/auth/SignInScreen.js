import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import AppInput from "../component/AppInput";
import Buttons from "../component/Buttons";
import { useNavigation } from "@react-navigation/native";
const SignInScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/appLogo.png")}
        style={styles.logo}
      ></Image>
      <AppInput placeHolder="Email"></AppInput>
      <AppInput placeHolder="Password"></AppInput>
      <Buttons backgroundColor="black">SignIn</Buttons>
      <Buttons
        backgroundColor="white"
        color="black"
        onpress={() => navigation.navigate("SignUp")}
      >
        Create New Account
      </Buttons>
    </SafeAreaView>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 100,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
