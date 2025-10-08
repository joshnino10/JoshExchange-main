import EbayGiftCardDetails from '@/components/EbayGiftCardDetails/EbayGiftCardDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Ebay() {
  return (
    <View style={styles.container}>
      <EbayGiftCardDetails/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  }
})