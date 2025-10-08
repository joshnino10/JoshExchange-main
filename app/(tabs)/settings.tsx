import SettingSDetails from '@/components/Settings/SettingsDetails'
import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, } from 'react-native'

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>

      <View style={styles.page}>
        <SettingSDetails/>
      </View>
      
    
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page:{
    paddingHorizontal: 16

  },
  container:{
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android"? StatusBar.currentHeight: 0

  }
})