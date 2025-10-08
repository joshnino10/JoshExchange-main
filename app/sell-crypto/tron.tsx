import TronDetail from '@/components/TronDetails/TronDetail'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Tron() {
  return (
    <View style={styles.container}>
      <TronDetail/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'


  },
})

