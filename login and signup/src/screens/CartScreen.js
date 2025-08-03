import { StatusBar } from "expo-status-bar";
import { Searchbar } from "react-native-paper";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export function CartScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Button
        onPress={() => navigation.navigate("Yellow", { hallo: "eli" })}
        title="yellow"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "green",
  },
});
