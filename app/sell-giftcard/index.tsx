import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SellGiftCard() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const giftcards = [
        {name: 'Apple Card' , icon: require('../../assets/images/applecard.png')  ,route: 'apple'},
        {name: 'Google Play',icon: require('../../assets/images/google card.png') , route: 'google'},
        {name: 'Steam', icon: require('../../assets/images/steamcard.png') , route: 'steam'},
        {name: 'Ebay',icon: require('../../assets/images/ebay2.png') , route: 'ebay'},
        {name: 'Sephora',icon: require('../../assets/images/sephoracard.jpg') , route: 'sephora'},
        {name: 'Razer Gold',icon: require('../../assets/images/razergoldcard.jpg') , route: 'razergold'},
       
    ];

    const filteredGiftCards = giftcards.filter(
        giftcard => giftcard.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectGiftCard = (route) => {
        router.push(`/sell-giftcard/${route}`);
    };



  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal:16}}>

            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={24} color="black" />
              <TextInput style={styles.searchInput}
               placeholder='Search gift card'
               value={searchQuery}
               onChangeText={setSearchQuery}
              />

            </View>

            <FlatList
            data={filteredGiftCards}
            keyExtractor={(item) => item.route}
            numColumns={2}
            contentContainerStyle={{paddingHorizontal:20, paddingVertical: 20}}
            columnWrapperStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.card} onPress={()=> selectGiftCard(item.route)}>
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

