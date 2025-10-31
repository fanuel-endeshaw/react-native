import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { TodoContext } from "../components/TodocontextProvider";
import AntButton from "./AntButton";
import FeatherBtn from "./FeatherBtn";
import MaterialIcon from "./MaterialIcon";
import { useNavigation } from "@react-navigation/native";

const TodoCard = ({title,detail,id}) => {
const cntxt = useContext(TodoContext);
const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            color: "rgb(163,144,216)",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Text>{detail}</Text>
      </View>

      <View style={styles.icons}>
        <FeatherBtn onpress={()=>nav.navigate("manage" ,{id : id,title: title,detail:detail})} name="edit-2"></FeatherBtn>
        <MaterialIcon onpress={()=>cntxt.delNum(id)} name="delete-outline" />
        <AntButton onpress={()=>cntxt.update({id:id,state: "completed"})} name="check-circle"></AntButton>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 23,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    // borderColor:
  },
  icons: {
    flexDirection: "row",
    // flex: 3,
    // justifyContent: "flex-end",
    gap: 20,
    // borderColor:
    paddingRight: 10,
  },
  titleContainer:{
    // flex: 7
  }
});
