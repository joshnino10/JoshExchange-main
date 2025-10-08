import UsdtBepDetails from '@/components/UsdtBep/UsdtBepDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function UsdtBep() {
  return (
    <View style={styles.container}>
      <UsdtBepDetails/>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
  
})