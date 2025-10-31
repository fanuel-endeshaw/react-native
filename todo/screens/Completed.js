import { FlatList, StyleSheet, Text, View } from "react-native";
import CompletedCard from "../components/CompletedCard";
import { TodoContext } from "../components/TodocontextProvider";
import React, { useContext, useState } from "react";
import TodoCard from "../components/TodoCard";
const Completed = () => {
   const cntxt = useContext(TodoContext);
  
   
      
  return (
    <View style={styles.container}>
      {cntxt.todos.filter(item=>item.state==="completed").length==0?<Text style={styles.addTodo}>There are no completed todos</Text>: 
    <FlatList data={cntxt.todos.filter(item=>item.state==="completed")}  keyExtractor={item=>item.id} 
    contentContainerStyle={{gap: 10}} showsVerticalScrollIndicator={false} renderItem={({item})=><CompletedCard detail={item.detail} title={item.title}></CompletedCard>}></FlatList>
}  
 
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({

  container: {
    backgroundColor: "rgba(222, 217, 224, 1)",
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 7,
   
  },
    addTodo: {
fontSize: 27,
// color: "rgb(163,144,216)",
fontWeight: 'bold',
textAlign:'center',
marginTop: '70%'
  },

});
