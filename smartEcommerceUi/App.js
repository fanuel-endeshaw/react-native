import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import MyTabs from "./src/Navigation/MyTabs";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/Navigation/MainNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigation></MainNavigation>
          {/* <MainStackNavigation /> */}
          {/* <MyTabs /> */}
        </NavigationContainer>
      </Provider>
    </>
  );
}
