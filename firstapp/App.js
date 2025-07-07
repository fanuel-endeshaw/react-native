import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Card, ProgressBar, Colors } from 'react-native-paper';
import { Focus } from './src/features/Focus';
import { CountDown } from './src/component/CountDown';
import { Timer } from './src/features/Timer';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [count, setCount] = useState(20);
  useEffect(() => {
    const iid = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(iid);
    };
  }, [count]);
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <View>
          <Focus addSubject={setCurrentSubject}></Focus>
         
        </View>
      ) : (
        <Timer
          focusSubject={currentSubject}
          addSubject={setCurrentSubject}
          onTimerEnd={() => {}}
          clearSubject={() => {}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#252250',
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  out: {
    color: 'white',
    fontSize: 20,
  },
});
