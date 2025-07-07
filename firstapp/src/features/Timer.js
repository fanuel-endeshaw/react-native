import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Vibration,
} from 'react-native';
import { TextInput, ProgressBar, Colors } from 'react-native-paper';
import React, { useState } from 'react';
import { RoundedButton } from '../component/RoundedButton';
import { CountDown } from '../component/CountDown';

export const Timer = (props) => {
  const [isPaused, setIspaused] = useState(true);
  const [minute, setMinute] = useState(25);
  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Text style={styles.focusSub}>{props.focusSubject}</Text>
        <CountDown
          isPaused={isPaused}
          onEnd={() => {
            Vibration.vibrate(1000);
          }}
          onProgress={() => {}}
          minutes={minute}
        />
      </View>

      {isPaused && (
        <>
          <RoundedButton
            title="START"
            size={90}
            onPress={() => setIspaused(false)}></RoundedButton>
        </>
      )}

      {!isPaused && (
        <RoundedButton
          title="PAUSE"
          size={90}
          onPress={() => setIspaused(true)}></RoundedButton>
      )}
      <View style={styles.bottom}>
        <RoundedButton
          title="Done"
          size={50}
          onPress={() => props.addSubject(null)}></RoundedButton>
        <RoundedButton
          title="Reset"
          size={50}
          onPress={() => setMinute(25)}></RoundedButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',

    //  backgroundColor: 'white'
  },

  countDown: {
    paddingTop: 20,
    flex: 0.5,
    alignContent: 'center',
    //  justifyContent: 'center',
    //  marginBottom: 50,
  },
  bottom: {
    flex: 0.1,
    marginTop: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  focusSub: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
});
