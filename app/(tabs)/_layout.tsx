import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';



export default function Rootlayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor:  "#0000cd",
      tabBarLabelStyle:{fontFamily: 'Bold', fontSize:11},
      
      tabBarIconStyle:{alignItems: 'center', justifyContent:'center'},

      tabBarStyle:{
        position: 'absolute',
        height: Platform.OS === "ios"? 80:60,
        paddingTop: Platform.OS === "ios"? 6:8,
        justifyContent: 'center',
        alignItems: "center",
        borderTopWidth: 0.4,
        shadowColor: "#000",
        shadowOffset: {width:2, height:7},
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 5
      }
    }}>
        <Tabs.Screen 
        name='home'
        options={{
          title: "Home",
          tabBarIcon:({color})=>(
            <AntDesign name="home" size={24} color={color} />
          )
         }}
         />
        <Tabs.Screen
         name='transactions' 
         options={{
          title: "Transactions",
          tabBarIcon: ({color})=> (
            <Ionicons name="receipt-outline" size={24} color={color} />
          )
          
         }}
         />
        <Tabs.Screen
         name='profile'
         options={{
          title: "Profile",
          tabBarIcon:({color})=>(
            <Ionicons name="person-outline" size={24} color={color} />
          )
         }}
          />

        <Tabs.Screen
         name='settings'
         options={{
          title: "Settings",
          tabBarIcon:({color})=>(
            <Ionicons name="settings-outline" size={24} color={color} />
          )
         }}
          />
    </Tabs>
  )
}

