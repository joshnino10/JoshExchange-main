import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputOtp from "../CustomInput/InputOtp";

export default function ChangeTransactionPin() {
  const router = useRouter();
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleChangePinPress = () => {
  
    if (currentPin.length !== 4) {
      Alert.alert("Error", "Please enter your current 4-digit PIN");
      return;
    }
    
    if (newPin.length !== 4) {
      Alert.alert("Error", "Please enter your new 4-digit PIN");
      return;
    }
    
    if (confirmPin.length !== 4) {
      Alert.alert("Error", "Please confirm your new 4-digit PIN");
      return;
    }
    
    if (newPin !== confirmPin) {
      Alert.alert("Error", "New PIN and confirmation PIN don't match");
      return;
    }
    
    if (currentPin === newPin) {
      Alert.alert("Error", "New PIN must be different from current PIN");
      return;
    }

    // TODO: Handle PIN change logic here
    Alert.alert("Success", "PIN changed successfully", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
  
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Change PIN</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form Content */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter Your Current PIN</Text>
            <InputOtp 
              numberOfDigits={4} 
              placeHolder="*" 
              value={currentPin}
              onChange={setCurrentPin}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Choose Your New 4-Digit PIN</Text>
            <InputOtp 
              numberOfDigits={4} 
              placeHolder="*" 
              value={newPin}
              onChange={setNewPin}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Your New 4-Digit PIN</Text>
            <InputOtp 
              numberOfDigits={4} 
              placeHolder="*"
              value={confirmPin}
              onChange={setConfirmPin}
              secureTextEntry={true}
              error={confirmPin.length === 4 && newPin !== confirmPin}
            />
          </View>
        </View>

        {/* Absolute Button */}
        <TouchableOpacity 
          style={[
            styles.absoluteButton,
            (currentPin.length === 4 && newPin.length === 4 && confirmPin.length === 4) 
              ? styles.buttonEnabled 
              : styles.buttonDisabled
          ]}
          onPress={handleChangePinPress}
          disabled={!(currentPin.length === 4 && newPin.length === 4 && confirmPin.length === 4)}
        >
          <Text style={styles.buttonText}>Change PIN</Text>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 20,
    color: "#1F2937",
  },
  placeholder: {
    width: 40, // Same width as back button for centering
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind button
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontFamily: 'semiBold',
    color: "#374151",
    marginBottom: 8,
  },
  absoluteButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20, // Account for safe area on iOS
    left: 16,
    right: 16,
    padding: Platform.OS === 'ios' ? 15 : 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonEnabled: {
    backgroundColor: "#0000cd",
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "white",
    fontFamily: "Bold", 
    fontSize: 16,
  },
});