import NewAccountdetails from '@/components/NewAccount/NewAccountdetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NewAccount() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.page}>
      <View style={{flexDirection: 'row', alignItems: 'center',gap: '32%'}}>
        <TouchableOpacity onPress={()=> router.back()}>
           <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.withdraw}>Withdraw</Text>
      </View>
      <NewAccountdetails/>
      
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android"? StatusBar.currentHeight : 0.
    },
    page:{
        paddingHorizontal: 16
    },

    withdraw:{
        fontFamily: 'Bold',
        fontSize: 20,
        alignSelf: 'center'
       
    }
})