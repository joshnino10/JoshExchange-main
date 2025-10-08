import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Withdrawer() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> router.push('/withdraw/withdraw')}>
         <Text style={styles.withdraw}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: '#4682B4',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 15

  },
  withdraw:{
    fontSize: 18,
    backgroundColor: '#4682B4',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Regular'
    
    

  }
    
})