import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MyTabs from "./MyTabs";
import CheckoutPage from "../screens/CheckoutPage";

const stack = createStackNavigator();
const MainNavigation = () => {
  return (
    <stack.Navigator>
      {/* <stack.Screen
        options={{ headerShown: false }}
        name="AuthStack"
        component={AuthStack}
      /> */}
      <stack.Screen
        options={{ headerShown: false }}
        name="MyTabs"
        component={MyTabs}
      />
      <stack.Screen
        options={{ headerShown: true }}
        name="Checkout"
        component={CheckoutPage}
      />
    </stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
