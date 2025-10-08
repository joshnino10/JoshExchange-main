import SteamGiftCard from '@/components/SteamGiftCard/SteamGiftCard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Steam() {
  return (
    <View style={styles.container}>
      <SteamGiftCard/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
})