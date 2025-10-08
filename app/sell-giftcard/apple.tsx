import AppleGiftCard from '@/components/AppleGiftCard/AppleGiftCard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Apple() {
  return (
    <View style={styles.container} >
      <AppleGiftCard/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  }

 
})