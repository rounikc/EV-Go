import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function tabsindex() {
  return (
    <View style={styles.container}>
      <Text>this is tabs/index</Text>    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})