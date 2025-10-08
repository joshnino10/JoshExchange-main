import { useGlobal } from "@/context/GloabalContext";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileDetails() {
  const {
    username,
    setUserName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
  } = useGlobal();


  const [originalValues, setOriginalValues] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    const original = {
      username,
      firstName,
      lastName,
      email,
    };
    setOriginalValues(original);
  }, []);

  // Check for changes whenever any field updates
  useEffect(() => {
    const currentValues = { username, firstName, lastName, email };
    const changed = Object.keys(currentValues).some(
      key => currentValues[key] !== originalValues[key]
    );
    setHasChanges(changed);
  }, [username, firstName, lastName, email, originalValues]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle save logic here
      console.log('Saving changes...');
      
      // Update original values after successful save
      setOriginalValues({
        username,
        firstName,
        lastName,
        email,
      });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle error (show toast, alert, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>Profile</Text>
        <View style={{ marginTop: 40 }}>
          <Image
            style={styles.img}
            source={require("../../assets/images/profile.png")}
          />
          
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUserName}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.label}>First name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.label}>Last name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.label}>Email</Text> 
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="lightgray"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.btn, (!hasChanges || isLoading) && styles.btnDisabled]}
          onPress={handleSaveChanges}
          disabled={!hasChanges || isLoading}
        >
          {isLoading ? (
            <View style={styles.btnContent}>
              <ActivityIndicator size="small" color="blue" style={{ marginRight: 8 }} />
              <Text style={styles.btnText}>Saving...</Text>
            </View>
          ) : (
            <Text style={[styles.btnText, !hasChanges && styles.btnTextDisabled]}>
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Bold",
    fontSize: 25,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  img: {
    alignSelf: "center",
    height: 150,
    width: 150,
    marginBottom: 30,
  },
  label: {
    fontFamily: 'semiBold',
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "black",
  },
  input: {
    flex: 1,
    color: 'gray',
    fontWeight: "500",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  btn: {
    backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 100
  },
  btnDisabled: {
    backgroundColor: '#cccccc',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: "white",
    fontSize: 17,
    fontFamily: 'semiBold',
  },
  btnTextDisabled: {
    color: '#888888',
  },
});