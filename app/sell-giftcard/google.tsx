import GoogleGiftCard from '@/components/GoogleGiftCard/GoogleGiftCard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function GooglePlay() {
  return (
    <View style={styles.container}>
      <GoogleGiftCard/>
   
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
})