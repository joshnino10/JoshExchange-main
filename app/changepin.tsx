import ChangeTransactionPin from '@/components/ChangePin/ChangeTransactionPin'
import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

export default function ChangePin() {
  return (
    <SafeAreaView style={styles.container}>
        <ChangeTransactionPin/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0
    },

})