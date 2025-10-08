import ProfileDetails from '@/components/Profile/ProfileDetails'
import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
      <View style={styles.page}>
        <ProfileDetails/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android"? StatusBar.currentHeight: 0

  },
  page:{
    flex: 1,
    paddingHorizontal: 16,

  },
})