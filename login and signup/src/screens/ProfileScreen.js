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
import { useNavigation, useRoute } from "@react-navigation/native";
export function ProfileScreen() {
  const navigation = useNavigation();
  const { name, params } = useRoute();
  console.log(params);
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Button
        onPress={() => {
          navigation.navigate("Tomato");
        }}
        title="green"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "yellow",
  },
});
