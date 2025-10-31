import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ManageTodo from "../screens/ManageTodo";
import FeatherBtn from "../components/FeatherBtn";

const StackNav = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: "#A390D8",
          backgroundColor: "rgb(163,144,216)",
        },
      }}
    >
      <stack.Screen
        options={{ title: "Todo App" , headerTintColor: "#fff",headerLeft:null,headerRight:({tintColor})=><FeatherBtn styles={styles.headerButton} size={25} name="calendar" color={tintColor} onpress={()=>console.log("hello")}></FeatherBtn>}}
        name="home"
        component={Home}
                ></stack.Screen>
      <stack.Screen
        options={{ title: "Add Task", headerTintColor: "#fff" }}
        name="manage"
        component={ManageTodo}
      ></stack.Screen>
    </stack.Navigator>
  );
};
export default StackNav;

const styles = StyleSheet.create({


  headerButton:{
    marginRight: 22,
  }
});
