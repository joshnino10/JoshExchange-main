import SephoraGiftCard from '@/components/SephoraGiftCard/SephoraGiftCard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Sephora() {
  return (
    <View style={styles.container}>
      <SephoraGiftCard/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }

})