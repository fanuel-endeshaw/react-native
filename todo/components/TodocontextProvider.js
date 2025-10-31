import { StyleSheet, Text, View } from 'react-native'
import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const TodoContext = createContext({
  todos: [],
  addNum: () => {},
  delNum: () => {},
  update: ()=>{}
});
const TodocontextProvider = ({children}) => {
  const [ todolists, setTodolists ] = useState([]);

  

const loadTodos=async () => {
  const todo=await AsyncStorage.getItem("todos")
  console.log('get');
  
  console.log(todo);
  
  if(todo!==null){
    setTodolists(JSON.parse(todo))
    
  }
}
const saveTodos=async (todos) => {
  try {AsyncStorage.setItem("todos",JSON.stringify(todos))
    console.log("sukkkess");
    
    
  } catch (error) {
    console.log(error);
  }
  
  
  
}
useEffect(()=>{loadTodos()},[])
useEffect(()=>{saveTodos(todolists)},[todolists])
      function addNum(item) {
    setTodolists(p=>[...p,item])
    
      }
      function delNum(id) {
        setTodolists(item=>item.filter((item)=>item.id!==id))
      }
      function update(obj) {
      
        setTodolists(todolists.map(item=>item.id===obj.id?{...item,...obj}:item))
        
      }
      const value = {
        todos: todolists,
        addNum: addNum,
        delNum: delNum,
        update: update
      };
  return (
 <TodoContext.Provider value={value}>
{children}
 </TodoContext.Provider>
   
  )
}

export default TodocontextProvider

const styles = StyleSheet.create({})