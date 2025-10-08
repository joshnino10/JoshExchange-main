import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function EmptyTransaction() {
  return (
    <View style={styles.container}>
        <Image style={styles.img} source={require('../../assets/images/emptyTransaction.png')}/>
        <View style={{alignItems: 'center', gap:5}}>
            <Text style={{fontFamily: 'Bold', fontSize: 20}}>No Transactions</Text>
            <Text style={{fontFamily: 'Regular,', fontSize:16, color:"#656F7D"}}>You currently have no transactions</Text>
        </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:60,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    

    },
    img:{
        width:170,
        height:170,
        resizeMode: 'contain',
    }

})