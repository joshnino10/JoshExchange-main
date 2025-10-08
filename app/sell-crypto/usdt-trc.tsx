import UsdtTrcDetails from '@/components/UsdtTrc/UsdtTrcDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function UsdtTrc() {
  return (
    <View style={styles.container}>
      <UsdtTrcDetails/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }

})