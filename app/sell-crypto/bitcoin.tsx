import BitcoinDetails from '@/components/Bitcoin/BitcoinDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Bitcoin() {
  return (
    <View style={styles.container}>
      <BitcoinDetails/>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
})