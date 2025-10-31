import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../components/TodocontextProvider";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TodoCard from "../components/TodoCard";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";
const Home = () => {
  const { isThereTodo, setIsThereTodo } = useState("true");
  const cntxt = useContext(TodoContext);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const nav = useNavigation();
  const handle = () => {
    // AsyncStorage.removeItem("pin")
    // AsyncStorage.setItem("pin","12345")
  };
function scheduleNotificationHandler() {
  Notifications.scheduleNotificationAsync(
    {
      content: {title: "my first notification",body: "please subs my kannel"},
      trigger:{
        seconds: 5
      }
    }
  )
}



  return (
    <View style={styles.container}>
      {cntxt.todos.filter(item=>item.state==="incompleted").length==0?<><LottieView source={require("../assets/todo.json")} style={{width: "85%", height: "85%"}} autoPlay loop /> 
<Text style={styles.addTodo}> Add new todo</Text></> :<FlatList data={cntxt.todos.filter(item=>item.state==="incompleted")}
     showsVerticalScrollIndicator={false} contentContainerStyle={{gap: 10}} 
     renderItem={({item})=><TodoCard detail={item.detail} id={item.id} title={item.title}></TodoCard>}></FlatList>
}
       




           <TouchableOpacity onPress={() => {nav.navigate("manage");  handle()  }}
        style={styles.addBtn}>
        <Ionicons
          name="add-circle"
          size={60}
          color="rgb(163,144,216)"
        ></Ionicons>
      </TouchableOpacity>
      


    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(222, 217, 224, 1)",
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 7,
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 17,
  },
  modalCard: {
flex: 1,
justifyContent: 'center',
alignItems: 'center'
  },
  addTodo: {
fontSize: 18,
// color: "rgb(163,144,216)",
marginTop: -180,
fontWeight: 'bold',
textAlign:'center',
// fontStyle: 'italic'
  },
});
