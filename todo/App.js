import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNav from "./navigation/StackNav";
import Completed from "./screens/Completed";
import TodocontextProvider from "./components/TodocontextProvider";
import * as Notifications from "expo-notifications";
import FeatherBtn from "./components/FeatherBtn";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
  <TodocontextProvider>

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarActiveTintColor: "rgb(163,144,216)" }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            title: "Todo",
            tabBarIcon: ({ size, color, focus }) =><AntDesign name="schedule" size={size} color={color} />            ,
            tabBarLabelStyle: { fontSize: 14 },
          }}
          name="todo"
          component={StackNav}
        ></Tab.Screen>
        <Tab.Screen
          options={{
            title: "Completed",
            headerTintColor: "#fff",
            tabBarLabelStyle: { fontSize: 14 },
            headerStyle: { backgroundColor: "rgb(163,144,216)" },
            tabBarIcon: ({ size, color, focus }) =><FeatherBtn name="check-circle" size={size} color={color} />,
          }}
          name="completed"
          component={Completed}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
     </TodocontextProvider>
  );
}
