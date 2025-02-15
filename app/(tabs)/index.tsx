import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppMapView from '@/assets/utils/AppMapView'

export default function tabsindex() {
  return (
    <View style={styles.containermain}>
      <AppMapView/>
    </View>    
  )
}

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#fff'
  },

  container: {
    flex: 1,
  }
})