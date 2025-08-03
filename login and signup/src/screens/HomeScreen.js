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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../component/AppButton";

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppButton></AppButton>
      {/* <View style={styles.card}>
        <Image
          source={require("../../assets/cover1.jpg")}
          style={styles.image1}
        ></Image>
        <View style={styles.details}>
          <Text>Hello</Text>
          <Text>22$</Text>
          <Text>free</Text>
        </View>
        <View style={styles.delED}>
          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="home"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="home"></Ionicons>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    elevation: 3,
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
