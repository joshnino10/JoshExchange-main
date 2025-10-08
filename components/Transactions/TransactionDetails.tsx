
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Transactions from './Transactions'

export default function TransactionDetails() {
    

  return (
    <View style={styles.container}>
      <Transactions/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginBottom: 50,

    },
    transactionDetails:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    recent:{
       fontFamily: 'semiBold'
    },
    seeAll:{
        fontFamily: 'Bold',
        fontSize: 15,
        color:  "#0000cd"

    },

})