import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Favourites() {
  return (
    <View style={styles.containermain}>
        <Text>This is Favourites </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: '#fff',
      }
})