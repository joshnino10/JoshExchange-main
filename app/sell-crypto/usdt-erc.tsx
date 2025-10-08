import UsdtErcDetails from '@/components/Usdt(ERC20)/UsdtErcDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function UsdtErc() {
  return (
    <View style={styles.container}>
      <UsdtErcDetails/>
   
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  },
    
})