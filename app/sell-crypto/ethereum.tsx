import EthereumDetails from '@/components/Ethereum/EthereumDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Ethereum() {
  return (
    <View style={styles.container}>
      <EthereumDetails/>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'

  }
})