import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function ChangePasswordDetails() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword.trim()) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Invalid Password', 
        'Password must be at least 8 characters with uppercase, lowercase, and number'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Error', 'New password must be different from current password');
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API call
      // const response = await changePassword({
      //   currentPassword,
      //   newPassword
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success', 
        'Password changed successfully',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.page}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Change Password</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.formSection}>
            <View style={styles.inputSection}>
              <Text style={styles.label}>Enter your current password</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="*********" 
                  secureTextEntry={!showCurrentPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <Ionicons 
                    name={showCurrentPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Enter new password</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="*********" 
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Ionicons 
                    name={showNewPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.passwordHint}>
                Password must be at least 8 characters with uppercase, lowercase, and number
              </Text>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Confirm new password</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="*********" 
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.changeButton,
                isLoading && styles.changeButtonDisabled
              ]}
              onPress={handleChangePassword}
              disabled={isLoading}
            >
              <Text style={styles.changeButtonText}>
                {isLoading ? 'Changing Password...' : 'Change Password'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  page: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: "23%"
  },

  text: {
    fontFamily: "Bold",
    fontSize: 20,
    color: "#1F2937",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    justifyContent: 'space-between',
  },

  inputSection: {
    marginBottom: 40,
  },

  label: {
    fontSize: 17,
    fontFamily: 'semiBold',
    color: "#374151",
    marginBottom: 10,
 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: '#F7F7F7',
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#111827',
  },

  eyeIcon: {
    padding: 4,
  },

  passwordHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    marginLeft: 4,
  },

  formSection: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 20,
  },

  changeButton: {
   backgroundColor: "#0000cd",
   borderRadius: 20,
   paddingVertical: 16,
   alignItems: 'center',
  },

  changeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },

  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});