import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { CartScreen } from "../screens/CartScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
const tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
    <tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { height: 62 },
        // tabBarIcon: ({ color, focused, size }) => (
        //   <Ionicons name="home" color={color} size={size}></Ionicons>
        // ),
      }}
    >
      <tab.Screen
        options={{
          tabBarIcon: () => <Ionicons name="home"></Ionicons>,
        }}
        name="Home"
        component={HomeScreen}
      />
      <tab.Screen name="Cart" component={CartScreen} />
      <tab.Screen name="Profile" component={ProfileScreen} />
    </tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({});
