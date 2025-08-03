import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../auth/SignUpScreen";
import SignInScreen from "../auth/SignInScreen";

const stack = createStackNavigator();
const MainStackNavigation = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      />
      <stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignInScreen}
      />
    </stack.Navigator>
  );
};

export default MainStackNavigation;

const styles = StyleSheet.create({});
