import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function SavedAccount() {
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [transactionPin, setTransactionPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const SavedAccount = "8149364188 - Joshua Nduka Opay";
  const AvailableBalance = "₦100,000.00";

  // Format amount with naira symbol and commas
  const formatAmount = (value) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // If empty, return just the naira symbol
    if (!numericValue) return '₦';
    
    // Add naira symbol and format with commas
    const formatted = parseFloat(numericValue).toLocaleString();
    return `₦${formatted}`;
  };

  const validateWithdrawal = () => {
    // Extract numeric value from amount string (remove ₦ symbol and any whitespace)
    const numericAmount = parseFloat(amount.replace('₦', '').replace(/,/g, '').trim());
    
    // Check if amount is empty or invalid
    if (!numericAmount) {
      setErrorMessage('Please enter a valid amount');
      return false;
    }
    
    // Check minimum withdrawal amount
    if (numericAmount < 1000) {
      setErrorMessage('Minimum withdrawal amount is ₦1,000');
      return false;
    }
    
    // Check if amount exceeds available balance
    const availableAmount = parseFloat(AvailableBalance.replace('₦', '').replace(/,/g, ''));
    if (numericAmount > availableAmount) {
      setErrorMessage('Insufficient balance');
      return false;
    }
    
    // Clear error message if validation passes
    setErrorMessage('');
    return true;
  };

  const withdraw = () => {
    if (validateWithdrawal()) {
      setPinModalVisible(true);
      setTransactionPin('');
      setPinError('');
    }
  };

  const handleKeypadPress = (value) => {
    if (isProcessing) return;
    // // Haptic feedback
    // if (Platform.OS === 'ios') {
    //   Vibration.vibrate(20);
    // }
    
    if (value === 'backspace') {
      setTransactionPin(prev => prev.slice(0, -1));
    } else if (transactionPin.length < 4) {
      setTransactionPin(prev => prev + value);
    }
    
    setPinError(''); // Clear error when user types
  };

  const processWithdrawal = async () => {
    if (transactionPin.length < 4) {
      setPinError('Please enter your 4-digit PIN');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make your actual API call
      // const response = await withdrawalAPI({ amount, pin: transactionPin });
      
      // For demo purposes, let's simulate PIN validation
      if (transactionPin === '1234') {
        // Success
        setPinModalVisible(false);
        setIsProcessing(false);
        
        Alert.alert(
          'Success',
          `Withdrawal of ${amount} was successful!`,
          [{ text: 'OK', onPress: () => router.push('/(tabs)/home') }]
        );
      } else {
        // Wrong PIN
        setPinError('Incorrect PIN. Please try again.');
        setTransactionPin('');
        setIsProcessing(false);
      }
    } catch (error) {
      setPinError('Transaction failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const closePinModal = () => {
    setPinModalVisible(false);
    setTransactionPin('');
    setPinError('');
    setIsProcessing(false);
  };

  const renderPinDots = () => {
    return Array(4).fill(0).map((_, index) => (
      <View
        key={index}
        style={[
          styles.pinDot,
          transactionPin[index] && styles.pinDotFilled
        ]}
      />
    ));
  };

  const KeypadButton = ({ value, onPress, style, textStyle, disabled }) => (
    <TouchableOpacity
      style={[styles.keypadButton, style, disabled && styles.keypadButtonDisabled]}
      onPress={() => onPress(value)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {value === 'backspace' ? (
        <Ionicons name="backspace-outline" size={24} color={disabled ? "#ccc" : "#333"} />
      ) : (
        <Text style={[styles.keypadButtonText, textStyle, disabled && styles.keypadButtonTextDisabled]}>
          {value}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderKeypad = () => {
    const keypadLayout = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'backspace']
    ];

    return (
      <View style={styles.keypadContainer}>
        {keypadLayout.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((key, keyIndex) => {
              if (key === '') {
                return <View key={keyIndex} style={styles.keypadButton} />;
              }
              
              return (
                <KeypadButton
                  key={keyIndex}
                  value={key}
                  onPress={handleKeypadPress}
                  disabled={isProcessing}
                />
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: "32%" }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.withdraw}>Withdraw</Text>
        </View>
        
        <View style={styles.selectContainer}>
          <View style={styles.selectBankContainer}>
            <Text style={styles.label}>Select Bank</Text>
            <View style={styles.bankselect}>
              <Text style={styles.savedBank}>{SavedAccount}</Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={(text) => {
                  setAmount(formatAmount(text));
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter amount"
              />
            </View>
          </View>
        </View>
        
        <Text style={styles.balanceText}>
          Available Balance:{" "}
          <Text style={styles.balance}>{AvailableBalance}</Text>
        </Text>

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        <View style={{marginTop: 20}}>
          <TouchableOpacity style={styles.withdrawbtn} onPress={withdraw}>
            <Text style={styles.btn}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction PIN Modal */}
      <Modal
        visible={pinModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={true}
        onRequestClose={closePinModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Transaction PIN</Text>
              <TouchableOpacity
                onPress={closePinModal}
                style={styles.closeButton}
                disabled={isProcessing}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionLabel}>Amount</Text>
                <Text style={styles.transactionAmount}>{amount}</Text>
                <Text style={styles.transactionLabel}>To</Text>
                <Text style={styles.transactionAccount}>{SavedAccount}</Text>
              </View>

              <View style={styles.pinSection}>
                <Text style={styles.pinLabel}>Enter your 4-digit PIN</Text>
                <View style={styles.pinDotsContainer}>
                  {renderPinDots()}
                </View>
                {pinError && (
                  <Text style={styles.pinError}>{pinError}</Text>
                )}
              </View>

              {renderKeypad()}

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  (isProcessing || transactionPin.length < 4) && styles.confirmButtonDisabled
                ]}
                onPress={processWithdrawal}
                disabled={isProcessing || transactionPin.length < 4}
              >
                {isProcessing ? (
                  <Text style={styles.confirmButtonText}>Processing...</Text>
                ) : (
                  <>
                    <Text style={styles.confirmButtonText}>Confirm Withdrawal</Text>
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  page: {
    paddingHorizontal: 16,
  },
  withdraw: {
    fontFamily: "Bold",
    fontSize: 20,
    alignSelf: "center",
  },
  selectContainer: {
    marginTop: 40,
  },
  selectBankContainer: {},
  label: {
    fontFamily: "semiBold",
    fontSize: 16,
  },
  bankselect: {
    marginTop: 10,
  },
  savedBank: {
    backgroundColor: "#f1f1f1",
    color: "gray",
    padding: 15,
    fontFamily: "semiBold",
    fontSize: 16,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  amountContainer: {
    marginTop: 25,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 15,
    marginTop: 10,
    fontFamily: "semiBold",
    fontSize: 16,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 15,
    fontFamily: "Medium",
    fontSize: 15,
    flex: 1, 
  },
  balanceText: {
    marginTop: 10,
    fontFamily: "Regular",
    fontSize: 13,
  },
  balance: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: "gray",
  },
  withdrawbtn: {
    backgroundColor: "#0000cd",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15
  },
  btn: {
    color: "white",
    fontSize: 15,
    fontFamily: "Bold",
  },
  errorMessage: {
    marginTop: 5,
    fontSize: 13,
    fontFamily: "Regular",
    color: "red",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    height: Platform.OS === 'ios'? screenHeight * 0.88: screenHeight * 0.90,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    color: "#333",
  },

  closeButton: {
    padding: 4,
  },

  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  transactionInfo: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },

  transactionLabel: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#666",
    marginBottom: 4,
  },

  transactionAmount: {
    fontSize: 24,
    fontFamily: "Bold",
    color: "#0000cd",
    marginBottom: 16,
  },

  transactionAccount: {
    fontSize: 16,
    fontFamily: "Medium",
    color: "#333",
  },

  pinSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  pinLabel: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: "#333",
    marginBottom: 20,
  },

  pinDotsContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },

  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
  },

  pinDotFilled: {
    borderColor: "#0000cd",
    backgroundColor: "#0000cd",
  },

  pinError: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: "Regular",
    color: "red",
    textAlign: "center",
  },

  // Keypad Styles
  keypadContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },

  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },

  keypadButton: {
    width: screenWidth * 0.19,
    height: screenWidth * 0.15,
    borderRadius: screenWidth * 0.075,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  keypadButtonDisabled: {
    backgroundColor: '#f0f0f0',
    elevation: 0,
    shadowOpacity: 0,
  },

  keypadButtonText: {
    fontSize: 24,
    fontFamily: "Bold",
    color: "#333",
  },

  keypadButtonTextDisabled: {
    color: "#ccc",
  },

  confirmButton: {
    backgroundColor: "#0000cd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 10,
  },

  confirmButtonDisabled: {
    backgroundColor: "#ccc",
  },

  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Bold",
  },
});