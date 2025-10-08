import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SelectActions() {
    const router = useRouter();

    const sellGiftCard = ()=>{
        router.push(`/sell-giftcard`)
    }

    const sellcrypto = ()=>{
        router.push(`/sell-crypto`)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.headertitle}>Choose action</Text>
      <View style={styles.ActionContainer}>
        <TouchableOpacity onPress={sellGiftCard}>
            <View style={styles.contents}>
                <View style={styles.iconBox}>
                  <Image style={styles.icon} source={require('../../assets/images/gift-card.png')}/>
                </View>
                <View style={{gap:7}}>
                    <Text style={styles.title}>Sell Gift Card</Text>
                    <Text style={styles.desc}>Exchange your gifts cards for cash</Text>
                </View>
            </View>
        </TouchableOpacity>
      </View>

      <View style={styles.ActionContainer}>
        <TouchableOpacity onPress={sellcrypto}>
            <View style={styles.contents}>
                <View style={styles.iconBox}>
                  <Image style={styles.icon} source={require('../../assets/images/dollar.png')}/>
                </View>
                <View style={{gap:7}}>
                    <Text style={styles.title}>Sell Crypto</Text>
                    <Text style={styles.desc}>Sell your Crypto at best rates</Text>
                </View>
            </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },
    
    ActionContainer:{
        marginTop: 10,
        padding: 30,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },

    headertitle:{
        fontSize: 18,
        fontFamily: 'semiBold'
    },

    contents:{
      
        flexDirection: 'row',
        gap: 15

    },
    iconBox:{
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2000,
        backgroundColor: 'white'

    },

    icon:{
        height: 30,
        width:30

    },
    title:{
        fontFamily: 'Medium',
        fontSize: 18

    },
    desc:{
        fontFamily: 'Regular',
        fontSize: 14,
        color: 'gray'

    },
})