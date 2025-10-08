import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WithDrawToNew() {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={()=> router.push('/withdraw/newaccount')}>
        <Text style={styles.text}>Withdraw to new account</Text>
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:"#0000cd",
        paddingHorizontal: 34,
        paddingVertical: 20,
        borderRadius: 15

    },
    text:{
        fontFamily: 'semiBold',
        fontSize:17,
        color: "white"
    }
})