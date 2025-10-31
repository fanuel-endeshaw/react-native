import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CompletedCard = ({detail,title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
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

  
    </View>
  )
}

export default CompletedCard

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 23,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    // borderColor:
  },

  card:{
    width: "100%"
  }
});
