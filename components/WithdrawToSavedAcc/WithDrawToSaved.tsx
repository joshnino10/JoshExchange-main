import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WithDrawToSaved() {
  const router = useRouter();
  return (
    <View>
     <TouchableOpacity style={styles.btn} onPress={()=> router.push('/withdraw/savedaccount')}>
      <Text style={styles.text}>Withdraw to saved account</Text>

     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: "#4682B4",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 15

    },
    text:{
        fontFamily: 'semiBold',
        fontSize:17,
        color: "white"
    }
})