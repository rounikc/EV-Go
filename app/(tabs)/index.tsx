import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AppMapView from '@/assets/utils/AppMapView';
import HomeHeader from './HomeHeader';

export default function tabsindex() {
  return (
    <View style={styles.containermain}>
      <View style={styles.header}>
        <HomeHeader/>
      </View>
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
  },

  header: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20
  }
})