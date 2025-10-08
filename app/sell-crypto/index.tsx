import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SellCrypto() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const cryptoCurrencies = [
        {name: 'Bitcoin (Btc)' , icon: require('../../assets/images/bitcoin.png')  ,route: 'bitcoin'},
        {name: 'Ethereum (ETH)',icon: require('../../assets/images/Ethereum.png') , route: 'ethereum'},
        {name: 'USDT (ERC20)', icon: require('../../assets/images/usdt(ERC20).png') , route: 'usdt-erc'},
        {name: 'USDT (TRC20)',icon: require('../../assets/images/usdt(trc20).png') , route: 'usdt-trc'},
        {name: 'USDT (BEP)',icon: require('../../assets/images/usdt(bep20).png') , route: 'usdt-bep'},
        {name: 'Tron',icon: require('../../assets/images/tronicon.png') , route: 'tron'},
    ];

    const filteredCrypocurrencies = cryptoCurrencies.filter(
        crypto => crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectCryptoPress = (route) => {
        router.push(`/sell-crypto/${route}`);
    };
  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal:16}}>

            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={24} color="black" />
              <TextInput style={styles.searchInput}
               placeholder='Search coin'
               value={searchQuery}
               onChangeText={setSearchQuery}
              />

            </View>

            <FlatList
            data={filteredCrypocurrencies}
            keyExtractor={(item) => item.route}
            numColumns={2}
            contentContainerStyle={{paddingHorizontal:20, paddingVertical: 20}}
            columnWrapperStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.card} onPress={()=> selectCryptoPress(item.route)}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={item.icon}/>
                    </View>
                    <Text style={styles.name}>{item.name}</Text>

                </TouchableOpacity>
            )}
            />
        </View>


    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,

    },
    searchInput:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    card:{
        margin: 10,
        marginVertical: 15,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap:10,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        gap:15,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios'? 10:5,
      
    },

    imgContainer:{
        height: 80,
        width:80,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'center',

    },

    img:{
        width: 60,
        height: 60,
    },
    name:{
        textAlign: 'center',
        fontFamily: 'semiBold',
        fontSize: 13


    }

  
})

