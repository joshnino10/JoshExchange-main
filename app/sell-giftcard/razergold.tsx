import RazerGoldGiftCard from '@/components/RazerGoldGiftCard/RazerGoldGiftCard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function RazerGold() {
  return (
    <View style={styles.container}>
     <RazerGoldGiftCard/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
})