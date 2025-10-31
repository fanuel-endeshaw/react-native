import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Pressable } from "react-native";
import React, { act, useContext, useState } from "react";
import { TodoContext } from "../components/TodocontextProvider";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../components/Button";
import FeatherBtn from "../components/FeatherBtn";
import * as Notifications from "expo-notifications";
const ManageTodo = () => {
  const nav= useNavigation();
  const route=useRoute()
  const {addNum,todos,update} = useContext(TodoContext);
    const [date,setDate]=useState()
    const [time,setTime]=useState()
    const [showtime,setShowTime]=useState(false)
    const [showDate,setShowDate]=useState(false)
    const [title,setTitle]=useState(route.params?.title? route.params?.title:"")
    const [isEditing,setIsEditing]=useState(route.params?.id? true:false)
  const [detail,setDetail]=useState(route.params?.detail? route.params?.detail:"")

function onchange(e,selectedDate) {
  setDate(selectedDate)
  setShowDate(false) 
}
function onchangeTime(e,selectedDate) {
  setTime(selectedDate)
  setShowTime(false) 
}
  //////////////////////////////////////////////
const getCombinedDateTime = (date,time) => {
                              // 1. Check if both date and time are selected
                              if (!date || !time) {
                                  return null; // Cannot schedule without both date and time
                              }
                              const combinedDate = new Date(date);
                              
                              // 3. Set the hours, minutes, and seconds from the selected time onto the combined date
                              combinedDate.setHours(time.getHours());
                              combinedDate.setMinutes(time.getMinutes());
                              combinedDate.setSeconds(0); // Ensure seconds are reset

                            
                              if (combinedDate.getTime() <= Date.now()) {
                                  // If the combined time is today but has already passed, return null.
                                  return null; 
                              }

                              // 5. Return the single, absolute Date object for scheduling
                              return combinedDate;
                          };

async function scheduleNotificationHandler(title, detail, scheduledDate, existingNotificationId) {
    if (!scheduledDate || scheduledDate.getTime() <= Date.now()) {
        console.warn("Skipping notification schedule: Date is in the past or invalid.");
        return null;
    }
    
    // 1. Cancel any existing notification for this Todo (if editing)
    if (existingNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(existingNotificationId);
        console.log(`Cancelled old notification: ${existingNotificationId}`);
    } else {
        // You generally don't want to cancel ALL scheduled notifications here, 
        // as it might cancel reminders for other Todos.
        // I've commented out the blanket cancel:
        // await Notifications.cancelAllScheduledNotificationsAsync();
    }
    
    // 2. Schedule the new notification
    try { 
        const newScheduledId = await Notifications.scheduleNotificationAsync({
            content: {
                title: `REMINDER: ${title}`,
                body: detail,
                // sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            // 🎯 CORRECT: Use the combined Date object as the trigger
            trigger: {type: 'date',date: scheduledDate }
        });
        
        console.log("Notification Scheduled with ID:", newScheduledId);
        return newScheduledId; // Return the new ID to save
    } catch (error) {
        console.error("Notification scheduling error:", error);
        Alert.alert("Scheduling Failed", "Could not set the reminder.");
        return null; 
    }
}

function addTodo() {
    // Basic Validation
    if ((title === "" || title.trim() === "") || (detail === "" || detail.trim() === "")) {
        Alert.alert("Please fill all fields");
        return;
    }

    // 1. Get the combined Date object for the trigger
    // NOTE: You must use the state variables (date, time), not the function arguments
    const scheduledDate = getCombinedDateTime(date, time); 
    
    // Check if the user selected a valid future date/time
    if (!date || !time) {
        Alert.alert("Date/Time Required", "Please select a date and time to save this Todo.");
        return;
    }
    
    if (!scheduledDate) {
        Alert.alert("Invalid Time", "The selected date and time must be in the future.");
        return;
    }

    // Determine existing notification ID for cancellation if updating
    const existingNotificationId = isEditing ? route.params?.notificationId : null;

    // 2. Schedule the notification (using a Promise)
    const notificationPromise = scheduledDate 
        ? scheduleNotificationHandler(title, detail, scheduledDate, existingNotificationId)
        : Promise.resolve(null); // Resolve to null if scheduling is skipped
    
    // 3. Wait for the scheduling result before updating the context
    notificationPromise.then((newNotificationId) => {
        // Data object to be saved/updated in the context
        const todoValue = {
            title: title,
            detail: detail,
            state: "incompleted",
            
            // ✅ Save Date objects as ISO strings
            date: date.toISOString(),
            time: time.toISOString(),
            
            // ✅ Save the new ID (or null if scheduling failed)
            notificationId: newNotificationId, 
        };

        if (isEditing) {
            // Update Logic
            todoValue.id = route.params?.id;
            update(todoValue);
        } else {
            // Add Logic
            todoValue.id = Math.floor(Math.random() * 100000);
            addNum(todoValue);
        }

        nav.navigate("home", { refresh: true });
    }).catch(error => {
        console.error("Failed during Todo save process:", error);
        Alert.alert("Error", "Could not save Todo or schedule reminder.");
    });
}
  //////////////////////////////////////////
  
//   function addTodo() {
// if((title=="" ||title.trim()=="" )|| (detail==""||detail.trim()=="")){
//   Alert.alert("Please fill all fields")
  
// }
// else{
// if(isEditing)
// {
//   const value={title: title,detail: detail,id: route.params?.id}
//   update(value);
// nav.navigate("home")
// }
// else{
//  addNum({title: title,detail: detail,id: Math.floor(Math.random()*1000),state: "incompleted"})
//   nav.navigate("home",{refresh: true})
  
// }
//   }
//   } 

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setTitle} value={title} style={styles.input} placeholder="Title"></TextInput>
      <TextInput onChangeText={setDetail} value={detail} style={styles.input} placeholder="Detail"></TextInput>
      <View style={styles.date}>
        <TextInput style={styles.dateInput} value={date?date.toLocaleDateString(): ""} editable={false} placeholder="Select Date"></TextInput><Pressable><FeatherBtn  size={30} name="calendar"  onpress={()=>setShowDate(true)}></FeatherBtn></Pressable>
      </View>
      <View style={styles.date}>
        <TextInput style={styles.dateInput} value={time?time.toLocaleTimeString(): ""} editable={false} placeholder="Select Time"></TextInput><Pressable><FeatherBtn  size={30} name="watch"  onpress={()=>setShowTime(true)}></FeatherBtn></Pressable>
      </View>
     {/* <Pressable  style={styles.buttons} onPress={()=>setShowTime(true)}><Text>time</Text></Pressable> */}
     {/* <Pressable  style={styles.buttons} onPress={()=>setShowDate(true)}><Text>date</Text></Pressable> */}
       <Button onPress={addTodo}>
        <Text style={styles.button}>{isEditing? "Update": "Add"}</Text>
      </Button>
       {showDate && <DateTimePicker
                value={new Date()}            
                mode="date"               
                display="default"
                onChange={(e,date)=>onchange(e,date) }
              />}

      {showtime && <DateTimePicker
                value={new Date()}             
                mode="time"             
                display="default"  
                onChange={(e,date)=>onchangeTime(e,date) }     
                ></DateTimePicker>} 
    </View>
  );
};
export default ManageTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    textAlign: "left",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 20, 
  },
  dateInput: {
    textAlign: "left",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
        paddingVertical: 10,
        flex: 1
  },
   buttons: {
    width: "100%",
    paddingVertical: 14,
    marginTop: 40,
    backgroundColor: "rgb(163,144,216)",
    marginVertical: 20,
    borderRadius: 14,
  },
   date: {
    width: "100%",
    flexDirection: 'row',
    paddingVertical: 14,
   alignItems:'center'
   ,gap: 20
   ,justifyContent: 'space-between'
  },
});
