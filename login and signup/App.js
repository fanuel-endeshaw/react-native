import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import MyTabs from "./src/Navigation/MyTabs";
import MainStackNavigation from "./src/Navigation/MainStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigation />
      {/* <MyTabs /> */}
    </NavigationContainer>
  );
}
