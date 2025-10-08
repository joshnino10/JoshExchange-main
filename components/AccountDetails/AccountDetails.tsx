import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Withdrawer from '../Withdrawal/withdrawer';



const AccountBalance = () => {
  const [showBalance, setShowBalance] = useState(false);
  const balance = '₦100,000.00'; 

  const toggleBalance = () => {
    setShowBalance(prev =>!prev);
  };

  return (
    <View style={{marginTop: 20, backgroundColor: "#f0f0f0", borderRadius: 40}}>
    <View style={styles.container}>
      <Text style={styles.label}>Account Balance</Text>
      <Text style={styles.balance}>
        {showBalance ? balance : '************'}
      </Text>
      <TouchableOpacity style={styles.eyeIcon} onPress={toggleBalance}>
        <Ionicons
          name={showBalance ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
          <Withdrawer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:  "#0000cd",
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    position: 'relative',
    margin: 20,
  },
  label: {
    color: '#fff',
    fontFamily: "Regular",
    fontSize: 17,
    letterSpacing: 0.1,
    marginBottom: 10,
  },
  balance: {
    color: '#fff',
    fontFamily: 'Bold',
    fontSize: 25,
  },
  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});

export default AccountBalance;
