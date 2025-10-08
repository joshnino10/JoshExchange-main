import { useGlobal } from '@/context/GloabalContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Header() {
    const router = useRouter()
    const {firstName} = useGlobal() 

   return (

    <View style={styles.container}>
        <View style={styles.headerContainer}> 
            <TouchableOpacity onPress={()=> router.push('/(tabs)/profile')}>
              <Image style={styles.img} source={require('../../assets/images/profile.png')}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 2, alignItems:"center",}}>
            <Text style={styles.greeting}>Hello!,</Text>
            <Text style={styles.name}>{firstName || 'Guest'}</Text>
            </View>
        </View>
        
     <TouchableOpacity onPress={()=> router.push('/notfications')}>
        <Image style={styles.notification} source={require("../../assets/images/notificationicon.png")}/>
     </TouchableOpacity>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between'

    },
    headerContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    img:{
        width: 45,
        height: 45
    },

    greeting:{
        fontFamily: "Medium",
        fontSize: 18

    },
    name:{
        fontSize: 19,
        fontFamily: "Bold",
        color: "#0000cd"

    },
    notification:{
        width:30,
        height: 30
    }
    


})